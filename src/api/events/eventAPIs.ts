import type { AxiosInstance } from "axios";
import type { UniqueResponseFormat } from "../auth/authAPIs";

interface GetPendingApprovalEventsParams {
  axiosPrivate: AxiosInstance;
}

export interface EventResponse {
  id: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventName?: string;
  eventDescription?: string;
  bannerImage?: string;
  senderName?: string;
  senderRole?: string;
  senderOrganization?: string;
  letterLink?: string;
  isApproved?: boolean;
  isPublished?: boolean;
  note?: string;
  eventType?: string;
  approvedLetterLink?: string;
}

export const GetPendingApprovalEvents = async ({
  axiosPrivate,
}: GetPendingApprovalEventsParams): Promise<UniqueResponseFormat> => {
  try {
    const response = await axiosPrivate.get(`/admin/pending-approval-event/`);
    return response.data;
  } catch (error: any) {
    let errMsg: string = "Error occured during fetching event";
    if (error?.response?.data?.message) {
      errMsg = error.response.data.message;
    } else if (error?.message === "Networ Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
