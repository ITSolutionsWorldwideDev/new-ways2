// /lib/token.ts

import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;

// Type of payload you put in JWT
export interface JwtPayload {
  userId: number;
  email: string;
  // add more if needed
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

    

console.log('ACCESS_TOKEN_SECRET === ',ACCESS_TOKEN_SECRET);
console.log('REFRESH_TOKEN_SECRET === ',REFRESH_TOKEN_SECRET);

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
