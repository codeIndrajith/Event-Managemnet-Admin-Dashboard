import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { EventCalendar } from "../../../api/events/eventAPIs";

// Types
interface Event {
  id: string;
  eventName: string;
  eventDate: string;
}

const EventCalendarDisplayPage: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const axiosPrivate = useAxiosPrivate();

  // Fetch events using React Query
  const {
    data: eventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", currentDate.getFullYear(), currentDate.getMonth()],
    queryFn: () => EventCalendar(axiosPrivate),
  });

  const events = eventsData?.data || [];

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Calendar grid calculation
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event: Event) =>
      isSameDay(parseISO(event.eventDate), date)
    );
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-10 bg-gray-200 rounded w-48"></div>
                <div className="h-10 bg-gray-200 rounded w-64"></div>
              </div>
            </div>
          </div>

          {/* Calendar Skeleton */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="animate-pulse">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-4 mb-6">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-4">
                {[...Array(42)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Calendar
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Event Calendar
              </h1>
              <p className="text-gray-600">
                Stay updated with all upcoming events
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={goToToday}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Today
              </button>

              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 min-w-[200px] text-center">
                  {format(currentDate, "MMMM yyyy")}
                </h2>

                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-500 py-2 text-sm"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const dayEvents = getEventsForDate(day);
                const isToday = isSameDay(day, new Date());
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentDate);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      aspect-square p-2 rounded-xl border-2 transition-all duration-200 hover:scale-105
                      ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-transparent hover:border-gray-300"
                      }
                      ${
                        isToday && !isSelected
                          ? "bg-blue-100 border-blue-300"
                          : ""
                      }
                      ${
                        !isCurrentMonth
                          ? "text-gray-400 bg-gray-50"
                          : "text-gray-700 bg-white"
                      }
                    `}
                  >
                    <div className="flex flex-col h-full">
                      <span
                        className={`text-sm font-medium ${
                          isToday ? "text-blue-600" : ""
                        }`}
                      >
                        {format(day, "d")}
                      </span>

                      {/* Event Indicators */}
                      <div className="flex-1 flex flex-col gap-1 mt-1 overflow-hidden">
                        {dayEvents.slice(0, 2).map((event: any) => (
                          <div
                            key={event.id}
                            className="text-xs bg-blue-500 text-white px-1 py-0.5 rounded truncate"
                          >
                            {event.eventName}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaCalendarAlt className="text-blue-500 text-xl" />
              <h3 className="text-xl font-bold text-gray-800">
                {selectedDate
                  ? format(selectedDate, "MMMM d, yyyy")
                  : "Select a Date"}
              </h3>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedDate ? (
                getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((event: Event) => (
                    <div
                      key={event.id}
                      className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {event.eventName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {format(
                          parseISO(event.eventDate),
                          "EEEE, MMMM d, yyyy"
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaCalendarAlt className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p>No events scheduled</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaCalendarAlt className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p>Select a date to view events</p>
                </div>
              )}
            </div>

            {/* Monthly Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">
                Monthly Overview
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {events.length}
                  </div>
                  <div className="text-sm text-green-800">Total Events</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {
                      new Set(events.map((event: Event) => event.eventDate))
                        .size
                    }
                  </div>
                  <div className="text-sm text-purple-800">Event Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendarDisplayPage;
