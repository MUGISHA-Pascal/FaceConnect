const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());
(async () => {
  await mongoose.connect("mongodb://localhost:27017/crud");
  console.log("connected to the database");
  const subjectdb = new mongoose.Schema({
    name: String,
    subject: String,
  });
  const Subjectdb = mongoose.model("Subjectdb", subjectdb);
  app.post("/postsubject", async (req, res) => {
    const { name, subject } = req.body;
    const newSubject = new Subjectdb({ name, subject });
    const news = await newSubject.save();
    res.json(news);
  });
  app.get("/getsubject", async (req, res) => {
    const subject = await Subjectdb.find();
    res.json(subject);
  });
  app.put("/updatesubject/:name/:setname", async (req, res) => {
    const name = req.params.name;
    const filter = { name: name };
    const setname = req.params.setname;
    const update = { $set: { name: setname } };
    const result = await Subjectdb.updateMany(filter, update);
    res.json(result);
  });
  app.delete("/deletesubject/:name", async (req, res) => {
    const name = req.params.name;
    const filter = { name: name };
    const deleted = await Subjectdb.deleteMany(filter);
    res.json(deleted);
  });
})();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
