import React from "react";

const EventCardSkelton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="px-6 py-3 bg-primary border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Grid Body */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`px-5 py-4 border-b ${
              i % 2 === 0 ? "border-r" : ""
            } border-gray-100`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 w-5 h-5 bg-gray-300 rounded"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
                {i === 2 && (
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Section */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-32 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkelton;
