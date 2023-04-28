import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
dotenv.config()

connectDb()
let app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/doctor", doctorRoutes)
app.use("/api/v1/admin", adminRoutes)
app.listen(process.env.PORT || 3001, () => {
  console.log("server" + " " + process.env.PORT)
})
