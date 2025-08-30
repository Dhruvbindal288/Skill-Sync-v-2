import express from 'express'
import dotenv from 'dotenv'
import { connectDb} from '../src/lib/db.js'
import cookieParser from 'cookie-parser'

import authRoutes from "../src/routes/auth.route.js"
import userRoutes from "../src/routes/user.route.js"
import chatRoutes from '../src/routes/chat.route.js'
import cors from 'cors'
import path from 'path'
dotenv.config()
const __dirname=path.resolve() 
const app=express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log("App started")
    connectDb();
});