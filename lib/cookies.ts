// lib\cookies.ts

import { NextRequest, NextResponse } from "next/server";

export default async function storeTokensInCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string
) {
  const isProd = process.env.NODE_ENV === "production";

  response.cookies.set("access-token", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });

  response.cookies.set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  console.log("storeTokensInCookies  accesstoken2 ===", response.cookies);
  return response;
}

export const removeTokensFromCookies = (response: NextResponse) => {
  response.cookies.delete("access-token");
  response.cookies.delete("refresh-token");

  return response;
};

export const getTokensFromCookies = (req: NextRequest) => {
  const accessToken = req.cookies.get("access-token")?.value || null;
  return accessToken;
};
