"use client";

async function startPayment() {
    const res = await fetch("/api/viva-create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount: 1999, // 19.99 EUR
            customerEmail: "customer@example.com",
        }),
    });

    const order = await res.json();

    if (order.orderCode) {
        window.location.href = `https://demo.vivapayments.com/web2?ref=${order.orderCode}`;
    } else {
        alert("Failed to create order");
    }
}

export default function CheckoutButton() {
    return (
        <button
            onClick={startPayment}
            className="bg-green-600 text-white px-4 py-2 rounded"
        >
            Pay with Viva Wallet
        </button>
    );
}
