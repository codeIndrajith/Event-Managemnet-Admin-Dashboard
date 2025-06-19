// src/components/TopBar.tsx
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiMenu2Line } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import { FaCaretDown, FaCog, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-1 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <RiMenu2Line className="text-xl md:hidden" />
          </button>
          <img src={logo} className="w-12 hidden md:block ml-4" alt="logo" />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaUser className="text-indigo-600 text-sm" />
              </div>
              <span className="text-gray-600 hidden sm:inline">Admin</span>
              <FaCaretDown
                className={`text-gray-500 transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">
                  Signed in as
                </p>
                <p className="text-sm text-gray-500 truncate">
                  admin@example.com
                </p>
              </div>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <FaUser className="mr-3 text-gray-400" />
                Profile
              </a>

              <div className="border-t border-gray-100"></div>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150"
              >
                <FaSignOutAlt className="mr-3 text-red-400" />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
