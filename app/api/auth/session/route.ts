// /app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken, JwtPayload } from "@/lib/token";
import { runQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies(); // must await
    console.log("Session route: cookiesStore all:", cookieStore.getAll()); // log all cookies

    const accessCookie = cookieStore.get("access-token");
    console.log("Session route: accessCookie:", accessCookie);

    if (!accessCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const token = accessCookie?.value;
    console.log("Session: token value:", token); // debug
    const payload = verifyAccessToken(token);

    if (!payload) {
      console.log("Session: token invalid or expired"); // debug
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const result = await runQuery<{
      user_id: number;
      firstName: string;
      lastName: string;
      email: string;
    }>(
      `SELECT user_id, "firstName", "lastName", email FROM users WHERE user_id = $1`,
      [payload.userId]
    );
    console.log("Session route: DB result:", result.rows);

    if (result.rowCount === 0) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = result.rows[0];
    console.log("Session: user from DB:", user); // debug

    return NextResponse.json(
      {
        user: {
          userId: user.user_id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("session route error:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
