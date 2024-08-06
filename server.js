const express = require("express");
const app = express();
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const passport_setup = require("./config/passport_setup");
const keys = require("./keys");
const session = require("express-session");
const profileRoutes = require("./routes/profileRoutes");
const mongoose = require("mongoose");

mongoose.connect(keys.mongodbURl);

app.use(
  session({
    name: "user cookie",
    secret: keys.secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
