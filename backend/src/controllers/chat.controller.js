import { genearateStreamToken } from "../lib/stream.js"

export const getStreamtoken=async(req,res)=>{
    try {
        const token =genearateStreamToken(req.user._id);

        res.status(200).json({token})
    } catch (error) {
        console.log("Error in getting stream token",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}