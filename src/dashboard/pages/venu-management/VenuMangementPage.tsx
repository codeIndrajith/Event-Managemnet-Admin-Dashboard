import React, { useState } from "react";
import AddVenueForm from "../../../forms/venue-management/AddVenueForm";
import Banner from "../../components/Banner";
import venueImage from "../../../assets/venues.png";
import VenueCard from "./components/VenueCard";
import { RiErrorWarningFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { FETCH_VENUES } from "../../../reactQuery/query";
import { GetAllVenues } from "../../../api/venue-management/venueAPIs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const PAGE_SIZE: number = 6;

const VenuMangementPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [venueId, setVenueId] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data: venues, isLoading: isLoadingFetchVenues } = useQuery({
    queryKey: [FETCH_VENUES, pageNumber],
    queryFn: () => GetAllVenues({ axiosPrivate, pageNumber }),
  });
  // const venues: any[] = [
  //   {
  //     id: "1",
  //     venueName: "Grand Ballroom",
  //     locationType: "indoor",
  //     maxAttendees: 500,
  //   },
  //   {
  //     id: "2",
  //     venueName: "Central Park Pavilion",
  //     locationType: "outdoor",
  //     maxAttendees: 1000,
  //   },
  //   {
  //     id: "3",
  //     url: "3",
  //     venueName: "Tech Conference Center",
  //     locationType: "indoor",
  //     maxAttendees: 300,
  //   },
  //   {
  //     id: "4",
  //     venueName: "Virtual Event Platform",
  //     locationType: "indoor",
  //     maxAttendees: 5000,
  //   },
  // ];

  const handleEdit = (id: string) => {
    setVenueId(id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete venue:", id);
  };

  // Handle pagination logics
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
  const venuesLength: number = venues?.data?.length ?? 0;

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
            className="px-4 py-2 mb-6 bg-primary text-white rounded-md text-sm cursor-pointer"
            onClick={() => setVenueId("")}
          >
            Add Venue
          </button>
        )}

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
                    disabled={venues?.data < PAGE_SIZE}
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
