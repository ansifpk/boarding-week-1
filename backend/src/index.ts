import mongoose from "mongoose"
import app from "./app"
import dotenv from 'dotenv';
dotenv.config();

const start = async() => {
   try {
    await mongoose.connect(process.env.MONGO_URL!)
    app.listen(process.env.PORT,()=>console.log("server is running"))
   } catch (error) {
    
   }
}

start()
