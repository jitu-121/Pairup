const express = require("express");

const app = express();

// Middleware to parse JSON bodiess
app.use("/user",(req ,res)=>{
    res.send("Route Handler 1"); 
});



// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
