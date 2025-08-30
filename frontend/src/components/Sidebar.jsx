import React from "react";
import useAuthuser from "../hooks/useAuthuser";
import { Link, useLocation } from "react-router";

function Sidebar() {
  const { authUser } = useAuthuser();
  const location = useLocation();

  const linkClasses = "block px-4 py-2 rounded-xl transition duration-200";
  const activeClasses = "bg-white shadow-sm text-blue-600 font-semibold";

  return (
    <div className="w-60 bg-blue-100 hidden border-r lg:flex flex-col h-screen sticky top-0">
      <Link to="/">
        <h1 className="text-3xl font-bold text-amber-500 cursor-pointer p-2 mb-2">
          SkillSync
        </h1>
      </Link>

      <nav className="flex-1 p-2 space-y-1">
      
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses} hover:bg-amber-200`
          }
        >
          Home
        </Link>

        
        <Link
          to="/notifications"
          className={
            location.pathname === "/notifications"
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses} hover:bg-amber-200`
          }
        >
          Notifications
        </Link>
      </nav>

      
      <div className="flex items-center gap-3 p-3">
        <img
          src={authUser?.profilepic}
          alt={authUser?.fullname}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div>
          <p className="font-semibold text-gray-800">{authUser?.fullname}</p>
          <p className="text-sm text-green-500 font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
