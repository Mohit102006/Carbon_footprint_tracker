import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/utils.js"
import ratelimit from "express-rate-limit"
import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
  port: 587,
  secure: false, // VERY IMPORTANT (false for 587)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((err, success) => {
  if (err) {
    
  } else {
    
  }
});


export const login = async (req, res) => {
    try {
        const { email, pass } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(409).json({ message: "user doesn't exist", success: false })
        const passres = await bcrypt.compare(pass, user.pass)
        if (!passres) return res.status(400).json({ message: "invalid credentials", success: false })
        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true, // cannot be accessed by JS
            secure: false,  // true if using HTTPS
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000,
        });
        return res.status(200).json({ message: "login successfully", success: true })

    } catch (error) {
        return res.status(500).json({ message: "server error", success: false })
    }
}

export const handleotp = async (req, res) => {
    try {
        const { email } = req.body
        console.log(email)
        const user = await User.findOne({ email })
        if (user) return res.status(409).json({ message: "user already exist", success: false })
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await transporter.sendMail({
            from: `"EcoTracker 🌿" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your EcoTracker account",
            html: `
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>It will expire in 10 minutes.</p>
      `,
        });
        const newUser = new User({
            email,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000, // 10 min
        });
        await newUser.save();

        return res.status(200).json({ message: "OTP sent successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Failed to send OTP", success: false });
    }
}

export const verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(409).json({ message: "user already exist", success: false })
        if (otp != user.otp) {
            return res.status(400).json({ message: "incorrect otp", success: false })
        }
        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "otp expired", success: false })
        }

        await User.deleteOne(
            { email }
        );
        return res.status(200).json({ message: "Email verified successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP", success: false });
    }
}
export const signup = async (req, res) => {
    try {
        const { name, email, pass } = req.body
        const user = await User.findOne({ email })
        if (user) return res.status(409).json({ message: "user already exist", success: false })
        // user.isverified = true;
        const usermodel = new User({ name, email, pass });
        await usermodel.save();
    } catch (error) {
        return res.status(500).json({ message: "server error", success: false })
    }
}
export const changePassword = async (req , res) => {
    try {
        const {email, oldPass, newPass} = req.body;
        const userId = req.user.id;
        const user = await User.findOne({email})
        const salt = await bcrypt.genSalt(10);
        const re = oldPass == user.pass
        if(re == true){
            user.pass = await bcrypt.hash(newPass, salt);
            console.log(user.pass)
            const user2 = await User.findByIdAndUpdate(
                userId,
                {pass:newPass},
                {new:true}
            )
            res.json({success:true})
            return
        } else{
            res.json({message:"something went wrong", success:false})
            return
        }
       
        
    } catch (error) {
        res.status(500).json({message:"server error", success:false})
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
    
        })
        return res.json({ message: "Logged out successfully", success: true })
    } catch (error) {
        return res.status(500).json({ message: "server error", success: false })
    }
}