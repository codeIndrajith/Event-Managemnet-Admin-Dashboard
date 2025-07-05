// src/components/TopBar.tsx
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiMenu2Line } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import { FaCaretDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/reactReduxTypedHooks";
import { logout, selectAuthSliceUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserUpdateForm from "../../forms/auth/userUpdateForm";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const authUser = useAppSelector(selectAuthSliceUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleUserLogout = () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message ?? "Error occurred signout", {
        position: "top-right",
        className: "text-xs",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm z-10 pr-8">
      <div className="flex items-center justify-between h-16 sm:px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-1 pl-8 md:pl-0 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <RiMenu2Line className="text-xl md:hidden" />
          </button>
          <img src={logo} className="w-6.5 hidden md:block ml-4" alt="logo" />
        </div>

        <div className="flex items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-start space-x-2 focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <div>
                  {authUser?.profileImage ? (
                    <img
                      src={authUser.profileImage}
                      className="rounded-full object-cover w-10 h-10"
                      alt="User profile"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <div className="flex flex-col  p-2 items-start">
                  <span className="text-gray-600">{authUser?.name}</span>
                  <small className="text-[11px]">Admin</small>
                </div>
              </div>
              <FaCaretDown
                className={`text-gray-500 bg-primary rounded-full text-white  mt-3 cursor-pointer transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl py-1 z-50 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="px-4 bg-primary py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-white">Signed in as</p>
                <p className="text-sm text-white truncate">{authUser?.email}</p>
              </div>

              <button
                onClick={() => setOpenProfileModal(true)}
                className="w-full cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <FaUser className="mr-3 text-gray-400" />
                Profile
              </button>

              <div className="border-t border-gray-100"></div>

              <button
                onClick={handleUserLogout}
                className="w-full cursor-pointer flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150"
              >
                <FaSignOutAlt className="mr-3 text-red-400" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {openProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
          <div
            className="absolute inset-0"
            onClick={() => setOpenProfileModal(false)}
            aria-label="Close modal"
          ></div>
          <div className="relative w-full max-w-md mx-4 bg-white rounded-md shadow-2xl p-6 sm:p-8 transform transition-all duration-300 scale-100 hover:scale-[1.02]">
            <div className="flex items-center justify-center gap-2 mb-3 bg-primary p-2 rounded-md">
              <FaUserCircle className="text-lg text-white" />
              <h2 className="text-lg font-semibold text-white">Profile Edit</h2>
            </div>
            <UserUpdateForm setOpenProfileModal={setOpenProfileModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
