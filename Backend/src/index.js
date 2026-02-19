import express from "express"
import dotenv from "dotenv"
import Db_connection from "./db/index.js"
import Authrouter from "./Routes/Authroutes.js"
import cors from "cors"
import Datarouter from "./Routes/Datarouter.js"
import cookieParser from "cookie-parser"
import Dashrouter from "./Routes/Dashrouter.js"
import ProfileRouter from "./Routes/ProfileRouter.js"

const app = express()

app.use(express.json())
app.use(cors({origin: "http://localhost:5173", // your frontend origin
  credentials: true   }))
app.use(cookieParser())
app.use("/auth",Authrouter)
app.use("/consumption",Datarouter)
app.use("/dashboard",Dashrouter)
app.use("/profile",ProfileRouter)
Db_connection()

// blog code
dotenv.config()

app.get("/aqi/:city", async (req, res) => {
  const city = req.params.city;

  try {
    // 1️⃣ Get latitude & longitude from city name
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Get AQI using lat/lon
    const aqiRes = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,us_aqi`
    );
    const aqiData = await aqiRes.json();

    res.json({
      city: name,
      country: country,
      PM10: aqiData.current.pm10,
      PM25: aqiData.current.pm2_5,
      AQI: aqiData.current.us_aqi,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch AQI" });
  }
});

let cachedData = null;
let lastFetchTime = 0;
const CACHE_TIME = 30 * 60 * 1000; // 30 min

const API_KEY = process.env.API_KEY;

app.get("/news", async (req, res) => {
  const now = Date.now();

  if (cachedData && now - lastFetchTime < CACHE_TIME) {
    return res.json(cachedData);
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=air+pollution&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    const data = await response.json();

    cachedData = data;
    lastFetchTime = now;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});


app.listen(5000)