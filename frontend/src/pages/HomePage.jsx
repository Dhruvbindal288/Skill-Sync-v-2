import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosinstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import {Link} from 'react-router'
function HomePage() {
  const queryClient = useQueryClient();
  const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const response = await axiosinstance.get("/users/friends");
      return response.data;
    },
  });

  const { data: recommendedUser = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosinstance.get("/users");
      return response.data;
    },
  });

  const { data: outgoingFriendReq } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: async () => {
      const response = await axiosinstance.get(
        "/users/outgoing-friend-requests"
      );
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (userId) => {
      const response = await axiosinstance.post(
        `/users/friend-request/${userId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      toast.success("Friend Request Send Successfully")
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReq && outgoingFriendReq.length > 0) {
      outgoingFriendReq.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingReqIds(outgoingIds);
    }
  }, [outgoingFriendReq]);

  return (
    <div className="p-6 max-w-full mx-10">
     
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Friend Requests</h2>
          <p className="text-sm text-gray-500">
            People who want to connect with you
          </p>
        </div>
        <a href="/notifications">
          <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200">
            View All
          </button>
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loadingFriends ? (
          <div className="p-6 text-gray-500 text-center">Loading...</div>
        ) : friends.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">
            No friend requests yet
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {friends.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <img
                  src={user.profilepic || "/default-avatar.png"}
                  alt={user.fullname}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium truncate">
                    {user.fullname}
                  </p>
                  <p className="text-sm text-gray-500">
                    🌐 {user.nativeLanguage} · 📖 {user.learningLanguage}
                  </p>
                </div>
             <Link to={`/chat/${user._id}`}><button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200">
                  Message
                </button></Link>   
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <section className="mt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Meet New People</h2>
          <p className="text-sm text-gray-500">
            Learn what you love, teach what you want
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingUsers ? (
            <div className="col-span-full text-center text-gray-500">
              Loading...
            </div>
          ) : recommendedUser.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No new users found
            </div>
          ) : (
            recommendedUser.map((user) => (
              
              <div
                key={user._id}
                className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profilepic || "/default-avatar.png"}
                    alt={user.fullname}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div className="min-w-0">
                    <p className="text-gray-900 font-medium truncate">
                      {user.fullname}
                    </p>
                    <p className="text-sm text-gray-500">
                      🌐 {user.nativeLanguage} · 📖 {user.learningLanguage}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => mutate(user._id)}
                    disabled={isPending || outgoingReqIds.has(user._id)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 ${
                      outgoingReqIds.has(user._id)
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-400 to-blue-500 text-black hover:from-blue-500 hover:to-blue-600 hover:shadow-md"
                    }`}
                  >
                    {outgoingReqIds.has(user._id)
                      ? "Request Sent"
                      : "Add Friend"}
                  </button>

                  
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
