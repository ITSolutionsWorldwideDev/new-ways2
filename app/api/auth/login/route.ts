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
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const result = await runQuery<{ user_id: number; password_hash: string; firstName: string; lastName: string }>(
      `SELECT user_id, password_hash, "firstName", "lastName" FROM users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const payload: JwtPayload = {
      userId: user.user_id,
      email,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const response = NextResponse.json({
      user: {
        userId: user.user_id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
      },
    });

    // ✅ Set cookies *here*
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

    return response;

  } catch (error: any) {
    const handled = handleApiErrorWithoutException(error);
    return NextResponse.json(handled, { status: handled.statusCode || 500 });
  }
}


/* import { NextRequest, NextResponse } from "next/server";
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
    }>(
      `SELECT user_id, password_hash, "firstName", "lastName" FROM users WHERE email = $1`,
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

    // Debug log
    // console.log("Login: setting tokens. accessToken:", accessToken);

    const response = NextResponse.json(
      {
        user: {
          userId: user.user_id,
          firstName: user.firstName,
          lastName: user.lastName,
          email,
        },
      },
      { status: 200 }
    );

    const isProd = process.env.NODE_ENV === "production";

    response.cookies.set("access-token", accessToken, {
      httpOnly: true,
      secure: isProd, // false in dev (localhost), true in prod
      sameSite: isProd ? "strict" : "lax", // lax is more lenient in dev
      maxAge: 60 * 60,
      path: "/",
    });

    console.log("Login: Set-Cookie access-token:", accessToken);

    response.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    console.log("Login: Set-Cookie refresh-token:", refreshToken);

    return response;
  } catch (error: any) {
    const handled = handleApiErrorWithoutException(error);
    return NextResponse.json(handled, { status: handled.statusCode || 500 });
  }
} */

/* import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";
import bcrypt from "bcrypt";
import storeTokensInCookies from "@/lib/cookies";
import { signAccessToken, signRefreshToken, JwtPayload } from "@/lib/token";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // Fetch user from DB
    const result = await runQuery<{ user_id: number; password_hash: string; firstName: string; lastName: string }>(
      `SELECT user_id, password_hash, "firstName", "lastName" FROM users WHERE email = $1`,
      [email]
    );

    

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Prepare JWT payload
    const payload: JwtPayload = {
      userId: user.user_id,
      email: email
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // store cookies
    await storeTokensInCookies({ 
      access: { token: accessToken, expires: new Date(Date.now() + 60 * 60 * 1000).toISOString() },
      refresh: { token: refreshToken, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }
    });

    // Return user details (not password)
    return NextResponse.json({
      user: {
        userId: user.user_id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: email
      }
    }, { status: 200 });

  } catch (error: any) {
    const handled = handleApiErrorWithoutException(error);
    return NextResponse.json(handled, { status: handled.statusCode || 500 });
  }
} */
