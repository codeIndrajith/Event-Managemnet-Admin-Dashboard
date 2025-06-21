import React from "react";
import AddVenueForm from "../../../forms/venue-management/AddVenueForm";
import Banner from "../../components/Banner";
import venueImage from "../../../assets/venues.png";
import VenueCard from "./components/VenueCard";
import { RiErrorWarningFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { FETCH_VENUES } from "../../../reactQuery/query";
import { GetAllVenues } from "../../../api/venue-management/venueAPIs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const VenuMangementPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data: venues, isLoading: isLoadingFetchVenues } = useQuery({
    queryKey: [FETCH_VENUES],
    queryFn: () => GetAllVenues({ axiosPrivate }),
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
    console.log("Edit venue:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete venue:", id);
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
          />
        </div>
        <div className="px-4">
          <h1 className="text-xl font-semibold border-b pb-2 mb-4 border-gray-400">
            Add Venue
          </h1>
          <AddVenueForm />
        </div>

        <div className="rounded-xl px-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Recent Venues
            </h2>
            <div>// pagination section</div>
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
