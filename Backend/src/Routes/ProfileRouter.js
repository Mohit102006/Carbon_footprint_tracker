import express from "express"
import { Authprovider } from "../middlewares/Auth.js"
import { setProfileImage , getProfileImg } from "../controllers/ProfileController.js"
const routes = express.Router()

routes.post("/setImage",Authprovider, setProfileImage)
routes.get("/getImage",Authprovider,getProfileImg)
export default routes