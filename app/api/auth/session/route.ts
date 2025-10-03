// /app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, JwtPayload } from "@/lib/token";
import { runQuery } from "@/lib/db";
import { getTokensFromCookies } from "@/lib/cookies";

export async function GET(req: NextRequest) {
  try {
    // const token = await getTokensFromCookies();
    const token = getTokensFromCookies(req);

    if (!token) {
      return NextResponse.json(
        { user: null, message: "No access token found" },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
      // Token is invalid or expired.
      return NextResponse.json(
        { user: null, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const result = await runQuery<{
      user_id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      companyName: string;
      taxId: string;
    }>(
      `SELECT user_id, "firstName", "lastName", email, role, "companyName", "taxId" FROM users WHERE user_id = $1`,
      [payload.userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = result.rows[0];

    return NextResponse.json(
      {
        user: {
          userId: user.user_id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          companyName: user.companyName ?? "",
          taxId: user.taxId ?? "",
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("session route error:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
