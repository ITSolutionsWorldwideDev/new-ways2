// /app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";
import { signResetToken } from "@/lib/token";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check user exists
    const result = await runQuery<{ user_id: number }>(
      `SELECT user_id FROM users WHERE email = $1`,
      [email]
    );
    if (result.rowCount === 0) {
      // Don’t reveal whether email exists or not — for security, still respond success
      return NextResponse.json({ success: true });
    }

    const user = result.rows[0];
    const resetToken = signResetToken({ userId: user.user_id, email });

    // Construct reset link
    const resetUrl = `${process.env.RESET_PASSWORD_URL}?token=${resetToken}`;

    // Send email
    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetUrl}">Click here to reset your password</a></p>
        <p>If you didn't request this, ignore this email.</p>
      `,
      text: `Reset your password: ${resetUrl}`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("forgot-password error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
