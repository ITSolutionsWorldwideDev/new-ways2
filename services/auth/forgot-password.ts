"use server";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";
import axios from "axios";
import { getServerAxios } from "../axiosInstance";

export type ForgotPasswordPayload = {
  email: string;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const axiosInstance = await getServerAxios();
  try {
    const response = await axiosInstance.post(`/auth/forgot-password`, payload);
    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};
