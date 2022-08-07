function setCookie(res, access, refresh) {
  res.cookie("accessToken", access, {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
    secure: true,
  });
  res.cookie("refreshToken", refresh, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
  });
}

module.exports = setCookie;
