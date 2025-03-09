import express from "express";
import cors from "cors"

// ROUTES
import converterRoutes from "./routes/conversion.routes.js"

const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://unit-converter-roadmap.vercel.app"
  ];

app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));
app.use(express.json())
app.use('/api', converterRoutes)

export default app