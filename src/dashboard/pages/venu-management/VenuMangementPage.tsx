// VenuMangementPage.tsx
import React, { useState } from "react";
import AddVenueForm from "../../../forms/venue-management/AddVenueForm";
import Banner from "../../components/Banner";
import venueImage from "../../../assets/venues.png";
import VenueCard from "./components/VenueCard";
import { RiErrorWarningFill, RiHistoryLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { FETCH_VENUES, FETCH_VENUE_HISTORY } from "../../../reactQuery/query";
import {
  GetAllVenues,
  GetVenueHistory,
} from "../../../api/venue-management/venueAPIs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaMapMarkerAlt, FaFilter, FaSearch } from "react-icons/fa";
import VenueHistorySkeleton from "../../components/venue-management/VenueHistorySkeleton";
import VenueHistoryCard from "../../components/venue-management/VenueHistoryTable";
import VenueHistoryTable from "../../components/venue-management/VenueHistoryTable";

const PAGE_SIZE: number = 6;

const VenuMangementPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [venueId, setVenueId] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [historyPageNumber, setHistoryPageNumber] = useState<number>(1);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");

  // Fetch venues query
  const { data: venues, isLoading: isLoadingFetchVenues } = useQuery({
    queryKey: [FETCH_VENUES, pageNumber],
    queryFn: () => GetAllVenues({ axiosPrivate, pageNumber }),
  });

  // Fetch venue history query
  const { data: venueHistory, isLoading: isLoadingVenueHistory } = useQuery({
    queryKey: [
      FETCH_VENUE_HISTORY,
      historyPageNumber,
      searchTerm,
      locationFilter,
    ],
    queryFn: () =>
      GetVenueHistory({
        axiosPrivate,
        pageNumber: historyPageNumber,
        venueName: searchTerm || undefined,
        locationType: locationFilter || undefined,
      }),
    enabled: showHistory,
  });

  const handleEdit = (id: string) => {
    setVenueId(id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete venue:", id);
  };

  // Pagination handlers for venues
  const handleNextPage = (): void => {
    if (venues?.data.length === PAGE_SIZE) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  // Pagination handlers for history
  const handleHistoryNextPage = (): void => {
    if (venueHistory?.data.length === PAGE_SIZE) {
      setHistoryPageNumber((prev) => prev + 1);
    }
  };

  const handleHistoryPrevPage = (): void => {
    if (historyPageNumber > 1) {
      setHistoryPageNumber((prev) => prev - 1);
    }
  };

  const venuesLength: number = venues?.data?.length ?? 0;
  const historyLength: number = venueHistory?.data?.length ?? 0;

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setHistoryPageNumber(1);
  };

  return (
    <div className="min-h-screen px-4">
      <div>
        <div className="mb-4">
          <Banner
            title="Create and Manage Venues with Ease"
            description="Add details and specifications for every new venue"
            imageSrc={venueImage}
            imageAlt="VenueImage"
            className="object-cover w-[200px]"
          />
        </div>

        {!venueId ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
              <FaMapMarkerAlt className="text-indigo-600 text-lg" />
              <h2 className="text-lg font-semibold text-gray-800">
                Add Event Venue
              </h2>
            </div>
            <AddVenueForm setVenueId={setVenueId} />
          </div>
        ) : (
          <button
            className="px-4 py-2 mb-6 bg-primary text-white rounded-md text-sm cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => setVenueId("")}
          >
            Add Venue
          </button>
        )}

        {/* Venue History Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <RiHistoryLine className="text-xl text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Venue History
                </h2>
                <p className="text-sm text-gray-600">
                  Recently created venues and their details
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showHistory
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
                }`}
              >
                {showHistory ? "Hide History" : "Show History"}
              </button>

              {showHistory && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-red-300 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {showHistory && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FaSearch className="w-4 h-4 mr-2" />
                      Search Venues
                    </label>
                    <input
                      type="text"
                      placeholder="Search by venue name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FaFilter className="w-4 h-4 mr-2" />
                      Filter by Location Type
                    </label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* History Content */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-gray-800">
                    Page: {historyPageNumber}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleHistoryPrevPage}
                      disabled={historyPageNumber === 1}
                      className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                        historyPageNumber === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <MdNavigateBefore className="text-lg" />
                    </button>

                    <span className="min-w-[48px] text-center text-md text-black font-semibold">
                      {historyPageNumber}
                    </span>

                    <button
                      onClick={handleHistoryNextPage}
                      disabled={historyLength < PAGE_SIZE}
                      className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                        historyLength < PAGE_SIZE
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <MdNavigateNext className="text-lg" />
                    </button>
                  </div>
                </div>

                {isLoadingVenueHistory ? (
                  <div className="">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <VenueHistorySkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="">
                    {venueHistory && venueHistory.data?.length > 0 ? (
                      // FIX: Render the table once with all data
                      <VenueHistoryTable venues={venueHistory.data} />
                    ) : (
                      <div className="col-span-full bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
                        <RiErrorWarningFill className="text-4xl text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">
                          No venue history found
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {searchTerm || locationFilter
                            ? "Try adjusting your filters"
                            : "No venues have been created recently"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Existing Recent Venues Section */}
        <div className="rounded-xl">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Recent Venues
            </h2>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">Page No: {pageNumber}</p>

                <div className="flex items-center justify-center md:justify-end">
                  <button
                    onClick={handlePrevPage}
                    disabled={pageNumber === 1}
                    className={`flex items-center justify-center p-2 rounded-lg ${
                      pageNumber === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    <span>
                      <MdNavigateBefore className="text-lg" />
                    </span>
                  </button>

                  <span className="min-w-[48px] text-center text-md text-black font-semibold">
                    <p>{pageNumber}</p>
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={venuesLength < PAGE_SIZE}
                    className={`flex items-center justify-center p-2 rounded-lg ${
                      venuesLength < PAGE_SIZE
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    <span>
                      <MdNavigateNext className="text-lg" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isLoadingFetchVenues ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index + 1}
                className="bg-white rounded-xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 shadow-sm border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                    <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start text-gray-600 mb-4">
                      <div className="flex items-center">
                        <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 w-24 bg-gray-200 rounded mt-2 ml-6"></div>
                    </div>

                    <div className="flex flex-col items-start text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 w-20 bg-gray-200 rounded mt-2 ml-6"></div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {venues && venues.data?.length > 0 ? (
                venues.data?.map((venue: any) => (
                  <div key={venue?.id}>
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                ))
              ) : (
                <div className="bg-gray-300 p-2 text-black text-xs flex items-center gap-2">
                  <RiErrorWarningFill /> No Venues Add yet
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenuMangementPage;
