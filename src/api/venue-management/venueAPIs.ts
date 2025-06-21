import type { AxiosInstance } from "axios";
import type { VenuSchemaType } from "../../schema/venue-management/addvenueSchema";

interface AddVenuesParams {
  formData: VenuSchemaType;
  axiosPrivate: AxiosInstance;
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
    } else if (error?.message === "Error occurred add venues") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
