const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.get("/protected", auth, (req, res) => {
  res.status(200).send("this is a protected route");
});

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/jwt_auth");

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
