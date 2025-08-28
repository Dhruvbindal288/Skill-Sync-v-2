import React from "react";
import { useLocation, useNavigate } from "react-router";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
  
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

      
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/chat")}
          className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
        >
          Chat
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
