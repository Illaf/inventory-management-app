import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();


 const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully")  
    } catch (error) {
       console.log("failed to connect to database", error) 
    }
    
}

export default dbConnection;