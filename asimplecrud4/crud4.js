const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
(async () => {
    await mongoose.connect("mongodb://localhost:27017/pascal");
    console.log("connected");
    const bookschema=new mongoose.Schema({
        name:String,
        author:String
    })
    const booksmodel=mongoose.model("booksmodel",bookschema);
    app.post("/postbooks", async (req, res) => {
        const {name,author}=req.body;
        const book=new booksmodel({name,author});
        const booksave=await book.save();
        res.status(201).json(booksave);
    });
    app.get("/getbooks", async (req, res) => {
       const gotbooks=await booksmodel.find();
       console.log(gotbooks) ;
       res.json(gotbooks);
    });
    app.put("/updatebooks",async (req,res)=>{
        const filter={name:"mugisha"}
        const update={$set:{name:"daddy"}};
        const updatedbooks=await booksmodel.updateMany(filter,update);
        console.log(updatedbooks);
        res.json(updatedbooks);
    })
    app.delete("/deletebooks",async (req,res)=>{
        const deletebooks=await booksmodel.deleteMany({name:"daddy"});
        console.log(deletebooks);
        res.json(deletebooks);
    })
})();
app.listen(3000, () => {
    console.log("app running on : 3000");
})