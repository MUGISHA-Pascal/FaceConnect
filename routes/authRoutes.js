const authRoutes = require("express").Router();
const passport = require("passport");

authRoutes.get("/login", (req, res) => {
  res.render("login");
});

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRoutes.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send("you reached the call back function");
  }
);

module.exports = authRoutes;
