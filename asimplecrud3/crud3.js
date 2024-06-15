const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors=require('cors');
app.use(express.json());
app.use(cors());
(async () => {
    await mongoose.connect("mongodb://localhost:27017/pascal");
    const locationdb = new mongoose.Schema({
        name: String,
        Location: String
    })
    const locationDb = mongoose.model("locationDb", locationdb);
    app.post("/postlocation", async (req, res) => {
        const { name, Location } = req.body;
        const result = await locationDb({ name, Location });
        const resulti = await result.save();
        console.log(resulti);
        res.status(201).json(resulti);
    }); 
    app.get("/getlocation", async (req, res) => {
        const result = await locationDb.find();
        console.log(result);
        res.json(result);
    });
    app.delete("/deletelocation", async (req, res) => {
        const deleted = await locationDb.deleteMany({ name: "pascal" });
        console.log(deleted);
        res.json(deleted);
    });
    app.put("/updatelocation",async (req,res)=>{
        const filter={name:"pascal"};
        const  update={$set:{name:"mugisha"}};
        const updating=await locationDb.updateMany(filter,update);
        console.log(updating);
        res.json(updating);
    })
})();
app.listen(3000, () => {
    console.log("app running at : http://localhost:3000");
})