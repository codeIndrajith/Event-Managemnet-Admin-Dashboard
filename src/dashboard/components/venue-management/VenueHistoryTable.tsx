import React from "react";
import { FaUsers, FaUser, FaCalendar } from "react-icons/fa";

interface VenueHistory {
  id: string;
  venueName: string;
  locationType: string;
  maxAttendees: number;
  createdAt: string;
  adminName: string;
}

interface VenueHistoryTableProps {
  venues: VenueHistory[];
}

const VenueHistoryTable: React.FC<VenueHistoryTableProps> = ({ venues }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLocationTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "indoor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "outdoor":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLocationTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "indoor":
        return "🏢";
      case "outdoor":
        return "🌳";
      default:
        return "📍";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header - Desktop */}
      <div className="hidden md:grid md:grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="col-span-4">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Venue Details
          </span>
        </div>
        <div className="col-span-2 text-center">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Capacity
          </span>
        </div>
        <div className="col-span-3">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Created By
          </span>
        </div>
        <div className="col-span-3">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Date Created
          </span>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-12 px-6 py-4 items-center">
              {/* Venue Details */}
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {getLocationTypeIcon(venue.locationType)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {venue.venueName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 rounded-sm text-[11px] font-medium border ${getLocationTypeColor(
                          venue.locationType
                        )}`}
                      >
                        {venue.locationType.charAt(0).toUpperCase() +
                          venue.locationType.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="col-span-2">
                <div className="flex items-center justify-center gap-2">
                  <FaUsers className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">
                    {venue.maxAttendees.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Created By */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <FaUser className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {venue.adminName}
                  </span>
                </div>
              </div>

              {/* Date Created */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-3 h-3 text-gray-400" />
                  <div className="text-sm text-gray-700">
                    <div>{formatDate(venue.createdAt)}</div>
                    <div className="text-xs text-gray-500">
                      {formatTime(venue.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {getLocationTypeIcon(venue.locationType)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {venue.venueName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-sm text-[11px] font-medium border ${getLocationTypeColor(
                          venue.locationType
                        )}`}
                      >
                        {venue.locationType.charAt(0).toUpperCase() +
                          venue.locationType.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaUsers className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">Capacity</div>
                    <div className="font-medium text-gray-700">
                      {venue.maxAttendees.toLocaleString()} attendees
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaUser className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">Created By</div>
                    <div className="font-medium text-gray-700">
                      {venue.adminName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 col-span-2">
                  <FaCalendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">Created On</div>
                    <div className="font-medium text-gray-700">
                      {formatDate(venue.createdAt)} at{" "}
                      {formatTime(venue.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                  ID: {venue.id.slice(0, 8)}...
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueHistoryTable;
