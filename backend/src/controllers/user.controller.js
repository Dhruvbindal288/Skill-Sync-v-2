import User from "../models/User.model";

export const getRecommendedUsers=async (req,res)=>{
    try {
        const currentUserId=req.user._id
const recommendedUsers=await User.find({

    $and:[
        {_id:{$ne:currentUserId}},
        {id:{$nin:req.user.friends}},
    
        {isonboarded:true}
    ]
});

res.status(200).json(recommendedUsers)
    } catch (error) {
        console.log("Error in getrecommendedusers",error);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const getMyFriends=async (req,res)=>{
    try {
          const currentUser=req.user;

          const user=await User.findById(req.user._id).select("friends").populate("friends",'fullname profilePic nativeLanguage learningLanguage')
   
   res.status(200).json(user.friends)
        } catch (error) {
            console.log("Error in getMyFriends",error);
            res.status(500).json({success:false,message:"Internal server error"}) 
    }
}