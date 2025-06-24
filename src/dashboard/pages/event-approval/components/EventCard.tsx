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
import { IoIosCloseCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

interface EventCardProps {
  event: EventResponse;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onApprove,
  onReject,
}) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4">
      <div className="hidden md:grid md:grid-cols-12 bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="md:col-span-4 flex items-center gap-2">
          <FiBriefcase className="text-gray-400" size={14} />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Event
          </span>
        </div>
        <div className="md:col-span-8 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-400" size={14} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organizer
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400" size={14} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              When
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin className="text-gray-400" size={14} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Where
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 hover:bg-gray-50 transition-colors">
        <div className="md:col-span-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <FiBriefcase className="text-blue-600" size={16} />
            </div>
            <div className="w-full">
              <h3 className="font-medium text-gray-900">
                {event.senderOrganization}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{event.senderRole}</p>

              <div className="md:hidden mt-3 space-y-3 w-full">
                <div className="flex items-center gap-3">
                  <FiUser className="text-gray-400 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-sm text-gray-500">Organizer</p>
                    <p className="font-medium text-gray-900">
                      {event.senderName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar
                    className="text-gray-400 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <p className="text-sm text-gray-500">When</p>
                    <p className="font-medium text-gray-900">
                      {event.eventDate} at {event.eventTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-gray-400 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-sm text-gray-500">Where</p>
                    <p className="font-medium text-gray-900">
                      {event.eventLocation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:col-span-8 grid-cols-3 gap-4">
          <div>
            <p className="font-medium text-gray-900">{event.senderName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">{event.eventDate}</p>
            <p className="text-sm text-gray-500 mt-1">{event.eventTime}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 line-clamp-2">
              {event.eventLocation}
            </p>
          </div>
        </div>

        <div className="col-span-full">
          <a
            href={event.letterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            <FaRegFilePdf size={14} />
            <span>View Approval Letter</span>
            <FiDownload className="ml-1" size={14} />
          </a>
        </div>
      </div>

      <div className="border-t bg-primary border-gray-200 px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => handleNavigate("approve", event.id)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-white border hover:bg-green-500 cursor-pointer hover:border-none text-sm font-medium rounded-md transition-colors"
            >
              <FaCheckCircle size={16} />
              <span>Approve</span>
            </button>
            <button
              onClick={() => handleNavigate("reject", event.id)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-white border cursor-pointer hover:bg-red-500 hover:border-none text-sm font-medium rounded-md transition-colors"
            >
              <IoIosCloseCircle size={16} />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
