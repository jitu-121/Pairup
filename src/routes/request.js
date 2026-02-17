const express=require("express");
const User=require("../models/user.js");
const reqRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");

reqRouter.post("/sendConnectionReq",userAuth,async(req,res)=>
{
  const user=req.user;
  res.send(user.firstname);
})

module.exports=reqRouter;