// /app/api/auth/logout/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("access-token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  response.cookies.set("refresh-token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
