import type { AxiosInstance } from "axios";
import type { UniqueResponseFormat } from "../auth/authAPIs";

interface GetAdminDashboardDataCountsParams {
  axiosPrivate: AxiosInstance;
}

export const GetAdminDashboardDataCounts = async ({
  axiosPrivate,
}: GetAdminDashboardDataCountsParams): Promise<UniqueResponseFormat> => {
  try {
    const response = await axiosPrivate.get(`/admin/dashboard-data`);
    return response.data;
  } catch (error: any) {
    let errMsg: string =
      "Error occured during fetch admin dashboard data count";
    if (error?.response?.data?.message) {
      errMsg = error.response.data.message;
    } else if (error?.message === "Networ Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
