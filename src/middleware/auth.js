module.exports = function (req, res, next) {
  const token = req.header("xAccessToken");
  if (token !== process.env.X_ACCESS_TOKEN)
    res.status(401).json({ msg: "Unauthorized." });

  next();
};
