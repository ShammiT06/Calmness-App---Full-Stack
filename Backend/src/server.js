import express from "express"
import "dotenv/config"
import connectDb from "./Config/db.js"
import cors from "cors"
import apiRoutes from "./routes/index.js"

const app = express()
app.use(express.json())
app.use(cors())
const Port = process.env.PORT || 4000

app.use("/api",apiRoutes)


app.listen(Port, () => {
    console.log(`Backend Server Started at ${Port}`)
    connectDb()

})