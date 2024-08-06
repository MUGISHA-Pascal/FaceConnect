const mongoose = require("mongoose");
const passport = require("passport");

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  photo: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
