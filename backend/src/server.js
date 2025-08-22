import express from 'express'
import dotenv from 'dotenv'
import authRoutes from "../src/routes/auth.route.js"
import { connectDb} from '../src/lib/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth/",authRoutes);


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("App started")
    connectDb();
});