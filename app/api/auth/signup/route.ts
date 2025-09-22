// /app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/services/auth/signup";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result: any = await registerUser(body);

    if (result?.error) {
      return NextResponse.json(result, { status: result.statusCode || 400 });
    }

    const { user, tokens } = result;

    const response = NextResponse.json(
      {
        user,
        message: "User registered successfully",
      },
      { status: 201 }
    );

    // ✅ Set cookies here (not in service layer)
    /* response.cookies.set("access-token", tokens.access.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    }); */

    const isProd = process.env.NODE_ENV === "production";

    response.cookies.set("access-token", tokens.access.token, {
      httpOnly: true,
      secure: isProd, // false in dev (localhost), true in prod
      sameSite: isProd ? "strict" : "lax", // lax is more lenient in dev
      maxAge: 60 * 60,
      path: "/",
    });

    response.cookies.set("refresh-token", tokens.refresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Something went wrong",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
