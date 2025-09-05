"use server";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";
import { getServerAxios } from "../axiosInstance";

export type ResetPasswordPayload = {
  userId: string;
  password: string;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const axiosInstance = await getServerAxios();
  try {
    const response = await axiosInstance.post(`/auth/reset-password`, payload);
    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};
