import type { AxiosInstance } from "axios";
import type { SignInSchemaType } from "../../schema/auth/signInSchema";

interface SignInParams {
  formData: SignInSchemaType;
  axiosPrivate: AxiosInstance;
}

interface AuthUserParams {
  axiosPrivate: AxiosInstance;
}

export interface UniqueResponseFormat<T = any> {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  error?: string;
  token?: string;
}

export const SignIn = async ({
  formData,
  axiosPrivate,
}: SignInParams): Promise<UniqueResponseFormat> => {
  try {
    const data = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    const response = await axiosPrivate.post(
      "/auth/signin",
      JSON.stringify(data)
    );
    return {
      success: response.data.success,
      statusCode: response.data.statusCode,
      token: response.data.token,
    };
  } catch (error: any) {
    let errMsg: string = "";
    if (error?.response?.data?.error) {
      errMsg = error?.response?.data?.error;
    } else if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};

// Get Auth use credentials
export const AuthUser = async ({
  axiosPrivate,
}: AuthUserParams): Promise<UniqueResponseFormat> => {
  try {
    const response = await axiosPrivate.get("/auth/profile");
    return response.data;
  } catch (error: any) {
    let errMsg: string = "Not Autherized";
    if (error?.response?.data?.message) {
      errMsg = error.response.data.message;
    } else if (error?.message === "Network Error") {
      errMsg = "Service Unavailable";
    }
    throw new Error(errMsg);
  }
};
