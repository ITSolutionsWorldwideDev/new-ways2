// /app/api/auth/reset-password/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken } from "@/lib/token";
import { runQuery } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
    }

    const payload = verifyResetToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // Update in database
    await runQuery(
      `UPDATE users SET password_hash = $1 WHERE user_id = $2`,
      [hash, payload.userId]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("reset-password error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
