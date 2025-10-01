// lib/formatPrice.ts
import { supportedCurrencies } from "./currency";


export function formatPrice(amount: number | string, currency: string) {
  const currencyInfo = supportedCurrencies.find((c) => c.id === currency);
  const symbol = currencyInfo?.symbol ?? "$";

  // Convert amount to number safely
  const numAmount = typeof amount === "number" ? amount : Number(amount);

  if (isNaN(numAmount)) {
    // Handle invalid number gracefully
    return `${symbol}0.00`;
  }

  return `${symbol}${numAmount.toFixed(2)}`;
}

// export function formatPrice(amount: number, currency: string) {
//   const currencyInfo = supportedCurrencies.find((c) => c.id === currency);
//   const symbol = currencyInfo?.symbol ?? "$";

//   return `${symbol}${amount?.toFixed(2)}`;
// }
