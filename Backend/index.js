import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config();
const app=express();
const port=process.env.PORT;
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("mongo DB connection is Running!"))
.catch(error=>console.log(error))
app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
})
