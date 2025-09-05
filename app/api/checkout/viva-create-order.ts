import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    try {
        const { amount, customerEmail } = req.body;

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
                    amount: amount, // in cents (1999 = 19.99 EUR)
                    customerTrns: "Order Payment",
                    customer: {
                        email: customerEmail,
                    },
                    sourceCode: process.env.VIVA_SOURCE_CODE,
                    merchantTrns: "MyShop Order #1234",
                }),
            }
        );

        const orderData = await orderRes.json();
        res.status(200).json(orderData); // will contain orderCode
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
