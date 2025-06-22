import React, { useState, useEffect } from "react";
import EventCard from "./components/EventCard";
import Banner from "../../components/Banner";
import eventImage from "../../../assets/event.png";

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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  useEffect(() => {
    // Simulate API fetch
    const fetchEvents = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockEvents: Event[] = [
          {
            id: "b81e9836-8a99-4d2f-b761-80fd65662baf",
            senderName: "Indrajith Bodhinayaka",
            senderRole: "organizer",
            senderOrganization: "University Events",
            eventDate: "2025-04-11",
            eventTime: "11.00AM",
            eventLocation: "Main Auditorium 2",
            approveRequestLetterLink: "https://example.com/letter.pdf",
            status: "pending",
          },
          {
            id: "a92e9836-8b99-4d2f-b761-80fd65662baf",
            senderName: "Jane Smith",
            senderRole: "coordinator",
            senderOrganization: "Tech Corp",
            eventDate: "2025-04-15",
            eventTime: "02.30PM",
            eventLocation: "Conference Room A",
            approveRequestLetterLink: "https://example.com/letter2.pdf",
            status: "approved",
          },
        ];
        setEvents(mockEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleApprove = (id: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: "approved" } : event
      )
    );
  };

  const handleReject = (id: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: "rejected" } : event
      )
    );
  };

  const filteredEvents = events.filter((event) =>
    filter === "all" ? true : event.status === filter
  );

  if (loading) {
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

        <div className="mb-6 flex flex-wrap gap-2">
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
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
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
