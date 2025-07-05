import React, { useState } from "react";
import HIMSTextField from "../../dashboard/components/HIMSTextField";
import HIMSEmailField from "../../dashboard/components/HimsEmailField";
import { FiCheck, FiLoader, FiUpload } from "react-icons/fi";
import { ImSpinner6 } from "react-icons/im";
import { useForm } from "react-hook-form";
import type { UserProfileUpdateType } from "../../schema/auth/updateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import UserProfileUpdate from "../../schema/auth/updateUserSchema";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/reactReduxTypedHooks";
import { logout, selectAuthSliceUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { uploadFileToFirebase } from "../../uitls/fileUpload";
import { UpdateProfile } from "../../api/auth/authAPIs";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

interface UserUpdateFormProps {
  setOpenProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({
  setOpenProfileModal,
}) => {
  const [issSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const authUser = useAppSelector(selectAuthSliceUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    trigger,
  } = useForm<UserProfileUpdateType>({
    resolver: zodResolver(UserProfileUpdate),
    mode: "onChange",
    defaultValues: {
      name: authUser?.name,
      email: authUser?.email,
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setValue("profileImage", "", { shouldValidate: true });
      trigger("profileImage");
      return;
    }

    try {
      setIsUploading(true);
      setSelectedFile(file);
      const fileUrl = await uploadFileToFirebase(file, "profile-images");
      setValue("profileImage", fileUrl, { shouldValidate: true });
      trigger("profileImage");
    } catch (error) {
      console.error("Upload error", error);
      setValue("profileImage", "", { shouldValidate: true });
      trigger("profileImage");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: UserProfileUpdateType) => {
    setIsSubmitting(true);
    try {
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "")
      );
      const userProfileUpdateMsg = await UpdateProfile({
        formData: cleanedData,
        axiosPrivate,
      });

      if (userProfileUpdateMsg) {
        toast.success("Profile Update Success", {
          position: "top-right",
          className: "text-xs",
        });
      }

      dispatch(logout());
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message ?? "Error occurred profile update", {
        position: "top-right",
        className: "text-xs",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <HIMSTextField
          Icon={FaUser}
          displayLabel="Username"
          classNames="text-xs"
          placeholderText="Enter your name"
          {...register("name")}
          error={errors?.name?.message?.toString()}
        />
      </div>

      <div>
        <HIMSEmailField
          displayLabel="Email"
          classNames="text-xs"
          placeholderText="Enter your email"
          {...register("email")}
          error={errors?.email?.message?.toString()}
        />
      </div>

      <div className="mt-4">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Profile Image
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
                  <span>Upload a Image</span>
                  <input
                    id="file-upload"
                    name="file"
                    type="file"
                    accept="image/"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF up to 10MB</p>
            </div>
          </div>

          {isUploading ? (
            <p className="mt-2 text-sm text-indigo-600 flex items-center">
              <FiLoader className="animate-spin mr-2" />
              Uploading image...
            </p>
          ) : selectedFile ? (
            <p className="mt-2 text-sm text-green-600 flex items-center">
              <FiCheck className="mr-1" /> {selectedFile.name}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
          onClick={() => {
            if (isUploading) return;
            reset({
              name: authUser?.name,
              email: authUser?.email,
            });
            setOpenProfileModal(false);
            setSelectedFile(null);
          }}
          disabled={isUploading}
        >
          Cancel
        </button>
        {issSubmitting ? (
          <button
            type="submit"
            className="px-4 py-2 flex items-center gap-2 cursor-pointer text-sm font-medium text-white bg-primary rounded-md transition-colors duration-200"
            disabled={isUploading}
          >
            <ImSpinner6 className="animate-spin" /> Please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-primary rounded-md transition-colors duration-200"
            disabled={isUploading}
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default UserUpdateForm;
