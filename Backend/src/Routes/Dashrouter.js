import express from "express"
import { Authprovider } from "../middlewares/Auth.js"
const Routes = express.Router()

Routes.get("/",Authprovider,(req,res)=>{
    return res.json({message:"welcome" , user:req.user , success:true})
})
export default Routes