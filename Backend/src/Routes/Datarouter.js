import express from "express"
import { Authprovider } from "../middlewares/Auth.js"
import { getLast10Days, getTotal, Log , getCategoryPie , getMonthlyReport } from "../controllers/DataControllers.js"

const routes = express.Router()

routes.post("/Logdetails",Authprovider , Log)
routes.get("/getDetails",Authprovider , getTotal)
routes.get("/getGraph",Authprovider , getLast10Days)
routes.get("/getPie",Authprovider , getCategoryPie)
routes.get("/MonthlyReport",Authprovider , getMonthlyReport)
export default routes;