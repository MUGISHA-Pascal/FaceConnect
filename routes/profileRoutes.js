const profileRoutes = require("express").Router();
profileRoutes.get("/", (req, res) => {
  if (!req.user) {
    res.render("login");
  } else {
    res.render("face", { user: req.user });
  }
});
module.exports = profileRoutes;
