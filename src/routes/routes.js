require("../db/mongoose");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const userAuth = require("../middleware/auth");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const setCookie = require("../misc/functions");

Router.get("/signin", (req, res) => {
  res.render("signin");
});

Router.get("/signup", (req, res) => {
  res.render("signup");
});

Router.get("/posts", userAuth, async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render("posts", { posts: posts });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

Router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const { accessToken, refreshToken } = await user.generateAuthToken();
    setCookie(res, accessToken, refreshToken);

    res.redirect("/posts");
  } catch (e) {
    console.log(e);
    res.status(400);
  }
});

Router.post("/signin", async (req, res) => {
  try {
    const user = await User.findUserByCredentials(req.body.usr_email, req.body.usr_pwd);
    if (req.cookies.refreshToken !== undefined) {
      user.tokens = user.tokens.filter((tokenObj) => tokenObj.token !== req.cookies.refreshToken);
    }

    const { accessToken, refreshToken } = await user.generateAuthToken();
    setCookie(res, accessToken, refreshToken);
    res.redirect("/posts");
  } catch (e) {
    res.status(400).send(e);
  }
});

Router.post("/refresh", async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  if (oldRefreshToken === undefined) {
    res.status(403).send({ message: "unauthorized" });
    return;
  }

  const user = await User.findOne({ token: oldRefreshToken }).select("-password");

  if (!user) {
    res.status(403).send({ message: "unauthorized" });
    return;
  }

  user.tokens = user.tokens.filter((tokenObj) => tokenObj.token !== oldRefreshToken);
  const { accessToken, refreshToken } = await user.generateAuthToken();
  setCookie(res, accessToken, refreshToken);
  res.status(200).send(user);
});

Router.get("/logout", async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;

  const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS);
  const user = await User.findOne({
    _id: decoded._id,
  });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  if (!user) {
    res.redirect("/signin");
    return;
  }

  if (oldRefreshToken !== undefined) {
    user.tokens = user.tokens.filter((tokenObj) => tokenObj.token !== oldRefreshToken);
    await user.save();
  }

  res.redirect("/signin");
});

Router.get("/logoutAll", async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;

  const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS);
  const user = await User.findOne({
    _id: decoded._id,
  });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  if (!user) {
    res.redirect("/signin");
    return;
  }

  if (oldRefreshToken !== undefined) {
    user.tokens = [];
    await user.save();
  }

  res.redirect("/signin");
});

module.exports = Router;
