const profileRoutes = require("express").Router();
profileRoutes.get("/", (req, res) => {
  res.render("face");
});
module.exports = profileRoutes;
