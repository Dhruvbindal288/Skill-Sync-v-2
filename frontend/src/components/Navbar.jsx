import React from "react";
import useAuthuser from "../hooks/useAuthuser";
import { useLocation } from "react-router";

function Navbar() {
  const { authUser } = useAuthuser();
  const location = useLocation();

  const handleLogout = () => {
    // clear auth state or token logic here
    console.log("User logged out");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-blue-100 sticky top-0 z-50">
   
      {location.pathname === "/chat" ? (
        <h1 className="text-2xl font-bold text-amber-500 cursor-pointer">
          SkillSync
        </h1>
      ) : (
        <span /> 
      )}

     
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
