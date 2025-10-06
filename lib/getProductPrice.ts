type Product = {
  price: number;
  price_1?: number;
  price_4?: number;
  price_5?: number;
  price_9?: number;
  price_10?: number;
  usd_price?: number;
  usd_price_4?: number;
  usd_price_9?: number;
};

interface GetPriceOptions {
  product: Product;
  quantity: number;
  isB2B: boolean;
  currency: string;
}

export function getProductPrice({
  product,
  quantity,
  isB2B,
  currency,
}: GetPriceOptions): number {
  if (!isB2B) {
    return currency === "USD"
      ? product.usd_price ?? product.price
      : product.price;
  }

  const isUSD = currency === "USD";
  let priceField: keyof Product = "price_1";

  if (quantity >= 10) priceField = isUSD ? "usd_price_9" : "price_10";
  else if (quantity >= 9) priceField = isUSD ? "usd_price_9" : "price_9";
  else if (quantity >= 5) priceField = isUSD ? "usd_price_4" : "price_5";
  else if (quantity >= 4) priceField = isUSD ? "usd_price_4" : "price_4";
  else priceField = isUSD ? "usd_price" : "price_1";

  const selected = product[priceField];

  return selected ?? product.price;
}
