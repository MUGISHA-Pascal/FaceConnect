const express=require("express");
const mongoose=require("mongoose");
const app = express();
app.use(express.json());
(async ()=>{
await mongoose.connect("mongodb://localhost:27017/pascal");
console.log("effectively connected to the database");
const studentinfo=new mongoose.Schema({
name:String,
Class:String
});
const studentInfo= mongoose.model("studentInfo",studentinfo);
app.post("/poststudent",async (req,res)=>{
    const { name, Class } = req.body;
    const student = new studentInfo({name, Class});
    const studentres=await student.save();
    console.log(studentres);
    res.status(201).json(studentres);
});
app.get("/getstudent",async (req,res)=>{
    const studentdb=await studentInfo.find();
    res.json(studentdb);
    console.log(studentdb);
});
app.delete("/deletestudent",async (req,res)=>{
    const studentdel=await studentInfo.deleteMany({__v:0});
    console.log("deleted : ",studentdel);
    res.json(studentdel);
});
app.put("/updatestudents",async (req,res)=>{
    const filter={name:"pascal"};
    console.log(filter);
    const update={$set:{name:"mugisha"}};
    const updating=await studentInfo.updateMany(filter,update);
    console.log(updating);
    res.status(201).send("finished updating");
})

app.patch("/patchstudents",async (req,res)=>{
    const filter={name:"mugisha"};
    console.log(filter);
    const update={$set:{name:"pascal"}};
    const updating=await studentInfo.updateMany(filter,update);
    console.log(updating);
    res.status(201).send("finished updating");
})

})();
app.listen(3000,()=>{
    console.log("app running on : 3000");
})