import React from "react";
import {
  FiDownload,
  FiCheck,
  FiX,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa";

interface EventCardProps {
  event: {
    id: string;
    senderName: string;
    senderRole: string;
    senderOrganization: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    approveRequestLetterLink: string;
    status?: "pending" | "approved" | "rejected";
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onApprove,
  onReject,
}) => {
  const getStatusColor = () => {
    switch (event.status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {event.senderOrganization}
          </h2>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {event.status?.toUpperCase() || "PENDING"}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <FiUser className="text-gray-400 mr-2" />
            <span className="text-gray-600 text-sm">{event.senderName}</span>
          </div>
          <div className="flex items-center">
            <FiBriefcase className="text-gray-400 mr-2" />
            <span className="text-gray-600 text-sm capitalize">
              {event.senderRole}
            </span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="text-gray-400 mr-2" />
            <span className="text-gray-600 text-sm">
              {formatDate(event.eventDate)}
            </span>
          </div>
          <div className="flex items-center">
            <FiClock className="text-gray-400 mr-2" />
            <span className="text-gray-600 text-sm">{event.eventTime}</span>
          </div>
          <div className="flex items-center">
            <FiMapPin className="text-gray-400 mr-2" />
            <span className="text-gray-600 text-sm">{event.eventLocation}</span>
          </div>
        </div>

        <div className="mt-5">
          <a
            href={event.approveRequestLetterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaRegFilePdf className="mr-2" size={16} />
            <span>View Approval Letter</span>
            <FiDownload className="ml-1" size={14} />
          </a>
        </div>

        {event.status === "pending" && (
          <div className="mt-6 flex space-x-3">
            <button
              onClick={() => onApprove(event.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-colors"
            >
              <FiCheck className="mr-2" size={16} />
              Approve
            </button>
            <button
              onClick={() => onReject(event.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-colors"
            >
              <FiX className="mr-2" size={16} />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
