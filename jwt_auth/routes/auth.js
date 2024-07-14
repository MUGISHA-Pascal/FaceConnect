const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
router.use(express.json());
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    newUser.save();
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "pascal");
    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "pascal"
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/logout", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    blacklistedtokens.add(token);
    return res.status(200).json({ message: "successfully logged out" });
  } else {
    return res.status(400).json({ message: "token not provided" });
  }
});

module.exports = router;
