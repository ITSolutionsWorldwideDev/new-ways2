// /app/api/related-products/route.ts (GET)

import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  const result = await runQuery(
    `SELECT product_id, displayname, price, stock_quantity, category_id, matchcode, itemid, image_url 
     FROM products AS i 
     ORDER BY RANDOM()
     LIMIT 10`
  );

  const data: any = {};
  data.items = result.rows;
  return NextResponse.json(data);
}
