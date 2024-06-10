const express = require("express");
const app = express();
const mongoose = require("mongoose");
bodyParser = require("body-parser");
app.use(bodyParser.json());
(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/pascal");
        console.log("connected successfully");
        const personaldata = new mongoose.Schema({
            Name: String,
            Age: Number
        })
        const personalData = await mongoose.model("personalData", personaldata);

        app.post("/postdata", async (req, res) => {
            const personal1 = new personalData({
                Name: req.body.Name,
                Age: req.body.Age
            })
            const prsn = await personal1.save();
            res.status(201).json(prsn);
        })
        app.get
    } catch (err) {
        console.log("the error is ", err)
    }

})();
app.listen(3000, () => {
    console.log("app running on 3000")
})