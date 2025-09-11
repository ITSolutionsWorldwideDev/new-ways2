"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const t = searchParams.get("t"); // transactionId
  const [status, setStatus] = useState<"pending" | "ok" | "fail">("pending");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!t) return;

      const orderData = localStorage.getItem("pendingOrder");
      if (!orderData) {
        console.error("No order data found in localStorage");
        setStatus("fail");
        return;
      }

      const parsedOrder = JSON.parse(orderData);

      // 1️⃣ Verify Viva payment
      const res = await fetch(`/api/checkout/verify-payment?t=${t}`);
      const data = await res.json();

      if (data.status === "Completed") {
        // 2️⃣ Create order in NetSuite
        const nsRes = await fetch("/api/salesOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: parsedOrder.customerId,
            items: parsedOrder.items,
            total: parsedOrder.total,
          }),
        });

        if (nsRes.ok) {
          setStatus("ok");
          localStorage.removeItem("pendingOrder"); // clear temp data
        } else {
          setStatus("fail");
        }
      } else {
        setStatus("fail");
      }
    };

    verifyPayment();
  }, [t]);

  if (status === "pending") return <p>Verifying your payment...</p>;
  if (status === "ok") return <h1>✅ Order created in NetSuite!</h1>;
  return <h1>❌ Payment Failed.</h1>;
}
