import React from "react";
import AddVenueForm from "../../../forms/venue-management/AddVenueForm";
import Banner from "../../components/Banner";
import venueImage from "../../../assets/venues.png";

const VenuMangementPage: React.FC = () => {
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

        {/* Recent venues */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Venues
          </h2>
          <div className="text-center py-8 text-gray-500">
            <p>Venue list will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenuMangementPage;
