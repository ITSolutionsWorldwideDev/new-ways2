import { runSuiteQLQuery } from "@/services/shop/items";
import { NextRequest, NextResponse } from "next/server";
import { getNetSuiteAxios } from "@/services/netsuiteAxios";

export async function POST(req: Request) {

  const body = await req.json();
  const { customerId, items, subsidiaryId, locationId } = body;

  try {

    // 2️⃣ Create new customer if not found
    const axiosInstance = getNetSuiteAxios();

    const payload = {
      entity: { id: customerId }, // customer internal id
    //   subsidiary: subsidiaryId ? { id: subsidiaryId } : undefined, // if OneWorld
      subsidiary: { id: "6" }, // required in OneWorld
    //   location: locationId ? { id: locationId } : undefined,       // optional but often required
      item: items.map((it: any) => ({
        item: { id: it.id },       // item internal id from NetSuite
        quantity: it.quantity,     // quantity ordered
        rate: it.rate ?? undefined // optional, will default to item price
      }))
    };


    const response = await axiosInstance.post("/record/v1/salesOrder", payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Prefer: "transient",

    return NextResponse.json(
      { existing: false, orders: response.data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error in Sales Order:",
      error?.response?.data || error.message
    );

    return NextResponse.json(
      { error: "Failed to add Sales Order", details: error?.message },
      { status: 500 }
    );
  }
}

/* 
Sales Order

POST /record/v1/salesOrder

{
  "entity": {
    "id": "1234"   // Customer ID from step 2
  },
  "subsidiary": {
    "id": "1"
  },
  "location": {
    "id": "2"
  },
  "item": [
    {
      "item": {
        "id": "567"   // Internal ID of the item
      },
      "quantity": 2,
      "rate": 49.99
    },
    {
      "item": {
        "id": "890"
      },
      "quantity": 1,
      "rate": 19.99
    }
  ]
}
SELECT id, email FROM customer WHERE email = 'john.doe@example.com' */
