import mongoose  from "mongoose";
import bcrypt from "bcryptjs"
// import {date, string } from "joi";
const userSchema = new mongoose.Schema({
    name:{
        type:String,    
      },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    pass:{
        type:String,
    },
    otp:{
      type:String,
    },
    otpExpires:{
      type:Date
    },
    isverified:{
      type: Boolean, default: false
    },
    ProfileImg:{
      type:String,
      default:''
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('pass')) return ;
  try {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
    
  } catch (err) {
    next(err);
  }
});


export const User = mongoose.model('user',userSchema)