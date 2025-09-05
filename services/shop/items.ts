"use server";

import { getNetSuiteAxios } from "../netsuiteAxios";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";

export const getAllNetSuiteItems = async (queryParams?: any) => {
  const axiosInstance = getNetSuiteAxios();

  try {
    const response = await axiosInstance.get("/record/v1/inventoryItem", {
      params: queryParams || {},
    });    

    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};


export const runSuiteQLQuery = async (
  query: string,
  options?: { limit?: number; offset?: number }
) => {

  const axiosInstance = getNetSuiteAxios();

  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;

  try {
    const response = await axiosInstance.post(
      `/query/v1/suiteql?limit=${limit}&offset=${offset}`,
      { q: query },
      {
        headers: {
          "Content-Type": "application/json",
          "Prefer": "transient",
        },
      }
    );

    // console.log('response.data ==== ', response.data);

    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};