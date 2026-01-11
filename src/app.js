require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectDB=require("./config/database.js");
const app = express();
const User=require("./models/user");
 
app.use("/signup", express.json());

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




