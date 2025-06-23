import React, { useState, useEffect } from "react";
import EventCard from "./components/EventCard";
import Banner from "../../components/Banner";
import eventImage from "../../../assets/event.png";
import { useQuery } from "@tanstack/react-query";
import { FETCH_PENDING_APPROVAL_EVENTS } from "../../../reactQuery/query";
import {
  GetPendingApprovalEvents,
  type EventResponse,
} from "../../../api/events/eventAPIs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import type { UniqueResponseFormat } from "../../../api/auth/authAPIs";

interface Event {
  id: string;
  senderName: string;
  senderRole: string;
  senderOrganization: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  approveRequestLetterLink: string;
  status?: "pending" | "approved" | "rejected";
}

const EventApprovalPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const { data: pendingApprovalEvents, isLoading } = useQuery({
    queryKey: [FETCH_PENDING_APPROVAL_EVENTS],
    queryFn: () => GetPendingApprovalEvents({ axiosPrivate }),
  });

  const handleApprove = (id: string) => {
    console.log(id);
  };

  const handleReject = (id: string) => {
    console.log(id);
  };

  // const filteredEvents = events.filter((event) =>
  //   filter === "all" ? true : event.isApproved === filter
  // );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Banner
            title="Manage Event Approvals"
            description="Take control of the event flow — view pending events, approve what’s great, and reject what doesn’t fit. Keep your platform clean and engaging"
            imageSrc={eventImage}
            imageAlt="eventImage"
            className="object-cover w-[200px] md:w-[200px] lg:w-[250px]"
          />
        </div>

        {/* <div className="mb-6 flex flex-wrap gap-2">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {f === "all"
                ? "All Events"
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div> */}
        <div className="border-b pb-2 mb-2">
          <h1 className="text-lg font-semibold">Pending Approval Events</h1>
        </div>

        <div className="w-full">
          {pendingApprovalEvents && pendingApprovalEvents.data.length > 0 ? (
            pendingApprovalEvents.data.map((event: EventResponse) => (
              <EventCard
                key={event.id}
                event={event}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No events found
              </h3>
              <p className="text-gray-500">
                {filter === "all"
                  ? "There are no events to display"
                  : `No ${filter} events found`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventApprovalPage;
