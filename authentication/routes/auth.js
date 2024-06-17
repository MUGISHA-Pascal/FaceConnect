const express=require("express");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const auth=require("../middleware/auth");

const router = express.Router();

router.post("/register",async (req,res)=>{
    const {usename,email,password}=req.body;
    try{
        
    }
})