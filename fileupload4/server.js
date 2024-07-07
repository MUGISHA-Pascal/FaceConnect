const multer = require("multer");
const express = require("express");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("file uploaded successfully");
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
