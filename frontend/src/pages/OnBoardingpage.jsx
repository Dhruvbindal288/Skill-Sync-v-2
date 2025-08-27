/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthuser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import { completeOnboard } from '../lib/api';
function OnBoardingPage() {
  const{authUser}=useAuthUser();
const queryClient=useQueryClient()
  const [formState,setFormState]=useState({
     fullname: authUser?.fullname || "",
  bio: authUser?.bio || "",
  nativeLanguage: authUser?.nativeLanguage || "",
  learningLanguage: authUser?.learningLanguage || "",
  profilePic: authUser?.profilePic || "https://api.dicebear.com/6.x/avataaars/png?seed=9",
  location: authUser?.location || ""
  });

  const{mutate,isPending}=useMutation({
    mutationFn:completeOnboard,
    onSuccess:()=>{
      toast.success("profile Completed Successfully");
      queryClient.invalidateQueries({queryKey:['authUser']})
    }
  })

  const handleSubmit=(e)=>{
    e.preventDefault()
    mutate(formState)
  }
  return (
    (
    <div className="min-h-screen flex items-center justify-center bg-blue-200 p-6">
      <form
        className="bg-white rounded-3xl p-6 lg:p-10 w-full lg:w-[600px] space-y-4 shadow-lg overflow-hidden"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-amber-500 font-bold mb-4">SkillSync</h1>
        <h2 className="text-2xl text-gray-700 font-bold mb-6">Complete your profile</h2>

        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={formState.profilePic}
            alt={formState.fullname}
            className="w-20 h-20 rounded-full border"
          />
          <button
            type="button"
            className="bg-blue-200 px-4 py-2 rounded"
            onClick={() =>
              setFormState({
                ...formState,
                profilePic: `https://api.dicebear.com/6.x/avataaars/png?seed=${Math.floor(Math.random() * 1000)}`
              })
            } 
          >
            Randomize
          </button>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullname" className="block mb-1 font-medium">Full Name:</label>
          <input
            type="text"
            id="fullname"
            placeholder="Your full name"
            className="focus:outline-none border rounded w-full p-2"
            value={formState.fullname}
            onChange={(e) => setFormState({ ...formState, fullname: e.target.value })}
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block mb-1 font-medium">Bio:</label>
          <textarea
            id="bio"
            placeholder="Tell us about yourself"
            className="focus:outline-none border rounded w-full p-2"
            value={formState.bio}
            onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
            rows={3}
          />
        </div>

        {/* Native Language */}
        <div>
          <label htmlFor="nativeLanguage" className="block mb-1 font-medium">Native Language:</label>
          <input
            type="text"
            id="nativeLanguage"
            placeholder="English"
            className="focus:outline-none border rounded w-full p-2"
            value={formState.nativeLanguage}
            onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
          />
        </div>

        {/* Learning Language */}
        <div>
          <label htmlFor="learningLanguage" className="block mb-1 font-medium">Learning Language:</label>
          <input
            type="text"
            id="learningLanguage"
            placeholder="Spanish"
            className="focus:outline-none border rounded w-full p-2"
            value={formState.learningLanguage}
            onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block mb-1 font-medium">Location:</label>
          <input
            type="text"
            id="location"
            placeholder="Your city or country"
            className="focus:outline-none border rounded w-full p-2"
            value={formState.location}
            onChange={(e) => setFormState({ ...formState, location: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded-xl text-lg"
        >
          {isPending ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  )
)}

export default OnBoardingPage
