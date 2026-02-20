const express=require("express");
const userRouter=express.Router();
const User=require("../models/user.js");
const {userAuth}=require("../middlewares/auth.js");
const ConnectionRequest=require("../models/connectionRequest.js");
const USER_SAFE_DATA="firstName lastName photoUrl age gender about skills";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const allRequest = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId",USER_SAFE_DATA);
    res.json({
      message: "These are all the requests",
      data: allRequest
    });

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedUser._id, status: "accepted" },
        { fromUserId: loggedUser._id, status: "accepted" }
      ]
    })
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {

      if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
        return row.toUserId;
      }

      return row.fromUserId;
    });

    res.json({
      message: "These are all the connections",
      data: data
    });

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
userRouter.get("/feed",userAuth,async(req,res)=>
{
  try { 
  const page=parseInt(req.query.page)||1;
  let limit=parseInt(req.query.limit)||10;
  limit=limit>50?50:limit;
  const skip=(page-1)*limit;
  const loggedInUser=req.user;
  const connectionRequests = await ConnectionRequest.find({
  $or: [
    { fromUserId: loggedInUser._id },
    { toUserId: loggedInUser._id }
  ]
}).select("fromUserId toUserId");

const hideUsersFromFeed = new Set();

connectionRequests.forEach((req) => {
  // (You likely add user IDs here to hide from feed)
  // Example:
  // hideUsersFromFeed.add(req.fromUserId.toString());
  // hideUsersFromFeed.add(req.toUserId.toString());
});

const users = await User.find({
  $and: [
    { _id: { $nin: Array.from(hideUsersFromFeed) } },
    { _id: { $ne: loggedInUser._id } },
  ],
}).select(USER_SAFE_DATA)
  .skip(skip)
  .limit(limit);

res.send(users);

} catch (err) {
  res.status(400).json({ message: err.message });
}});




module.exports=userRouter;