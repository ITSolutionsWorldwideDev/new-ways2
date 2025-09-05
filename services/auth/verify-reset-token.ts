"use server";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";

import { getServerAxios } from "../axiosInstance";

export const verifyResetToken = async (token: string) => {
  const axiosInstance = await getServerAxios();
  try {
    const response = await axiosInstance.get(
      `/auth/verify-reset-token?token=${token}`
    );
    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};
