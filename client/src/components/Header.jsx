import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { IoLogOutOutline } from "react-icons/io5";

const Avatar = ({ size = 10 }) => (
  <div className={`relative w-${size} h-${size} bg-indigo-100 rounded-full flex items-center justify-center`}>
    <User className="text-indigo-600" size={size === 10 ? 24 : 20} />
    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
  </div>
);

const Header = ({ isCollapsed }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header
      className={`flex items-center ml-6 mt-2 justify-between px-8 py-1.5 bg-white shadow-md fixed top-0 z-60 transition-all duration-300 rounded-xl ${
        isCollapsed
          ? "left-24 w-[calc(100%-5rem)]"
          : "left-60 w-[calc(100%-16rem)]"
      }`}
    >
      <div></div>

      <div className="relative">
        <button
          className="w-10 h-10 transition"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Avatar />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50 p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar size={10} />
              <span className="text-gray-700 font-medium">Admin</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
              Logout <IoLogOutOutline size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;