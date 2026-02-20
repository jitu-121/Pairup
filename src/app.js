require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectDB=require("./config/database.js");
const app = express();
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter=require("./routes/user")
const cookieParser=require("cookie-parser");

const {userAuth}=require("./middlewares/auth.js");
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);


connectDB().then(()=>{
    console.log("database connected succesfully...");
    app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});

}).catch((err)=>{
   console.error("Database connection failed:", err); 
}); 




