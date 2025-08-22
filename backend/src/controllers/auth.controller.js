import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be more than 6 characters" });
    }

    
    const regex =
      /^(?!.*\.\.)[A-Z0-9._%+-]{1,64}@(?!-)[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,63}$/i;
    if (!regex.test(email)) {
     
      return res.status(400).json({ message: "Please enter a valid email" });
    }

   
    const existingUser = await User.findOne({ email }); 
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    
    const newUser = await User.create({
      fullname: fullName,
      email,
      password: hashedPassword,
    });

const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'})

res.cookie("token",token,{
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict', 
    maxAge: 7 * 24 * 60 * 60 * 1000 
})
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req,res) => {
    try {
        let {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please enter all the fields"})
        }
        const user=await User.findOne({email});
  
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:'7d'})
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        res.status(200).json({
            message:"User logged in successfully",
            user:{
                id:user._id,
                fullname:user.fullname,
                email:user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({message:"User logged out successfully"});
};
