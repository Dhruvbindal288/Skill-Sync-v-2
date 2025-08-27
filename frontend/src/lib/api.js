import { axiosinstance } from "./axios";

export const signup=async(signupData)=>{
    const response=await axiosinstance.post("/auth/signup",signupData)
    return response.data
  }

export const getAuthUser=async()=>{
  const res=await axiosinstance.get("/auth/me")
  return res.data;
}


export const completeOnboard=async(userData)=>{
  const response=await axiosinstance.post("/auth/onboarding",userData);
  return response.data
}