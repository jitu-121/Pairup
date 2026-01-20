require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectDB=require("./config/database.js");
const app = express();
const User=require("./models/user");
 
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



app.post("/signup",async(req,res)=>{
  console.log(req.body);
const user=new User(req.body);
await user.save();
res.send("database saved succesfullyy");
});




connectDB().then(()=>{
    console.log("database connected succesfully...");
    app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});

}).catch((err)=>{
   console.error("Database connection failed:", err); 
}); 




