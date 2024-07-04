const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

(async () => {
    await mongoose.connect("mongodb://localhost:27017/pascal");
    console.log("connected");
    const languageschema = new mongoose.Schema({
        name: String,
        language: String
    });
    const languagemodel = mongoose.model("languagemodel", languageschema);
    app.post("/postlanguage/:name/:language", async (req, res) => {
        const username = req.params.name;
        const userlanguage = req.params.language;
        const posteddata = new languagemodel({
            name: username,
            language: userlanguage
        });
        const saveddata = await posteddata.save();
        console.log(saveddata);
        res.json(saveddata);
    });
    app.get("/getlanguage/:name", async (req, res) => {
        const username = req.params.name;
        const founddata = await languagemodel.find({ name: username });
        console.log(founddata);
        res.json(founddata);
    });
    app.put("/updatelanguage/:name/:language", async (req, res) => {
        const username = req.params.name;
        const userlanguage = req.params.language;
        const filter = { name: username };
        const updateddata = await languagemodel.updateMany(filter, { language: userlanguage });
        console.log(updateddata);
        res.json(updateddata);
    });
    app.delete("/deletelanguage/:name", async (req, res) => {
        const username = req.params.name;
        const deleteddata=await languagemodel.deleteMany({name:username});
        console.log(deleteddata);
        res.json(deleteddata);
    })
})();
app.listen(3000,()=>{
    console.log("app running on : 3000");
})