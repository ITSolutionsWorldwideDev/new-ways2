"use server";

import { cookies } from "next/headers";

interface Token {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}
const storeTokensInCookies = async (tokens: Token) => {
  const cookieStore = await cookies();

  cookieStore.set("access-token", JSON.stringify(tokens), {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeTokensFromCookies = async () => {
  (await cookies()).delete("access-token");
};

export const getTokensFromCookies = async () => {
  const cookieStore = await cookies();

  const authAccessToken = cookieStore.get("access-token");

  if (authAccessToken) {
    return JSON.parse(authAccessToken?.value || "");
  }

  return null;
};

export default storeTokensInCookies;
