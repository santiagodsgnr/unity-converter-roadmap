import express from "express";
import cors from "cors"

// ROUTES
import converterRoutes from "./routes/conversion.routes.js"

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}))
app.use(express.json())
app.use('/api', converterRoutes)

export default app