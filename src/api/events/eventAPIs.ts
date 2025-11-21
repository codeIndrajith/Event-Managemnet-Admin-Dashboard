import type { AxiosInstance } from "axios";
import type { UniqueResponseFormat } from "../auth/authAPIs";
import type { EventApproveOrRejectSchemaType } from "../../schema/events/eventSchema";

interface GetPendingApprovalEventsParams {
  axiosPrivate: AxiosInstance;
  limit?: number;
}

interface ApprveOrRejectEventParams {
  formData: EventApproveOrRejectSchemaType;
  isApprove: boolean;
  eventId: string;
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
  reason?: string;
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
  limit,
}: GetPendingApprovalEventsParams): Promise<UniqueResponseFormat> => {
  try {
    const queryParams = new URLSearchParams();
    if (limit) {
      queryParams.append("limit", limit.toString());
    }
    const response = await axiosPrivate.get(
      `/admin/pending-approval-event/?${queryParams.toString()}`
    );
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

export const EventCalendar = async (
  axiosPrivate: AxiosInstance
): Promise<UniqueResponseFormat> => {
  try {
    const response = await axiosPrivate.get(`/events/event-dates`);
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

export const ApprveOrRejectEvent = async ({
  formData,
  eventId,
  isApprove,
  axiosPrivate,
}: ApprveOrRejectEventParams): Promise<UniqueResponseFormat> => {
  try {
    let data: any;
    if (isApprove === true) {
      data = {
        eventId: eventId,
        approverName: formData?.approverName,
        approvedLetterLink: formData?.file,
        approverRole: formData?.approverRole,
        isApproved: isApprove,
      };
    }
    if (isApprove === false) {
      data = {
        eventId: eventId,
        approverName: formData?.approverName,
        approverRole: formData?.approverRole,
        isApproved: isApprove,
        reason: formData?.reason,
      };
    }
    const response = await axiosPrivate.put(
      `/admin/event/approve`,
      JSON.stringify(data)
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.error);
  }
};
