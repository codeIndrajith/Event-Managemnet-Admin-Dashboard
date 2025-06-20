// src/components/Sidebar.tsx
import React from "react";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { FaFaceFrown, FaFaceSmile, FaLocationPin } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    {
      path: "/dashboard/venue-management",
      icon: <FaLocationPin />,
      label: "Venue Management",
    },
    {
      path: "/dashboard/event-approval",
      icon: <FaCheckCircle />,
      label: "Event Approvals",
    },
    {
      path: "/dashboard/events",
      icon: <MdEventAvailable />,
      label: "All Events",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
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
        <div className="flex items-center justify-between h-16 px-4 bg-primary text-white">
          <div>
            <h1 className="text-xl font-semibold">Event Hub</h1>
            <FaFaceSmile className="size-4" />
          </div>
          <img src={logo} className="w-12 md:hidden" alt="logo_image" />
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  onClick={onClose}
                >
                  <span className="material-icons-outlined mr-3">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
