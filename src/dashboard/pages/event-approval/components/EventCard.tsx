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
  FiFile,
  FiInfo,
} from "react-icons/fi";
import { FaCheckCircle, FaRegFilePdf } from "react-icons/fa";
import type { EventResponse } from "../../../../api/events/eventAPIs";
import { IoIosCloseCircle, IoMdCloseCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

interface EventCardProps {
  event: EventResponse;
  isPublic?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isPublic }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (action: string, id: string) => {
    if (action === "approve") {
      navigate(`${location?.pathname}/${id}?isApprove=${true}`);
    }
    if (action === "reject") {
      navigate(`${location?.pathname}/${id}?isApprove=${false}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-4">
      {/* Header with subtle accent */}
      <div className="px-6 py-3 bg-primary border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <FiBriefcase className="text-black" size={16} />
          </div>
          <h3 className="text-md font-semibold text-white">Event Details</h3>
        </div>
      </div>

      {/* Data Grid - Modern Table Style */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Organization */}
        <div className="px-5 py-4 border-b border-r border-gray-100">
          <div className="flex items-start gap-4">
            <div className="mt-0.5">
              <FiBriefcase className="text-gray-400" size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Organization
              </p>
              <p className="font-medium text-xs text-gray-900">
                {event.senderOrganization}
              </p>
            </div>
          </div>
        </div>

        {/* Organizer */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="mt-0.5">
              <FiUser className="text-gray-400" size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Organizer
              </p>
              <p className="font-medium text-xs text-gray-900">
                {event.senderName}
              </p>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="px-5 py-4 border-b border-r border-gray-100">
          <div className="flex items-start gap-4">
            <div className="mt-0.5">
              <FiCalendar className="text-gray-400" size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Date & Time
              </p>
              <p className="font-medium text-xs text-gray-900">
                {event.eventDate}
              </p>
              <p className="text-xs text-gray-500 mt-1">{event.eventTime}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="mt-0.5">
              <FiMapPin className="text-gray-400" size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
              <p className="font-medium text-xs text-gray-900">
                {event.eventLocation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Section */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaRegFilePdf className="text-red-500" size={18} />
            <span className="text-sm font-medium text-gray-700">
              Approval Letter
            </span>
          </div>
          <a
            href={event.letterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg transition-all"
          >
            View Document
            <FiDownload size={16} />
          </a>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {event?.isApproved === true ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <FaCheckCircle className="text-green-600" size={16} />
              <span className="text-sm font-medium text-green-600">
                Approved
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-full">
              <FaCheckCircle className="text-yellow-600" size={16} />
              <span className="text-sm font-medium text-yellow-800">
                Pending
              </span>
            </div>
          )}
        </div>

        {event?.isApproved === false && isPublic === false && (
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleNavigate("approve", event.id)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <FaCheckCircle size={16} />
              Approve
            </button>
            <button
              onClick={() => handleNavigate("reject", event.id)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <IoIosCloseCircle size={16} />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
