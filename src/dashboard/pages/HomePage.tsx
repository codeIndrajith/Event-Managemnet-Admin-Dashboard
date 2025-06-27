// src/pages/HomePage.tsx
import React from "react";
import StatsCard from "./components/StatsCard";
import RecentEventsTable from "./components/RecentEventsTable";
import ApprovalRequests from "./components/ApprovalRequests";
import { FaLocationPin } from "react-icons/fa6";
import { FaCalendarCheck, FaCheckCircle } from "react-icons/fa";
import eventImage from "../../assets/event.jpg";
import approvedImage from "../../assets/apprvoed.jpg";
import venueImage from "../../assets/venueImage.jpg";
import { MdLocationOn } from "react-icons/md";

const HomePage: React.FC = () => {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Events"
          value="128"
          Icon={FaCalendarCheck}
          color="indigo"
          ImageLink={eventImage}
        />
        <StatsCard
          title="Pending Approvals"
          value="24"
          Icon={FaCheckCircle}
          color="yellow"
          ImageLink={approvedImage}
        />
        <StatsCard
          title="Active Venues"
          value="18"
          Icon={MdLocationOn}
          color="green"
          ImageLink={venueImage}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Events
            </h2>
            <button className="text-xs py-1 px-3 bg-primary cursor-pointer text-white rounded-sm">
              View All
            </button>
          </div>
          <RecentEventsTable />
        </div>

        {/* Approval Requests */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Approval Requests
          </h2>
          <ApprovalRequests />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
