import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/userRoute.js"
import authRoutes from './routes/auth.route.js'
dotenv.config();
const app=express();
const port=process.env.PORT;
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("mongo DB connection is Running!"))
.catch(error=>console.log(error));
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use('/api',userRoutes);
app.use('/api/auth',authRoutes);
app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
})
