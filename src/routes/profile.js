const express=require("express");
const User=require("../models/user");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
profileRouter.get("/profile",userAuth,async(req,res)=>{
  try{
         
         const user =req.user;
         if(!user)
         {
          throw new Error("user is not found");
         }
         res.send(user.firstName);
         
  }
  catch(err)
  {
    res.status(400).send("ERROR:"+err.message);
  }
})

module.exports=profileRouter;