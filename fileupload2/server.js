const express=require("express");
const app=express();
const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});

app.use(express.static("public"));
app.post("/upload",upload.single("file"),(req,res)=>{
    const uploadedFileName = req.file.originalname;
    res.send(`file uploaded successfully ${uploadedFileName}`);
});

app.listen(3000,()=>{
    console.log("app is running on http://localhost:3000");
})
