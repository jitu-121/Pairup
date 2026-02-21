const express=require("express");
const User=require("../models/user");
const authRouter=express.Router();
const {ValidateSignUpData}=require("../utils/validation.js");
const bcrypt= require("bcrypt");
authRouter.post("/signup", async (req, res) => {
 try {
  ValidateSignUpData(req)
  const {firstName,lastName,emailId,password}=req.body;
  const hashedPassword= await bcrypt.hash(password,10);
  const user = new User({
    firstName,
    lastName,  
    emailId,
    password:hashedPassword,
  });
  if(user?.emailId.length>70)
    {
      throw new Error("plz enter a email shorter than 70 characters");
    }
    const savedUser=await user.save();
    const token =await savedUser.getJWT();
    res.cookie("token",token,{
      expires:new Date(Date.now()+8*3600000),
    })
    res.json({message:"User Added successfully!", data : savedUser});
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/login",async(req,res)=>{
  try{
    const{emailId,password}=req.body;
    const user= await User.findOne({emailId:emailId});
     
    if(!user)
    {
      throw new Error("user does not exist");
    }
    const isPasswordvalid= await user.validatePassword(password);

    if(isPasswordvalid)
    {
      const token=await user.getJWT();
      res.cookie("token", token, {
  expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
});
      res.send(user);

    }
    else {
      throw new Error("password is incorrect");
    }

  }
  catch(err){
    res.status(400).send("email or password is incorrect "+ err.message)
  }
})
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires : new Date(Date.now())
    })
    res.json({message:"user logged out successfully"});
});
 module.exports =authRouter; 