"use server";
import axios from "axios";
import { getTokensFromCookies } from "@/lib/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServerAxios = async () => {
  const tokens = await getTokensFromCookies();
  const accessToken = tokens?.access?.token;

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return instance;
};
