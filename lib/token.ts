// /lib/token.ts

import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;
const RESET_TOKEN_SECRET = process.env.JWT_RESET_SECRET! as string;

const RESET_EXPIRES_IN = process.env.JWT_RESET_EXPIRES_IN! || "1h";

// const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
// const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not defined. Check your .env file.");
}

// Type of payload you put in JWT
export interface JwtPayload {
  userId: number;
  email: string;
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    if (!token || token === "undefined") {
      throw new Error("Empty or undefined token");
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return decoded as JwtPayload;
  } catch (err) {
    console.error("verifyAccessToken error:", err);
    return null;
  }
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return decoded as JwtPayload;
  } catch (err) {
    console.error("verifyRefreshToken error:", err);
    return null;
  }
}

export function signResetToken(payload: JwtPayload): string {
  return jwt.sign(payload, RESET_TOKEN_SECRET, { expiresIn: "1h" });
}

export function verifyResetToken(token: string) {
  try {
    const decoded = jwt.verify(token, RESET_EXPIRES_IN);
    return decoded as { userId: number; email: string };
  } catch (err) {
    console.error("Invalid reset token:", err);
    return null;
  }
}
