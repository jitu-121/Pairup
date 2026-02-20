const mongoose =require("mongoose");
const User = require("./user");


const ConnectionRequestSchema=new mongoose.Schema({
   
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    status:{
        type: String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{values} is incorrect ststus type`
        },
    },
},
  {timestamps:true}
);

const ConnectionRequest=mongoose.model("ConnectionRequest",ConnectionRequestSchema);

module.exports=ConnectionRequest;