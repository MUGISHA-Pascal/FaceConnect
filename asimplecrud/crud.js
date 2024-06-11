const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
// bodyParser = require( "body-parser");
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/pascal");
        console.log("connected successfully");
        const personaldata = new mongoose.Schema({
            name: String,
            age: Number
        })
        const personalData = mongoose.model("personalData", personaldata);
        //    const dt=new personalData({
        //     Name:"pascal",
        //     Age:7
        //    })
        //    const rt=await dt.save()
        //    console.log(rt)
        app.post("/postdata", async (req, res) => {
            const { name, age } = req.body;
            const personal1 = new personalData({ name, age })
            // console.log("thdi",personal1)
            const prsn = await personal1.save();
            console.log(prsn)
            res.status(201).json(prsn);
        })
        app.get("/getdata", async (req, res) => {
            const dbdata = await personalData.find();
            res.json(dbdata);
            console.log(dbdata)
        })
        app.delete("/deletedata", async (req, res) => {
            const deleted = await personalData.deleteMany({ Name: "pascal" })
            console.log(deleted)
            res.json(deleted)
        })
    } catch (err) {
        console.log("the error is ", err)
    }

})();
app.listen(3000, () => {
    console.log("app running on 3000")
})