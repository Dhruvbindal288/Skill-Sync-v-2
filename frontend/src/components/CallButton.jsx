import React from 'react'
import { Video } from "lucide-react"; // nice video icon

function CallButton({ handleVideoCall }) {
  return (
    <div className="flex justify-end items-center p-3 absolute top-0 right-0 z-10">
      <button
        onClick={handleVideoCall}
        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
      >
        <Video className="w-5 h-5" />
        
      </button>
    </div>
  )
}

export default CallButton
