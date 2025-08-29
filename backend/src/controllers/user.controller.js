import User from "../models/User.model.js";
import FriendRequest from "../models/FriendRequest.model.js";
export const getRecommendedUsers=async (req,res)=>{
    try {
        const currentUserId=req.user._id
const recommendedUsers=await User.find({

    $and:[
        {_id:{$ne:currentUserId}},
        {_id:{$nin:req.user.friends}},
    
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
         

          const user=await User.findById(req.user._id).select("friends").populate("friends",'fullname profilePic nativeLanguage learningLanguage')
   
   res.status(200).json(user.friends)
        } catch (error) {
            console.log("Error in getMyFriends",error);
            res.status(500).json({success:false,message:"Internal server error"}) 
    }
}

export const sendFriendRequest=async(req,res)=>{
    try {
        const myId=req.user._id;
const {id:recipientId}=req.params


if(myId === recipientId){  
    return res.status(400).json({message:"You cannot send friend request to yourself"})
}

const recipient=await User.findById(recipientId);
if(!recipient){
    return res.status(404).json({message:"Recipient not found"})
}
if(recipient.friends.includes(myId)){
    return res.status(400).json({message:"You are already friends"})
}

const existingRequest=await FriendRequest.findOne({
$or:[
    {sender:myId,recipient:recipientId},
    {sender:recipientId,recipient:myId}
]
});
if(existingRequest){
    return res.status(400).json({message:"Friend request already exists"})
}
 const friendRequest=await FriendRequest.create({
    sender:myId,
    recipient:recipientId   
 })
res.status(201).json(friendRequest)
    } catch (error) {
        console.log("Error in sendFriendRequest",error);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}


export const acceptFriendRequest=async(req,res)=>{

    try {
        const {id:requestId}=req.params;
        const friendRequest=await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({message:"Friend request not found"})
        }

        if(friendRequest.recipient.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to accept this friend request"})
        }
friendRequest.status="accepted";

await friendRequest.save();

await User.findByIdAndUpdate(friendRequest.ssender,{
    $push:{friends:friendRequest.recipient}
})

await User.findByIdAndUpdate(friendRequest.recipient,{
    $push:{friends:friendRequest.sender}   } )

res.status(200).json({message:"Friend request accepted successfully"})
    } catch (error) { 
        console.log("Error in acceptFriendRequest",error);
        res.status(500).json({success:false,message:"Internal server error"});          
    }
}


export const getFriendRequests=async(req,res)=>{
    try {
        const incomingReq=await FriendRequest.find({
            status:"pending",
            recipient:req.user._id
        }).populate("sender","fullname,profilePic nativeLanguage learningLanguage")


        const acceptedReqs=await FriendRequest.find({
            sender:req.user._id,
            status:"accepted"
        }).populate("recipient" ,"fulname profilePic");

        res.status(200).json({incomingReq,acceptedReqs} )

} catch (error) {
        console.log("Error in getFriendRequests",error);        
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const getOutgoingFriendRequests=async(req,res)=>{
    try {
        const outgoingRequest=await FriendRequest.find({
            status:"pending",
            sender:req.user._id
        }).populate("recipient","fullname,profilePic nativeLanguage learningLanguage")

        res.status(200).json(outgoingRequest)

} catch (error) {
        console.log("Error in getOutgoingFriendRequests",error);        
        res.status(500).json({message:"Internal server error"});
    }
}