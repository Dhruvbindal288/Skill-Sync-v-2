/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { axiosinstance } from "../lib/axios";
function HomePage() {
  
  const queryClient=useQueryClient()
  const[outgoingReqIds,setoutgoingReqIds]=useState(new Set())
  const{data:friends=[],isLoading:loadingFriends}=useQuery({
    queryKey:['friends'],
queryFn:async()=>{
  const response=await axiosinstance.get("/users/friends")
  return response.data;
}
  });
  const{data:recommendedUser=[],isLoading:loadingusers}=useQuery({
    queryKey:['users'],
queryFn:async()=>{
    const response=await axiosinstance.get("/users")
  return response.data;
}
  });
  
   const{data:outgoingFriendReq}=useQuery({
    queryKey:['outgoingFriendReqs'],
queryFn:async()=>{
    const response=await axiosinstance.get("/users/outgoing-friend-requests")
  return response.data;
}
  });


  const{mutate,isPending}=useMutation({
    mutationFn:async(userId)=>{
const response=await axiosinstance.post(`/users/friend-request/${userId}`)
return response.data
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['outgoingFriendReqs']})}
  })
  

useEffect(()=>{
const outgoingIds=new Set()
if(outgoingFriendReq && outgoingFriendReq.length>0){
  outgoingFriendReq.forEach((req)=>{
    outgoingIds.add(req.id)
  })
  setoutgoingReqIds(outgoingIds)
}
},[outgoingFriendReq])



  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Friend Requests</h2>
        <a href="/notifications">
          <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
            Friends Request
          </button>
        </a>
      </div>
      {/* Friend Requests List */}
      <div>
        {loadingusers ? (
          <div>Loading...</div>
        ) : friends.length === 0 ? (
          <div>No friend requests yet</div>
        ) : (
          friends.map(user => (
            <div
              key={user._id}
              className="bg-white rounded shadow p-4 flex items-center gap-4 max-w-md mb-4"
            >
              <img
                src={user.profilepic || user.fullname}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold">{user.fullname}</div>
                <div className="text-sm text-gray-600">
                  Native Language: {user.nativeLanguage}<br />
                  Learning Language: {user.learningLanguage}
                </div>
              </div>
            
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage
