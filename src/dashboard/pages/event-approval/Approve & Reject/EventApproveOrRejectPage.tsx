import React, { useEffect, useState } from "react";
import {
  FiUpload,
  FiUser,
  FiAward,
  FiEdit2,
  FiCheck,
  FiX,
  FiEdit,
} from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import HIMSTextField from "../../../components/HIMSTextField";
import { FaUser } from "react-icons/fa";
import HIMSTextareaField from "../../../components/HIMSTextareaField";
import { IoMdCloseCircle } from "react-icons/io";
import Banner from "../../../components/Banner";
import approvalImage from "../../../../assets/approval-image.png";
import { useLocation } from "react-router-dom";
import {
  EventApproveOrRejectSchema,
  type EventApproveOrRejectSchemaType,
} from "../../../../schema/events/eventSchema";

const EventApproveOrRejectPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isApprove = queryParams.get("isApprove") === "true";
  const schema = EventApproveOrRejectSchema(isApprove);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventApproveOrRejectSchemaType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    register("file", { required: isApprove });
  }, [register, isApprove]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file instanceof File) {
      setSelectedFile(file);
      setValue("file", file, { shouldValidate: true });
    }
  };

  const onSubmit = (data: EventApproveOrRejectSchemaType) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="">
        <div className="text-start mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Event Approval
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Review and approve or reject the event submission
          </p>
        </div>

        <div className="mb-4">
          <Banner
            imageSrc={approvalImage}
            imageAlt="Approval_image"
            title="Event Review"
            description="Review, approve or reject submitted events with supporting documentation"
            className="w-[250px]"
          />
        </div>

        <div className="bg-white shadow-lg rounded-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* File Upload */}
              {isApprove === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Approve Document (PDF only)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center text-gray-400">
                        <FiUpload className="h-12 w-12" />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".pdf"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-green-600 flex items-center">
                      <FiCheck className="mr-1" /> {selectedFile.name}
                    </p>
                  )}
                  {errors.file && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.file.message?.toString()}
                    </p>
                  )}
                </div>
              )}

              {/* Approver details */}
              <div className="mb-6 flex flex-col md:flex-row items-center gap-2 w-full">
                <HIMSTextField
                  Icon={FaUser}
                  displayLabel="Approver Name"
                  isRequired
                  placeholderText="Enter Approver Name"
                  classNames="text-sm w-full"
                  {...register("approverName")}
                  error={errors?.approverName?.message?.toString()}
                />
                <HIMSTextField
                  Icon={FiAward}
                  displayLabel="Approver Role"
                  isRequired
                  placeholderText="Enter Approver Role"
                  classNames="text-sm w-full"
                  {...register("approverRole")}
                  error={errors?.approverRole?.message?.toString()}
                />
              </div>

              {/* Reason */}
              {isApprove === false && (
                <div className="mb-8">
                  <HIMSTextareaField
                    Icon={FiEdit}
                    displayLabel="Reject Reason"
                    isRequired
                    placeholderText="Enter the reason for reject"
                    {...register("reason")}
                    error={errors?.reason?.message?.toString()}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
                {isApprove === true ? (
                  <div className="flex-1">
                    <button
                      type="submit"
                      className="flex cursor-pointer items-center w-max p-2 text-white text-sm bg-green-500 rounded-md"
                    >
                      <FiCheck className="mr-2" />
                      Approve Event
                    </button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <button
                      type="submit"
                      className="flex cursor-pointer items-center w-max p-2 text-white bg-red-500 rounded-md text-sm"
                    >
                      <IoMdCloseCircle className="mr-2" />
                      Reject Event
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventApproveOrRejectPage;
