// components/venue-management/VenueHistoryTableSkeleton.tsx
import React from "react";

const VenueHistoryTableSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header Skeleton */}
      <div className="hidden md:grid md:grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="col-span-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* Table Body Skeleton */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-4 md:px-6 md:py-4 animate-pulse">
            {/* Desktop View Skeleton */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
              {/* Venue Details */}
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="col-span-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              </div>

              {/* Created By */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>

              {/* Date Created */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View Skeleton */}
            <div className="md:hidden space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueHistoryTableSkeleton;
