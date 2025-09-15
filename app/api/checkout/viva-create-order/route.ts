import { NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customerEmail } = body;

    // 1. Get access token
    const authString = Buffer.from(
      `${process.env.VIVA_SMART_CLIENT_ID}:${process.env.VIVA_SMART_CLIENT_SECRET}`
    ).toString("base64");

    const tokenRes = await fetch(
      "https://demo-accounts.vivapayments.com/connect/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "client_credentials" }),
      }
    );

    const { access_token } = await tokenRes.json();

    console.log("access_token === ", access_token);

    // 2. Create order
    const orderRes = await fetch(
      "https://demo-api.vivapayments.com/checkout/v2/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount, // in cents (1999 = 19.99 EUR)
          customerTrns: "Order Payment",
          customer: { email: customerEmail },
          sourceCode: process.env.VIVA_SOURCE_CODE,
          merchantTrns: "MyShop Order #1234",
          successUrl: `${process.env.DOMAIN_URL}/checkout/success`,
          failureUrl:  `${process.env.DOMAIN_URL}/checkout/fail`,
        }),
      }
    );

    const orderData = await orderRes.json();
    return NextResponse.json(orderData, { status: 200 });
  } catch (err: any) {
    console.error("Viva create order error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
