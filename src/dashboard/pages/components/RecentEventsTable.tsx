// src/components/RecentEventsTable.tsx
import React from "react";
import type { EventResponse } from "../../../api/events/eventAPIs";

interface RecentEventsTableProps {
  events: EventResponse[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
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
                <div className="font-medium text-gray-900">
                  {event.eventName}
                </div>
                <div className="text-sm text-gray-500">{event.senderName}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {event.eventDate}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {event.eventLocation}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {event?.isApproved === true && (
                  <span className="text-xs text-white bg-green-500 py-1 px-3 rounded-sm">
                    Approved
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>

        {events?.length === 0 && (
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
      </table>
    </div>
  );
};

export default RecentEventsTable;
