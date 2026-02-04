const mongoose = require("mongoose");
const validator=require("validator");
const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      unique:true,
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
   photourl:{
      type: String,
      default:"https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460",
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

// Ensure a unique index exists at the database level
userSchema.index({ emailId: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;