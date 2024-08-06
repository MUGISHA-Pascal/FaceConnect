const profileRoutes = require("express").Router();
profileRoutes.get("/", (req, res) => {
  res.render("profile");
});
module.exports = profileRoutes;
