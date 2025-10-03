// /app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken, JwtPayload } from "@/lib/token";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const result = await runQuery<{
      user_id: number;
      password_hash: string;
      firstName: string;
      lastName: string;
      role: string;
      companyName: string;
      taxId: string;
    }>(
      `SELECT user_id, password_hash, "firstName", "lastName", role, "companyName", "taxId" FROM users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const payload: JwtPayload = {
      userId: user.user_id,
      email,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const response = NextResponse.json({
      user: {
        userId: user.user_id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        role: user.role,
        companyName: user.companyName ?? "",
        taxId: user.taxId ?? "",
      },
    });

    // Set secure HttpOnly cookies
    const isProd = process.env.NODE_ENV === "production";
    const commonCookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax" as "strict" | "lax",
      path: "/",
    };

    response.cookies.set("access-token", accessToken, {
      ...commonCookieOptions,
      maxAge: 60 * 60, // 1 hour
    });

    response.cookies.set("refresh-token", refreshToken, {
      ...commonCookieOptions,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    const handled = handleApiErrorWithoutException(error);
    return NextResponse.json(handled, { status: handled.statusCode || 500 });
  }
}
