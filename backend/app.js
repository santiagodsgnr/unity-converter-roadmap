import express from "express";
import cors from "cors"

// ROUTES
import converterRoutes from "./routes/conversion.routes.js"

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));
app.use(express.json())
app.use('/api', converterRoutes)

export default app