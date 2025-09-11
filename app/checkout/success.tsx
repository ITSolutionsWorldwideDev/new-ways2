import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const { t, s } = router.query; // transactionId and status
  const [verified, setVerified] = useState<'pending' | 'ok' | 'fail'>('pending');

  useEffect(() => {
    if (t) {
      // Call our backend to verify transaction status
      fetch(`/api/checkout/verify-payment?t=${t}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'Completed') {
            setVerified('ok');
          } else {
            setVerified('fail');
          }
        });
    }
  }, [t]);

  if (verified === 'pending') return <p>Verifying your payment...</p>;
  if (verified === 'ok') return <h1>✅ Payment Successful!</h1>;
  return <h1>❌ Payment Failed.</h1>;
}
