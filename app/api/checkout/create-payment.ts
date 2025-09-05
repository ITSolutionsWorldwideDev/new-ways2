/* 
import type { NextApiRequest, NextApiResponse } from 'next';

import { Vivawallet } from '@nkhind/vivawallet-sdk';

const vivawallet = new Vivawallet({
  merchantId: process.env.VIVA_MERCHANT_ID!,
  apikey: process.env.VIVA_API_KEY!,
  baseURL: 'https://demo-api.vivapayments.com'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  try {
    const { amount, currency, description } = req.body;
    // const payment = await viva.createPayment({
    //   amount,
    //   currencyCode: currency,
    //   description,
    // });

    const order = await vivawallet.payments.createOrder({
                    amount: 1999,               // in cents (e.g., 19.99 EUR)
                    customerTrns: 'Order #1234',
                    customer: {
                        email: 'customer@example.com',
                        fullName: 'John Doe'
                    },
                    sourceCode: process.env.VIVA_SOURCE_CODE!
                    });

    console.log(order);


    res.status(200).json(order);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Payment failed' });
  }
}
  */