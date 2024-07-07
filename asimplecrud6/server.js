const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

(async () => {
  await mongoose.connect("mongodb://localhost:27017/pascal");
  const songsdb = new mongoose.Schema({
    song: String,
    singer: String,
  });
  const songsDb = mongoose.model("songsDb", songsdb);

  app.post("/postsongs", async (req, res) => {
    const { song, singer } = req.body;
    const songs = new songsDb({ song, singer });
    const saved = songs.save();
    console.log(saved);
    res.json(saved);
  });
  app.get("/getsongs", async (req, res) => {
    const found = new songsDb.find();
    console.log(found);
    res.json(found);
  });

  app.put("/updatesongs/:song", async (req, res) => {
    const songu = req.params.song;
    const filter = { song: songu };
    const { song, singer } = req.body;
    const update = { $set: { song: song, singer: singer } };
    const updated = await songsDb.updateMany(filter, update);
    console.log(updated);
    res.json(updated);
  });

  app.delete("/");
})();
