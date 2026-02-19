import express from "express"
import { SignupValidator , LoginValidator, OtpValidator, OtpValidator2 } from "../middlewares/Authvalidation.js";
import {signup , login, handleotp, verifyotp , changePassword , Logout} from "../controllers/AuthControllers.js"
import { Authprovider } from "../middlewares/Auth.js";
const route = express.Router();

route.post("/signup", SignupValidator , signup)
route.post("/login", LoginValidator , login)
route.post("/sendotp" , OtpValidator , handleotp)
route.post("/verifyOtp" , OtpValidator2 , verifyotp)
route.post("/changePass" , Authprovider , changePassword)
route.post("/logout" , Authprovider , Logout)
export default route;