// /app/api/account-details/route.ts (GET)

import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const result = await runQuery(
    `SELECT u.*, b.billingFirstName, b.billingLastName, b.billingAddress, b.billingPhone,b.billingCity,b.billingZip,b.billingEmail,b.country as billingCountry
   FROM users u 
   LEFT JOIN billing_addresses b ON u.user_id = b.user_id 
   WHERE u.user_id = $1 LIMIT 1`,
    [userId]
  );

  const data: any = {};
  data.account = result.rows;
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const {
    userId,
    firstName,
    lastName,
    addrPhone,
    addr1,
    city,
    zip,
    country,
    billingFirstName,
    billingLastName,
    billingPhone,
    billingEmail,
    billingAddress,
    billingCity,
    billingZip,
    billingCountry,
  } = body;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  await runQuery(
    `UPDATE users SET 
      "firstName" = $1,
      "lastName" = $2,
      "addrPhone" = $3,
      addr1 = $4,
      city = $5,
      zip = $6,
      country = $7,
      updated_at = NOW()
     WHERE user_id = $8`,
    [firstName, lastName, addrPhone, addr1, city, zip, country, userId]
  );

  // 2. Upsert billing address
  // Assuming user_id is UNIQUE in billing_addresses
  await runQuery(
    `INSERT INTO billing_addresses (
        user_id, "billingfirstname", "billinglastname", billingaddress, billingcity, billingzip, country, billingphone, billingemail, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET
        billingfirstname = EXCLUDED.billingfirstname,
        billinglastname = EXCLUDED.billinglastname,
        billingaddress = EXCLUDED.billingaddress,
        billingcity = EXCLUDED.billingcity,
        billingzip = EXCLUDED.billingzip,
        country = EXCLUDED.country,
        billingphone = EXCLUDED.billingphone,
        billingemail = EXCLUDED.billingemail,
        updated_at = NOW();`,
    [
      userId,
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingZip,
      billingCountry,
      billingPhone,
      billingEmail,
    ]
  );

  return NextResponse.json({ success: true });
}
