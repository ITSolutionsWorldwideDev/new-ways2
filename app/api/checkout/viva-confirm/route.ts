import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { orderCode } = await req.json();

  try {
    const res = await fetch(
      `https://demo-api.vivapayments.com/api/orders/${orderCode}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.VIVA_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

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
        [customerId, total, "completed", orderCode]
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
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("Payment confirm error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
