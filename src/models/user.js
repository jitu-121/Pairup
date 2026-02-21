const mongoose = require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt= require("bcrypt");
const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      index:true,
      minLength:3,
      maxLength:50,
   },
   lastName:  {
      type: String,
      minLength:3,
      maxLength:50,
   },
   emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase:true,
      trim:true,
      minLength:3,
      validate(value)
      {
         if(!validator.isEmail(value))
         {
            throw new Error("Not a valid Email "+value );
         }
      }
      
   },
   
   password: {
      type: String,
      required: true,
      validate(value)
      {
         if(!validator.isStrongPassword(value))
         {
            throw new Error("not a strong password "+value);
         }
      }
   },
   age: {
      type: Number,
      min:18,
   },
   gender: {
      type: String,
      validate(value){
         if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid");
         }
      },
   },
   photoUrl:{
      type: String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDWJp3jj9qzU2I-VHHBazKCizlOQKFofCT2NxVA_smXMdFuh1Nea6XQQ&s",
      validate(value)
      {
         if(!validator.isURL(value))
         {
            throw new Error("not a valid url"+value);
         }
      }
   },
   about:{
      type:String,
      default:"This is a photo"
   },
   skills:
   {
      type:[String],
   },
},{timestamps:true,});

userSchema.methods.getJWT=async function(){
   const user=this;
   const token=await jwt.sign({_id:user._id},"Pairup@777",{expiresIn:"7d"});
   return token; 
};
userSchema.index({ firstnName: 1, lastName: 1 })

userSchema.methods.validatePassword=async function(passwordInputByuser){
const user=this;
const hashedPasswprd=user.password;
const isPasswordValid=await bcrypt.compare(passwordInputByuser,hashedPasswprd);
return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;