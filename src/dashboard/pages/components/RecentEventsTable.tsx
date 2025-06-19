// src/components/RecentEventsTable.tsx
import React from "react";

interface Event {
  id: string;
  name: string;
  organizer: string;
  date: string;
  venue: string;
  status: "approved" | "pending" | "rejected";
}

const RecentEventsTable: React.FC = () => {
  const events: Event[] = [
    {
      id: "1",
      name: "Tech Conference 2023",
      organizer: "Tech Org",
      date: "2023-11-15",
      venue: "Convention Center",
      status: "approved",
    },
    {
      id: "2",
      name: "Music Festival",
      organizer: "Music Group",
      date: "2023-12-05",
      venue: "Central Park",
      status: "pending",
    },
    {
      id: "3",
      name: "Business Expo",
      organizer: "Chamber of Commerce",
      date: "2023-10-28",
      venue: "Grand Hotel",
      status: "approved",
    },
    {
      id: "4",
      name: "Art Exhibition",
      organizer: "Art Society",
      date: "2023-11-10",
      venue: "Modern Art Gallery",
      status: "rejected",
    },
    {
      id: "5",
      name: "Food Fair",
      organizer: "Local Vendors",
      date: "2023-11-22",
      venue: "Town Square",
      status: "pending",
    },
  ];

  const statusColors = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="overflow-x-auto">
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
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-medium text-gray-900">{event.name}</div>
                <div className="text-sm text-gray-500">{event.organizer}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {event.venue}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-md ${
                    statusColors[event.status]
                  }`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentEventsTable;
