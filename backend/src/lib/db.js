import mongoose, { mongo } from 'mongoose';

export const  connectDb=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected Successfully")
} catch (error) {
    console.log("datbase not connected",error.message)
}
}