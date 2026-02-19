const express=require("express");
const User=require("../models/user.js");
const reqRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const ConnectionRequest=require("../models/connectionRequest.js");

reqRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>
{
  try{
           const fromUserId=req.user._id;
           const toUserId=req.params.toUserId;
           const status=req.params.status;
           const to_user = await User.findById(toUserId);

           if(!to_user)
           {
             return res.status(400).json({
             message: "The person you are sending request not exist"});
           }



          const allowedstatus=["interested","ignored"]
          if(!allowedstatus.includes(status))
          {
            return res.status(400).json({message : "invalid status type"+ status});
          }


          if (fromUserId.toString() === toUserId.toString()) {
          return res.status(400).json({
          message: "You cannot send request to yourself"
          });
          }

          const findDuplicates= await  ConnectionRequest.findOne({$or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
           
          ]
          });

          if(findDuplicates)
          {
                return res.status(400).json({message : "connection request already sent" });
          }
           
           const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
           });


           const data=await connectionRequest.save();
           res.json({message:`${req.user.firstName} send connection request to the ${to_user.firstName}`,
            data
           })
           
  }
  catch(err)
  {
    res.status(400).json("ERROR : "+err.message);
  }
})

module.exports=reqRouter;