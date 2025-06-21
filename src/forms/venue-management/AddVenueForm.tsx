import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  venueSchema,
  type VenuSchemaType,
} from "../../schema/venue-management/addvenueSchema";
import HIMSTextField from "../../dashboard/components/HIMSTextField";
import { FaLocationDot } from "react-icons/fa6";
import HIMSSelectField from "../../dashboard/components/HIMSSelectField";
import { FaLocationArrow } from "react-icons/fa";
import { ImSpinner5, ImUserPlus } from "react-icons/im";
import HIMSNumberField from "../../dashboard/components/HIMSNumberField";
import toast from "react-hot-toast";
import { AddVenues } from "../../api/venue-management/venueAPIs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

const AddVenueForm: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VenuSchemaType>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      venueName: "",
      locationType: undefined,
      maxAttendees: undefined,
    },
  });

  const locationType = [
    { id: 1, type: "indoor" },
    { id: 2, type: "outdoor" },
  ];

  const onSubmit = (data: VenuSchemaType) => {
    addVenue(data);
  };
  const { mutateAsync: addVenue } = useMutation({
    mutationFn: (data: VenuSchemaType) =>
      AddVenues({ formData: data, axiosPrivate }),
    onSuccess: () => {
      reset();
      toast.success("Event Add Complete", {
        position: "top-right",
        className: "text-xs",
      });
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Error occurred during Add Venue", {
        position: "top-right",
        className: "text-xs",
      });
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <HIMSTextField
            Icon={FaLocationDot}
            displayLabel="Venue Name"
            placeholderText="Add Venue Name"
            isRequired
            {...register("venueName")}
            error={errors.venueName?.message?.toString()}
          />
        </div>

        <div>
          <HIMSSelectField
            Icon={FaLocationArrow}
            displayLabel="Location Type"
            defaultOptionText="Select Location Type"
            options={locationType}
            optionKey="id"
            optionValue="type"
            isRequired
            optionDisplayText="type"
            isDefaultOptionRequired={true}
            {...register("locationType")}
            error={errors.locationType?.message?.toString()}
          />
        </div>

        <div>
          <HIMSNumberField
            Icon={ImUserPlus}
            displayLabel="Max Attendees"
            placeholderText="Enter Max Attendees"
            isRequired
            min={0}
            {...register("maxAttendees", {
              setValueAs: (value: string) => (value ? Number(value) : 0),
            })}
            error={errors.maxAttendees?.message?.toString()}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 w-full">
        <button
          type="button"
          onClick={() => reset()}
          className="sm:py-2 sm:px-10 p-2 w-full sm:w-auto text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="sm:py-2 sm:px-4 p-2 w-full sm:w-auto text-sm bg-primary rounded-md text-white cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2 justify-center">
              <ImSpinner5 /> <span>Processing...</span>
            </div>
          ) : (
            "Add Venue"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddVenueForm;
