import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import chatRoutes from "./routes/chat.js";
import mongoose from "mongoose";

const app=express();
const port=8000;
app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);
// For any request that begins with /api, use the routes inside chatRoutes.

app.listen(port,()=>{
    console.log(`server running on ${port}`);
    connectDB();
});

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    }
    catch(err){
        console.log("MongoDB connection error:",err);
    }
};