// src/pages/HomePage.tsx
import React from "react";
import StatsCard from "../components/StatsCard";
import RecentEventsTable from "../components/RecentEventsTable";
import ApprovalRequests from "../components/ApprovalRequests";
import { FaLocationPin } from "react-icons/fa6";
import { FaCalendarCheck, FaCheckCircle } from "react-icons/fa";
import eventImage from "../../../assets/event.jpg";
import approvedImage from "../../../assets/apprvoed.jpg";
import venueImage from "../../../assets/venueImage.jpg";
import eventEnjoy from "../../../assets/eventS.jpg";
import { MdLocationOn } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import {
  ADMIN_DASHBOARD_DATA_COUNT,
  FETCH_PENDING_APPROVAL_EVENTS,
} from "../../../reactQuery/query";
import { GetAdminDashboardDataCounts } from "../../../api/home-page/homePageAPIs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import type { UniqueResponseFormat } from "../../../api/auth/authAPIs";
import { GetPendingApprovalEvents } from "../../../api/events/eventAPIs";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { data: totalDataCounts, isLoading } = useQuery<UniqueResponseFormat>({
    queryKey: [ADMIN_DASHBOARD_DATA_COUNT],
    queryFn: () => GetAdminDashboardDataCounts({ axiosPrivate }),
  });

  const { data: recentEvent, isLoading: isLoadingDuringFetchRecentEvent } =
    useQuery<UniqueResponseFormat>({
      queryKey: [FETCH_PENDING_APPROVAL_EVENTS],
      queryFn: () => GetPendingApprovalEvents({ axiosPrivate, limit: 5 }),
    });

  const navigateToAllEventsPage = () => {
    navigate("/dashboard/event-approval");
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index + 1}
              className="bg-white shadow rounded-xl p-6 flex flex-col items-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-300" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-6 bg-gray-300 rounded w-1/2" />
              <div className="w-full h-32 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Events"
            value={totalDataCounts?.data?.totalEvent ?? 0}
            Icon={FaCalendarCheck}
            color="indigo"
            ImageLink={eventImage}
          />
          <StatsCard
            title="Pending Approvals"
            value={totalDataCounts?.data?.pendingEvents ?? 0}
            Icon={FaCheckCircle}
            color="yellow"
            ImageLink={approvedImage}
          />
          <StatsCard
            title="Active Venues"
            value={totalDataCounts?.data?.activeVenues ?? 0}
            Icon={MdLocationOn}
            color="green"
            ImageLink={venueImage}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Event Requests
            </h2>
            <button
              onClick={navigateToAllEventsPage}
              className="text-xs py-1 px-3 bg-primary cursor-pointer text-white rounded-sm"
            >
              View All
            </button>
          </div>
          {isLoadingDuringFetchRecentEvent ? (
            <div className="overflow-x-auto animate-pulse">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Venue
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(5)].map((_, index) => (
                    <tr key={index + 1}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <RecentEventsTable events={recentEvent?.data ?? []} />
          )}
        </div>

        {/* Approval Requests */}
        <div
          className="bg-white rounded-lg shadow p-6 relative text-white"
          style={{
            backgroundImage: ` url(${eventEnjoy})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <button
            onClick={() => navigate("/dashboard/events")}
            className="text-xs p-2 rounded-md hover:bg-gradient-to-r from-teal-500 to-lime-700 cursor-pointer hover:border-green-500 font-semibold text-white border border-white transition duration-300"
          >
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
