import express from 'express'
import dotenv from 'dotenv'
import { connectDb} from '../src/lib/db.js'
import cookieParser from 'cookie-parser'

import authRoutes from "../src/routes/auth.route.js"
import userRoutes from "../src/routes/user.route.js"


dotenv.config()
const app=express();
app.use(cookieParser())
app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("App started")
    connectDb();
});