"use server";
import storeTokensInCookies from "@/lib/cookies";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";
import { getServerAxios } from "@/services/axiosInstance";

export type RegisterPayloadType = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export const registerUser = async (data: RegisterPayloadType) => {
  try {
    const axiosInstance = await getServerAxios();
    const response = await axiosInstance.post("/auth/register", data);

    await storeTokensInCookies(response.data.tokens);

    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};
