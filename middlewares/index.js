const express=require("express");
const app=express();
app.get("/",
(req,res,next)=>{
    console.log("this is the middleware's next");
    next();
},
(req,res)=>{
 res.send("this is the middleware");
});
app.listen(3000,()=>{
    console.log("app running");
});
// error ??