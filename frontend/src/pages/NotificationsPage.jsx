/* eslint-disable no-unused-vars */
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosinstance } from "../lib/axios";
import { toast } from "react-hot-toast";

function NotificationsPage() {
  const queryClient = useQueryClient();

  // ✅ Fetch Friend Requests
  const { data: friendRequests, isLoading, error } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      const response = await axiosinstance.get("/users/friend-requests");
      return response.data;
    },
  });

  // ✅ Accept Friend Request
  const { mutate: acceptRequest } = useMutation({
    mutationFn: async (requestId) => {
      await axiosinstance.put(`/users/friend-request/${requestId}/accept`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"]);
toast.success("Friend Request Accepted Successfully")
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const incomingReq = friendRequests?.incomingReqs || [];
  const acceptedReq = friendRequests?.acceptedReqs || [];

  // ✅ Handle loading & error
  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Something went wrong</p>;

  return (
    <div className="p-6 w-full mx-2">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {/* Incoming Friend Requests */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Friend Requests</h3>
        {incomingReq.length === 0 ? (
          <p className="text-gray-500">No new friend requests</p>
        ) : (
          <ul className="space-y-4">
            {incomingReq.map((request) => (
              <li
                key={request._id}
                className="flex items-center justify-between p-3 bg-white shadow rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={request.sender.profilepic}
                    alt={request.sender.fullname}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <p className="font-medium">{request.sender.fullname}</p>
                </div>
                <button
                  onClick={() => acceptRequest(request._id)}
                  className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* New Connections */}
      <div>
        <h3 className="text-xl font-semibold mb-3">New Connections</h3>
        {acceptedReq.length === 0 ? (
          <p className="text-gray-500">No new connections yet</p>
        ) : (
          <ul className="space-y-4">
            {acceptedReq.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg shadow"
              >
                <img
                  src={user.recipient.profilepic}
                  alt={user.recipient.fullname}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <p className="font-medium">{user.recipient.fullname}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
