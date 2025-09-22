"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

/* export default function storeTokensInCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  response.cookies.set("access-token", accessToken, {
    httpOnly: true,
    maxAge: 3600,
    path: "/",
  });

  response.cookies.set("refresh-token", refreshToken, {
    httpOnly: true,
    maxAge: 604800,
    path: "/",
  });

  return response;
} */

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

// export default storeTokensInCookies;
