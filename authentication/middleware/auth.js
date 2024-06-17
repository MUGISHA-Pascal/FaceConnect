const  jwt=require("jsonwebtoken");
module.exports=function(req,res,next){
    const token=req.header("x-auth-token");
    if (!token) return res.status(401).json({error:"no token, authorization denied "})
    try{
     const decoded=jwt.verify(token,process.env.JWT_SECRET);
     req.user=decoded;
     }catch(err){
      res.status(400).json({error:"token is not valid"});
     }
};