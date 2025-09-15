// app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    country,
    zip,
    cartItems, // [{ itemid, title, price, quantity }]
  } = body;

  try {
    // 1️⃣ Check if user exists
    const checkUserQuery = `SELECT id FROM users WHERE email = $1 LIMIT 1`;
    const userResult = await runQuery(checkUserQuery, [email]);

    let userId: number;

    if (userResult.rows.length > 0) {
      userId = userResult.rows[0].id;
    } else {
      // 2️⃣ Insert new user
      const insertUserQuery = `
        INSERT INTO users (firstName, lastName, email, addrPhone, addr1, city, country, zip, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING id;
      `;

      const insertUserResult = await runQuery(insertUserQuery, [
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        country,
        zip,
      ]);

      userId = insertUserResult.rows[0].id;
    }

    // 3️⃣ Save cart items into cart_items table
    for (const item of cartItems) {
      const { itemid, quantity, price } = item;

      // Add or update as needed — here we just insert with assumption it's a fresh checkout
      const insertCartItemQuery = `
        INSERT INTO cart_items (user_id, product_id, quantity, price, added_at)
        VALUES ($1, $2, $3, $4, NOW());
      `;
      await runQuery(insertCartItemQuery, [userId, itemid, quantity, price]);
    }

    return NextResponse.json({ success: true, userId }, { status: 200 });
  } catch (error: any) {
    console.error("Checkout error:", error.message);
    return NextResponse.json(
      { error: "Failed to process checkout", details: error.message },
      { status: 500 }
    );
  }
}
