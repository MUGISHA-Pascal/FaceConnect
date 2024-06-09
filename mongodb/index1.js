const mongoose=require("mongoose")
const db=mongoose.connect("mongodb://localhost:27017/pascal")
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log("not connected",err))