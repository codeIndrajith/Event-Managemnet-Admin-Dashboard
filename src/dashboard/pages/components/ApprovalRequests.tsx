// src/components/ApprovalRequests.tsx
import React from "react";

interface ApprovalRequest {
  id: string;
  eventName: string;
  organizer: string;
  requestedDate: string;
}

const ApprovalRequests: React.FC = () => {
  const requests: ApprovalRequest[] = [
    {
      id: "1",
      eventName: "Charity Gala",
      organizer: "Nonprofit Org",
      requestedDate: "2023-11-20",
    },
    {
      id: "2",
      eventName: "Startup Pitch",
      organizer: "Entrepreneurs",
      requestedDate: "2023-12-01",
    },
    {
      id: "3",
      eventName: "Book Fair",
      organizer: "Literary Club",
      requestedDate: "2023-11-15",
    },
  ];

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800">{request.eventName}</h3>
              <p className="text-sm text-gray-500">{request.organizer}</p>
              <p className="text-xs text-gray-400 mt-1">
                Requested for{" "}
                {new Date(request.requestedDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 text-green-600 hover:text-green-800">
                <span className="material-icons-outlined text-sm">check</span>
              </button>
              <button className="p-1 text-red-600 hover:text-red-800">
                <span className="material-icons-outlined text-sm">close</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
        View All Requests
      </button>
    </div>
  );
};

export default ApprovalRequests;
