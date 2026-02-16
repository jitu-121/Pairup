require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectDB=require("./config/database.js");
const app = express();
const User=require("./models/user");
const {ValidateSignUpData}=require("./utils/validation.js");
const bcrypt= require("bcrypt");
 
app.use(express.json());

app.get("/user", async(req,res)=>{
  const UserEmail=req.body.emailId;

 try
 {
const user=await User.find({emailId:UserEmail});
if(user.length===0)
{
  res.status(404).send("user not found");
}
else{
  res.send(user);
}
 } 
 catch(err){
  res.status(400).send("something wet wrong");
 }
})
// Update data of the user 
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills && data.skills.length > 10) {
  throw new Error("Skills cannot be more than 10");
}
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});
//delete a user form the database
app.delete("/user", async(req,res)=>{
  const Userid=req.body.userId;
 try
 {
    await User.findByIdAndDelete(Userid)
res.send("user Deleted ")
 } 
 catch(err){
  res.status(400).send("something went wrong");
 }
})
app.get("/feed", async(req,res)=>{
 try
 {
const user=await User.find({});
  res.send(user);
 } 
 catch(err){
  res.status(400).send("something went wrong");
 }
})

app.post("/login",async(req,res)=>{
  try{
    const{emailId,password}=req.body;
    const user= await User.findOne({emailId:emailId});
     console.log(user);
    if(!user)
    {
      throw new Error("user does not exist");
    }
    const isPasswordvalid=await bcrypt.compare(password,user.password);

    if(isPasswordvalid)
    {
      res.send("user logged successfully");
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




connectDB().then(()=>{
    console.log("database connected succesfully...");
    app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});

}).catch((err)=>{
   console.error("Database connection failed:", err); 
}); 




