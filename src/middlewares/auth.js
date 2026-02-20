const jwt=require("jsonwebtoken");
const User=require("../models/user");
const userAuth = async(req, res, next) => {
   try{
           const {token}=req.cookies;
           if(!token)
           {
            throw new Error("invalid token");
           }
           const decodeMessage=await jwt.verify(token,"Pairup@777");
  
           const {_id}=decodeMessage;
           const user =await User.findById(_id);
           if(!user)
           {
            throw new Error("user is not found");
           }
           req.user=user;
           next();
           
    }
    catch(err)
    {
      res.status(400).send("ERROR:"+err.message);
    }
};


module.exports = {
  userAuth,
};
