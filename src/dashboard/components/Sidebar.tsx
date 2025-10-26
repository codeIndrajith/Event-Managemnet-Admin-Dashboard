// src/components/Sidebar.tsx
import React from "react";
import { FaCalendar, FaRegCheckCircle } from "react-icons/fa";
import {
  MdEventAvailable,
  MdOutlineDashboard,
  MdOutlineLocationOn,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import navbarImage from "../../assets/dashboard-img1.jpg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "/dashboard", icon: <MdOutlineDashboard />, label: "Dashboard" },
    {
      path: "/dashboard/venue-management",
      icon: <MdOutlineLocationOn className="text-xl" />,
      label: "Venue Management",
    },
    {
      path: "/dashboard/event-approval",
      icon: <FaRegCheckCircle />,
      label: "Event Management",
    },
    {
      path: "/dashboard/events",
      icon: <MdEventAvailable />,
      label: "All Events",
    },
    {
      path: "/dashboard/events-calendar",
      icon: <FaCalendar />,
      label: "Event Calendar",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className=" fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } 
        md:translate-x-0 transition-transform duration-200 ease-in-out z-30 w-64 bg-white shadow-lg`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-t from-stone-900 via-rose-900 to-amber-700  text-white">
          <div className="flex items-center justify-start gap-2 w-full">
            <img src={logo} className="w-6" alt="logo_image" />{" "}
            <h1 className="text-2xl font-semibold">Syncro</h1>
          </div>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index + 1}>
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-r-xl ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  onClick={onClose}
                >
                  <span className="material-icons-outlined mr-3">
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <img
            src={navbarImage}
            alt="navbar_image"
            className="w-[max] absolute bottom-0"
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
