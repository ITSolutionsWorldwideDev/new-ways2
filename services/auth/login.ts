"use server";
import storeTokensInCookies from "@/lib/cookies";
import { getServerAxios } from "../axiosInstance";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";

type loginProps = {
  email: string;
  password: string;
};

export const login = async (data: loginProps) => {
  const axiosInstance = await getServerAxios();
  try {
    const response = await axiosInstance.post(`/auth/login`, data);
    await storeTokensInCookies(response.data.tokens);

    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};
