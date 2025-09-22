// /services/auth/login.ts

"use server";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";

export interface LoginPayload {
  email: string;
  password: string;
}

type LoginSuccess = {
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
};

type LoginFailure = {
  error: string;
};

export type LoginResponse = LoginSuccess | LoginFailure;

// export const loginUser = async (data: LoginPayload) => {
export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // make sure to set this in your env

    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",  // <-- Add this
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json();
      return { error: json.error || "Login failed" };
    }

    const json = await res.json();
    return { user: json.user };
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};



/* "use server";
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
 */