const express=require("express");
const multer=require("multer");
const path=require("path");
const port=3000;
const app=express();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    }
},{
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    },
});

const upload=multer({storage:storage});
app.use(express.static("public"));
app.post("/upload",upload.single("file"),(req,res)=>{
    res.send("file uploaded successfully");
});

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})