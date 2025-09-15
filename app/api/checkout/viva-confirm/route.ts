import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.VIVA_SMART_CLIENT_ID}:${process.env.VIVA_SMART_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(
    "https://demo-accounts.vivapayments.com/connect/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Failed to fetch access token: " + errorText);
  }

  return res.json(); // returns { access_token, expires_in, token_type }
}

export async function POST(req: NextRequest) {
  const { transaction_id } = await req.json();

  const { access_token } = await getAccessToken();

  console.log("access_token viva confirm ==== ", access_token);

  try {
    const res = await fetch(
    //   `https://demo-api.vivapayments.com/api/orders/${orderCode}`,
      `https://demo-api.vivapayments.com/checkout/v2/transactions/${transaction_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text(); // in case the response is HTML or empty
      console.error("❌ Viva response not OK:", res.status, text);
      return NextResponse.json(
        { error: "Failed to verify order with Viva" },
        { status: 500 }
      );
    }

    let data;

    data = await res.json();

    console.log("data.status ==== ", res.json());

    if (data.status === "F") {
      // F = Finished, P = Pending, A = Abandoned
      const pendingOrder = JSON.parse(
        localStorage.getItem("pendingOrder") || "{}"
      );

      if (!pendingOrder) {
        return NextResponse.json(
          { error: "No pending order found" },
          { status: 400 }
        );
      }

      const { customerId, items, total } = pendingOrder;

      // Save order to database
      const orderInsert = await runQuery(
        `
        INSERT INTO orders (user_id, total_amount, status, payment_reference, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING id;
      `,
        [customerId, total, "completed", transaction_id]
      );

      const orderId = orderInsert.rows[0].id;

      for (const item of items) {
        await runQuery(
          `
          INSERT INTO order_items (order_id, product_id, quantity, price, added_at)
          VALUES ($1, $2, $3, $4, NOW());
        `,
          [orderId, item.itemid, item.quantity, item.price]
        );
      }

      return NextResponse.json({ success: true, orderId });
    } else {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("Payment confirm error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
