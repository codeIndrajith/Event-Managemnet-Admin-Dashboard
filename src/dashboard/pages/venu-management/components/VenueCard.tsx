import React, { useState } from "react";
import { FaMapMarkerAlt, FaUsers, FaEdit, FaTrash } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";
import Overlay from "../../../components/modals/Overlay";
import Modal from "../../../components/modals/Modal";
import AddVenueForm from "../../../../forms/venue-management/AddVenueForm";
import { IoMdCloseCircle } from "react-icons/io";

interface Venue {
  id: string;
  venueName: string;
  locationType: string;
  maxAttendees: number;
}

interface VenueCardProps {
  venue: Venue;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const getLocationIcon = () => {
    switch (venue.locationType) {
      case "indoor":
        return <MdMeetingRoom className="text-blue-500" />;
      case "outdoor":
        return <FaMapMarkerAlt className="text-green-500" />;
      default:
        return <MdMeetingRoom className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {venue.venueName}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start text-gray-600 mb-4">
            <div className="flex items-center">
              <FaUsers className="mr-2 text-gray-400" />
              <span className="text-sm">Capacity</span>
            </div>
            <span className="font-medium text-sm mt-1 ml-6">
              {venue.maxAttendees} attendees
            </span>
          </div>

          <div className="flex flex-col items-start text-gray-600 mb-4">
            <div className="flex items-end gap-2">
              <p className="">{getLocationIcon()}</p>
              <span className="text-sm">Location Type</span>
            </div>
            <span className="font-medium text-sm mt-1 ml-6">
              {venue.locationType}
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => {
              onEdit(venue.id);
              setIsModalOpen(true);
            }}
            className="p-2 cursor-pointer text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit venue"
          >
            <FaEdit />
          </button>
          {/* <button
            onClick={() => onDelete(venue.id)}
            className="p-2 cursor-pointer text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete venue"
          >
            <FaTrash />
          </button> */}
        </div>
      </div>

      {isModalOpen && (
        <div>
          <Overlay />
          <Modal widthClassName="w-full sm:w-max" heightClassName="h-max">
            <div>
              <div className="flex items-center justify-between gap-2 border-b pb-2 mb-10">
                <div className="flex items-center gap-2">
                  <FaEdit />
                  <h1>Update Venue</h1>
                </div>
                <button
                  onClick={() => {
                    onEdit("");
                    setIsModalOpen(false);
                  }}
                >
                  <IoMdCloseCircle className="size-5 cursor-pointer" />
                </button>
              </div>
              <AddVenueForm
                venueId={venue?.id}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default VenueCard;
