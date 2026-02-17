require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectDB=require("./config/database.js");
const app = express();
const User=require("./models/user");
const {ValidateSignUpData}=require("./utils/validation.js");
const bcrypt= require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth.js");
 
app.use(express.json());
app.use(cookieParser());

app.get("/profile",userAuth,async(req,res)=>{
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
app.post("/login",async(req,res)=>{
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
      res.cookie("token",token,{
        expires:new Date(Date.now()+8*36000),
      });
      res.send("user logged successfully ");

    }
    else {
      throw new Error("password is incorrect");
    }

  }
  catch(err){
    res.status(400).send("email or password is incorrect "+ err.message)
  }
})

app.post("/signup", async (req, res) => {
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
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
app.post("/sendConnectionReq",userAuth,async(req,res)=>
{
  const user=req.user;
})
connectDB().then(()=>{
    console.log("database connected succesfully...");
    app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});

}).catch((err)=>{
   console.error("Database connection failed:", err); 
}); 




