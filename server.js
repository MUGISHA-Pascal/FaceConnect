const express = require("express");
const app = express();
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/auth", authRoutes);
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
