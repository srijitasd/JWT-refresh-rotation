const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const setCookie = require("../misc/functions");

const userAuth = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (oldRefreshToken === undefined) {
      res.clearCookie("accessToken");
      res.redirect("/signin");
      return;
    }

    const accessToken = req.cookies.accessToken;

    if (accessToken === undefined) {
      const user = await User.findOne({ token: oldRefreshToken }).select("-password");

      if (!user) {
        res.redirect("/signin");
        next();
        return;
      }

      user.tokens = user.tokens.filter((tokenObj) => tokenObj.token !== oldRefreshToken);
      const { accessToken, refreshToken } = await user.generateAuthToken();
      setCookie(res, accessToken, refreshToken);

      next();
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      res.redirect("/signin");
      return;
    }

    next();
    return;
  } catch (e) {
    res.redirect("/signin");
    return;
  }
};

module.exports = userAuth;
