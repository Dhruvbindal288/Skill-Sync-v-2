/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosinstance } from "../lib/axios";

function HomePage() {
  const queryClient = useQueryClient()
  const [outgoingReqIds, setoutgoingReqIds] = useState(new Set())

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const response = await axiosinstance.get("/users/friends")
      return response.data;
    }
  });

  const { data: recommendedUser = [], isLoading: loadingusers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosinstance.get("/users")
      return response.data;
    }
  });

  const { data: outgoingFriendReq } = useQuery({
    queryKey: ['outgoingFriendReqs'],
    queryFn: async () => {
      const response = await axiosinstance.get("/users/outgoing-friend-requests")
      return response.data;
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (userId) => {
      const response = await axiosinstance.post(`/users/friend-request/${userId}`)
      return response.data
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['outgoingFriendReqs'] }) }
  })

  useEffect(() => {
    const outgoingIds = new Set()
    if (outgoingFriendReq && outgoingFriendReq.length > 0) {
      outgoingFriendReq.forEach((req) => {
        outgoingIds.add(req.id)
      })
      setoutgoingReqIds(outgoingIds)
    }
  }, [outgoingFriendReq])

  return (
    <div className="p-6 max-w-full mx-10">
     
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Friend Requests
        </h2>
        <a href="/notifications">
          <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200">
            View All
          </button>
        </a>
      </div>

     
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loadingusers ? (
          <div className="p-6 text-gray-500 text-center">Loading...</div>
        ) : friends.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">No friend requests yet</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {friends.map(user => (
              <li
                key={user._id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200"
              >
              
                <img
                  src={user.profilepic || user.fullname}
                  alt={user.fullname}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                />

           
                <div className="flex-1">
                  <p className="text-gray-900 font-medium text-base">{user.fullname}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    🌐 Native: <span className="font-medium">{user.nativeLanguage}</span> · 
                    📖 Learning: <span className="font-medium">{user.learningLanguage}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default HomePage
