import { NextRequest, NextResponse } from "next/server";

// Helper: get Viva OAuth2 token
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

  if (!res.ok) throw new Error("Failed to fetch access token");
  return res.json();
}

// Helper: fetch transaction details
async function getTransaction(transactionId: string, accessToken: string) {
  const res = await fetch(
    `https://demo-api.vivapayments.com/checkout/v2/transactions/${transactionId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch transaction");
  return res.json();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get("t");

    if (!transactionId) {
      return NextResponse.json(
        { error: "Missing transaction ID" },
        { status: 400 }
      );
    }

    // 1. Get Viva access token
    const { access_token } = await getAccessToken();

    // 2. Get transaction details
    const txData = await getTransaction(transactionId, access_token);

    console.log("txData ===", txData);

    // 3. If completed, call your internal /api/salesOrder endpoint
    if (txData.StatusId === "F" || txData.status === "Completed") {
      const orderPayload = {
        customerId: "1234", // ✅ replace with logic to map Viva customer → NetSuite customer
        items: [
          {
            id: "5678", // ✅ NetSuite item internal ID (you need to map from your cart/db)
            quantity: 1,
            rate: txData.Amount / 100, // use Viva transaction amount
          },
        ],
        subsidiaryId: "6",
        locationId: "1",
      };

      const nsRes = await fetch(`${process.env.DOMAIN_URL}/api/salesOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!nsRes.ok) {
        const errText = await nsRes.text();
        throw new Error("Failed to create order via salesOrder: " + errText);
      }

      const nsData = await nsRes.json();

      return NextResponse.json({
        status: "Completed",
        netsuite: nsData,
      });
    }

    return NextResponse.json({ status: txData.status || "Pending" });
  } catch (err: any) {
    console.error("Verify API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
