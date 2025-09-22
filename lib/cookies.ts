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
/* const storeTokensInCookies = async (tokens: Token) => {
  const cookieStore = await cookies();

  cookieStore.set("access-token", JSON.stringify(tokens), {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}; */

export default function storeTokensInCookies(response: NextResponse, accessToken: string, refreshToken: string) {
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
}

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
