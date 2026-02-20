import mongoose from "mongoose";
import {Db_name} from "../constants.js";
import dotenv from "dotenv";

dotenv.config(); 
const Db_connection = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("connnected")
    } catch (error) {
        console.log("Mongodb connection error" , error)
        throw error
    }
}


export default Db_connection ;