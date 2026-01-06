const express = require("express");
const connectDB=require("../config/database.js");
const app = express();
const User=require("./models/user");
 

app.post("/signup",async(req,res)=>{
const user=new User({
  firstName:"Jitendra",
  lastName:"Baravkar",
  emailId:"jitu@gmail.com",
  password:"jitendra@1234",
});
await user.save();
res.send("database saved succesfully");
});




connectDB().then(()=>{
    console.log("database connected succesfully...");
    app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});

}).catch((err)=>{
   console.error("not connected"); 
}); 




