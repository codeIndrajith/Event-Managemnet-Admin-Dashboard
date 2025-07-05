import React from "react";
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
import EventCardSkelton from "./components/EventCardSkelton";

const EventApprovalPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();

  const { data: pendingApprovalEvents, isLoading } = useQuery({
    queryKey: [FETCH_PENDING_APPROVAL_EVENTS],
    queryFn: () => GetPendingApprovalEvents({ axiosPrivate }),
  });

  return (
    <div className="min-h-screen px-4">
      <div className="">
        <div className="mb-8">
          <Banner
            title="Manage Event Approvals"
            description="Take control of the event flow — view pending events, approve what’s great, and reject what doesn’t fit. Keep your platform clean and engaging"
            imageSrc={eventImage}
            imageAlt="eventImage"
            className="object-cover w-[200px] md:w-[200px] lg:w-[250px]"
          />
        </div>

        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index + 1}>
              <EventCardSkelton />
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {pendingApprovalEvents?.data.map((event: EventResponse) => (
              <EventCard key={event.id} event={event} isPublic={false} />
            ))}

            {pendingApprovalEvents?.data.length === 0 && (
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
                <p>There are no events to display</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventApprovalPage;
