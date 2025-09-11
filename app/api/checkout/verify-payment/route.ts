import { NextRequest, NextResponse } from 'next/server';

// Helper: get Viva OAuth2 token
async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.VIVA_SMART_CLIENT_ID}:${process.env.VIVA_SMART_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch('https://demo-accounts.vivapayments.com/connect/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error('Failed to fetch access token');
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

  if (!res.ok) throw new Error('Failed to fetch transaction');
  return res.json();
}

// Helper: Create Sales Order in NetSuite
async function createNetsuiteOrder(transaction: any) {
  // Adjust this to your NetSuite API integration
  const netsuiteRes = await fetch(`${process.env.NETSUITE_BASE_URL}/saleorder`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NETSUITE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      externalId: transaction.TransactionId,
      total: transaction.Amount / 100, // convert cents → EUR
      currency: transaction.CurrencyCode,
      customerEmail: transaction.Customer?.Email,
      status: 'Paid',
    }),
  });

  if (!netsuiteRes.ok) throw new Error('Failed to create NetSuite order');
  return netsuiteRes.json();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('t');

    if (!transactionId) {
      return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });
    }

    // 1. Get Viva access token
    const { access_token } = await getAccessToken();

    // 2. Get transaction details
    const txData = await getTransaction(transactionId, access_token);

    console.log('txData.StatusId === ',txData.StatusId);
    console.log('txData.status === ',txData.status);

    // 3. If completed, create order in NetSuite
    if (txData.StatusId === 'F' || txData.status === 'Completed') {
      // Viva can return StatusId=F (Finished) OR status="Completed"
      const nsOrder = await createNetsuiteOrder(txData);
      return NextResponse.json({ status: 'Completed', netsuite: nsOrder });
    }

    return NextResponse.json({ status: txData.status || 'Pending' });
  } catch (err: any) {
    console.error('Verify API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
