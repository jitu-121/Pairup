const express=require("express");
const User=require("../models/user");
const bcrypt= require("bcrypt");
const profileRouter=express.Router();
const { ValidateSignUpData , validateEditFields } = require("../utils/validation");

const {userAuth}=require("../middlewares/auth.js");
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
  try{
         
         const user =req.user;
         if(!user)
         {
          throw new Error("user is not found");
         }
         res.send(user.firstName);
         
  }
  catch(err)
  {
    res.status(400).send("ERROR:"+err.message);
  }
})
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {

        if (!validateEditFields(req)) {
            throw new Error("User data can't be edited");
        }

        const user = req.user;

        Object.keys(req.body).forEach((field) => {
            user[field] = req.body[field];
        });

        await user.save();

        res.json({msg :"Profile updated successfully",
            data:user
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            throw new Error("Please provide old and new password");
        }
        if(oldPassword===newPassword)
        {
            throw new Error("New Password must be different from the old one");
        }
        const user = req.user;

        // check old password
        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Old password is incorrect");
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.send("Password updated successfully");

    } catch (err) {
        res.status(400).send(err.message);
    }
});


module.exports=profileRouter;