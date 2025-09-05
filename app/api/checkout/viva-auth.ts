import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    try {
        const authString = Buffer.from(
            `${process.env.VIVA_SMART_CLIENT_ID}:${process.env.VIVA_SMART_CLIENT_SECRET}`
        ).toString("base64");

        const response = await fetch(
            "https://demo-accounts.vivapayments.com/connect/token",
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authString}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                }),
            }
        );

        const data = await response.json();
        res.status(200).json(data); // contains access_token

    } catch (err: any) {
        console.error('err ==== ',err);
        res.status(500).json({ error: err.message });
    }
}
