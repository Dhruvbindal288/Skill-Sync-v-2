import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

export const protectRoute=async(req,res,next)=>{
    try {
         const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  } 
    const decoded = jwt.verify(token, process.env.SECRET);
    
   
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

    } catch (error) {
         console.log("Error in auth middleware:", error.message);
    res.status(401).json({ message: "Not authorized" });
    }}