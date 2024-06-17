const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bodyParser=require("");
const app=express();
require("dotenv").config();
const authroutes=require('./routes/auth');
// app.use(express.json());
app.use(bodyParser.json());

(async ()=>{
    await mongoose.connect("mongodb://localhost:27017/pascal");
    app.use("/api/auth",authroutes);
    const PORT=process.env.PORT || 5000;
    app.listen(PORT,()=>{
        console.log(`server runnning on ${PORT}`);
    })
})();