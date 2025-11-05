import mongoose from "mongoose";
import "dotenv/config"
const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.DB_CONNECT_URL)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Failed in Connecting to Database",error)
        
    }
}


export default connectDb