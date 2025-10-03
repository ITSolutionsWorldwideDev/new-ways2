// services\auth\signup.ts

"use server";

import { runQuery } from "@/lib/db";
// import storeTokensInCookies from "@/lib/cookies";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type RegisterPayloadType = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: "customer" | "b2b";
  companyName?: string;
  taxId?: string;
  city?: string;
  zip?: string;
  country?: string;
};

// const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your_access_secret";
// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets are not set in environment variables.");
}

export const registerUser = async (data: RegisterPayloadType) => {
  try {
    const {
      firstName,
      lastName = "",
      email,
      password,
      phoneNumber,
      role = "customer",
      companyName = "",
      taxId = "",
      city = "",
      zip = "",
      country = "",
    } = data;

    // Check if user already exists
    const existingUser: any = await runQuery(
      `SELECT user_id FROM users WHERE email = $1`,
      [email]
    );

    if (existingUser && existingUser.rowCount > 0) {
      return {
        error: "Email already exists",
        message: "A user with this email already exists",
        statusCode: 400,
      };
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const username = email.split('@')[0];

    // Insert new user

    const result = await runQuery(
      `INSERT INTO users 
        ("firstName", "lastName", "email", "username", "password_hash", "addrPhone", "role",
         "companyName", "taxId", "city", "zip", "country", "created_at")
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7,
         $8, $9, $10, $11, $12, NOW())
       RETURNING user_id, "firstName", "lastName", "email", "username", "role", 
                 "companyName", "taxId", "city", "zip", "country"`,
      [
        firstName,
        lastName,
        email,
        username,
        hashedPassword,
        phoneNumber,
        role,
        role === "b2b" ? companyName : null,
        role === "b2b" ? taxId : null,
        role === "b2b" ? city : null,
        role === "b2b" ? zip : null,
        role === "b2b" ? country : null,
      ]
    );

    const user = result.rows[0];

    console.log('user === ',user);

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Return user and tokens (cookies will be handled in the route)
    return {
      user,
      tokens: {
        access: {
          token: accessToken,
          expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        },
        refresh: {
          token: refreshToken,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        },
      },
      message: "User registered successfully",
    };
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};



    /* const tokens = {
      access: {
        token: accessToken,
        expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      },
      refresh: {
        token: refreshToken,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      },
    };

    // Store tokens in cookies
    await storeTokensInCookies(tokens);

    return {
      user,
      tokens,
      message: "User registered successfully",
    }; */
/* // services\auth\signup.ts
"use server";
import storeTokensInCookies from "@/lib/cookies";
import { handleApiErrorWithoutException } from "@/lib/errorHandler";
import { getServerAxios } from "@/services/axiosInstance";

export type RegisterPayloadType = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export const registerUser = async (data: RegisterPayloadType) => {
  try {
    const axiosInstance = await getServerAxios();
    const response = await axiosInstance.post("/auth/register", data);

    await storeTokensInCookies(response.data.tokens);

    return response.data;
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};
 */