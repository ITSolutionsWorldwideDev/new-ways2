// /app/api/order-history/route.ts (GET)

import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const result = await runQuery(
    `SELECT * 
     FROM orders AS i where user_id = $1`,
    [userId]
  );

  /* const result = await runQuery(
    `SELECT product_id, displayname, price, stock_quantity, category_id, matchcode, itemid, image_url 
     FROM products AS i 
     where category_id in (SELECT p.category_id FROM products AS p WHERE p.product_id = $1) limit 10`,
    [productId]
  );
 */
  const data: any = {};
  data.orders = result.rows;
  return NextResponse.json(data);
}
