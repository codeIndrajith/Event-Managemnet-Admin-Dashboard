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

export interface GetVenueHistoryParams {
  axiosPrivate: any;
  pageNumber?: number;
  pageSize?: number;
  venueName?: string;
  locationType?: string;
  startDate?: string;
  endDate?: string;
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

export const GetVenueHistory = async ({
  axiosPrivate,
  pageNumber = 1,
  pageSize = 6,
  venueName,
  locationType,
  startDate,
  endDate,
}: GetVenueHistoryParams): Promise<any> => {
  try {
    const queryParams = new URLSearchParams();

    // Add pagination parameters
    queryParams.append("pageNumber", pageNumber.toString());
    queryParams.append("pageSize", pageSize.toString());

    // Add optional filter parameters
    if (venueName) {
      queryParams.append("venueName", venueName);
    }

    if (locationType) {
      queryParams.append("locationType", locationType);
    }

    if (startDate) {
      queryParams.append("startDate", startDate);
    }

    if (endDate) {
      queryParams.append("endDate", endDate);
    }

    const response = await axiosPrivate.get(
      `/admin/venues/history?${queryParams.toString()}`
    );

    return response.data;
  } catch (error: any) {
    let errMsg: string = "Error occurred during fetch venues history";

    if (error?.response?.data?.message) {
      errMsg = error.response.data.message;
    } else if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    } else if (error?.message) {
      errMsg = error.message;
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
