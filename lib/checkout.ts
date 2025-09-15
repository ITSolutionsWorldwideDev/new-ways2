// lib/checkout.ts

import { useCartStore } from "@/store/useCartStore";

export async function handleCheckout(userDetails: any) {
  const cart = useCartStore.getState().cart;

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const body = {
    ...userDetails,
    cartItems: cart,
  };

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Checkout failed");
  }

  return response.json();
}
