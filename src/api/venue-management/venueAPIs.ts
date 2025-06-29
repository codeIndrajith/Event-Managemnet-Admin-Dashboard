import type { AxiosInstance } from "axios";
import type { VenuSchemaType } from "../../schema/venue-management/addvenueSchema";
import type { UniqueResponseFormat } from "../auth/authAPIs";

interface AddVenuesParams {
  formData: VenuSchemaType;
  axiosPrivate: AxiosInstance;
}

interface GetAllVenuesParams {
  venueId?: string;
  pageNumber?: number;
  axiosPrivate: AxiosInstance;
}

interface UpdateVenuesParams {
  formData: VenuSchemaType;
  axiosPrivate: AxiosInstance;
  venueId: string;
}

export const AddVenues = async ({
  formData,
  axiosPrivate,
}: AddVenuesParams): Promise<any> => {
  try {
    const data = {
      venueName: formData?.venueName,
      locationType: formData?.locationType,
      maxAttendees: formData?.maxAttendees,
    };
    const response = await axiosPrivate.post(
      "/admin/create-venu",
      JSON.stringify(data)
    );
    return response.data;
  } catch (error: any) {
    let errMsg: string = "Not Autherized";
    if (error?.response?.data?.message) {
      errMsg = error.response.data.message;
    } else if (error?.message === "Networ Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};

export const GetAllVenues = async ({
  venueId,
  pageNumber,
  axiosPrivate,
}: GetAllVenuesParams): Promise<UniqueResponseFormat> => {
  try {
    const queryParams = new URLSearchParams();
    if (venueId) {
      queryParams.append("venueId", venueId.toString());
    }
    const response = await axiosPrivate.get(
      `/admin/venues?${queryParams.toString()}&pageNumber=${pageNumber}&pageSize=${6}`
    );
    return response.data;
  } catch (error: any) {
    let errMsg: string = "Error occured during fetch venues";
    if (error?.response?.data?.message) {
      errMsg = error.response.data.message;
    } else if (error?.message === "Networ Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};

export const UpdateVenue = async ({
  formData,
  venueId,
  axiosPrivate,
}: UpdateVenuesParams): Promise<any> => {
  try {
    const data = {
      venueName: formData?.venueName,
      locationType: formData?.locationType,
      maxAttendees: formData?.maxAttendees,
    };
    const response = await axiosPrivate.put(
      `/admin/update-venue/${venueId}`,
      JSON.stringify(data)
    );
    return response.data;
  } catch (error: any) {
    let errMsg: string = "Error occured during update venue";
    if (error?.response?.data?.message) {
      errMsg = error.response.data.message;
    } else if (error?.message === "Networ Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
