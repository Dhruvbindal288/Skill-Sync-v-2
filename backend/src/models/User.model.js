import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [80, 'Full name must be at most 80 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
     match: [
       
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters'],
  
    },
    location: {
      type: String,
      trim: true,
      maxlength: [120, 'Location is too long'],
    },
    bio: {
      type: String,
      default: ''
    },
    profilepic:{
        type:String,
        default:''
    },
    nativeLanguage: {
      type: String,
      default:"",
      maxlength: [50, 'Native language is too long'],
    },
      learningLanguage: {
      type: String,
      default:"",
      maxlength: [50, 'Learning language is too long'],
    },
    isonboarded:{
        type:Boolean,
        default:false
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
  },
  { timestamps: true }
);

const User= mongoose.model("User",userSchema);

export default User;