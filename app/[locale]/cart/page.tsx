// /app/cart/page.tsx
"use client";
import Link from "next/link";
import React, { useState } from "react";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";
import { useCartStore } from "@/store/useCartStore";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import ShippingBar from "@/components/shop/ShippingBar";

import { useCurrency } from "@/context/currencyContext";
import { formatPrice } from "@/lib/formatPrice";
import RandomProducts from "@/components/product/ProductDetail/RandomProducts";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const [agreed, setAgreed] = useState(false);

  const { currency } = useCurrency();

  const { removeFromCart, updateQuantity } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + (item.price ? item.price : 8) * item.quantity,
    0
  );

  return (
    <>
      <ShopBanner {...commonData.cartbanner} />
      <div className="container mx-auto py-8 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <ShippingBar cartTotal={total}></ShippingBar>
          <div className="flex gap-8 items-start">
            <div className="flex-1 bg-background rounded-lg shadow p-6 border border-border">
              <table className="w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr className="text-left">
                    <th className="py-2 px-3 sm:w-[250px] lg:w-[300px]">
                      Product
                    </th>
                    <th className="py-2 px-3 w-[100px]">Price</th>
                    <th className="py-2 px-3 w-[100px]">Quantity</th>
                    <th className="py-2 px-3 w-[100px]">Total</th>
                    <th className="py-2 px-3 w-[60px]"></th>
                  </tr>
                </thead>
              </table>

              <ScrollArea.Root
                type="always"
                className="w-full h-auto max-h-[400px] overflow-y-auto"
              >
                <ScrollArea.Viewport className="w-full">
                  <table className="w-full table-fixed">
                    <tbody>
                      {cart.map((item) => (
                        <tr
                          key={item.itemid}
                          className="border-b border-border last:border-none"
                        >
                          <td className="flex items-center gap-2 py-4 sm:w-[250px] lg:w-[300px]">
                            <img
                              src={item.image ?? "/dummy/img-product.png"}
                              alt={item.title}
                              className="w-16 h-16 object-contain"
                            />
                            <span className="font-medium text-[14px] align-middle">
                              <Link href={`/product/${item.itemid}`}>
                                {item.title}
                              </Link>
                            </span>
                          </td>
                          <td className="pr-8 w-[100px] text-right">
                            {item.price ? formatPrice(item.price, currency) : 8}
                          </td>
                          <td className=" w-[100px]">
                            <div className="flex items-center gap-4">
                              <button
                                className="border border-border px-2 py-1 rounded bg-background text-foreground"
                                onClick={() =>
                                  updateQuantity(item.itemid, item.quantity - 1)
                                }
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                className="border border-border px-2 py-1 rounded bg-background text-foreground"
                                onClick={() =>
                                  updateQuantity(item.itemid, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="pr-8 w-[100px] text-right">
                            {formatPrice(
                              (item.price ? item.price : 8) * item.quantity,
                              currency
                            )}
                          </td>
                          <td className="w-[60px] text-right">
                            <button
                              onClick={() => removeFromCart(item.itemid)}
                              className="text-red-500 text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex select-none touch-none p-0.5 bg-gray-100 rounded w-2"
                >
                  <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-full" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>

              <div className="flex items-center gap-2 mb-4 mt-4">
                <input id="giftwrap" className="accent-lemon" type="checkbox" />
                <label className="text-sm">
                  Add gift wrap. Only $10.00. (You can choose or not)
                </label>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  placeholder="Discount code"
                  className="border border-border rounded px-2 py-1 bg-background text-foreground"
                  type="text"
                />
                <button className="border border-border rounded px-4 py-1 bg-background text-foreground">
                  Apply
                </button>
              </div>
              <div className="flex gap-6 justify-center my-6 text-sm">
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-lemon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"></path>
                  </svg>
                  FREE SHIPPING
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-lemon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h4v4"></path>
                  </svg>
                  GIFT PACKAGE
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-lemon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  EASY RETURNS
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-lemon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                  ONE YEAR WARRANTY
                </span>
              </div>
            </div>
            <div className="w-[400px] max-w-full bg-background  p-6text-foreground h-fit sticky top-8 flex flex-col gap-4">
              <label className="font-semibold mb-2">
                Special instructions for seller
              </label>
              <textarea
                id="note"
                className="w-full border border-border rounded px-3 py-2 text-sm mb-2 bg-background text-foreground"
                placeholder="Special instructions for seller"
              ></textarea>

              <div className="w-[400px] max-w-full bg-background rounded-lg shadow p-6 border border-border text-foreground h-fit sticky top-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Taxes and shipping calculated at checkout
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="agree"
                      className="accent-lemon"
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                    />
                    <label className="text-xs">
                      I agree with the{" "}
                      <a href="/terms" target="_blank" className="underline">
                        terms and conditions
                      </a>
                    </label>
                  </div>
                </div>

                <Link href="/checkout">
                  <button
                    disabled={!agreed}
                    className={`px-4 py-2 border rounded-full ${
                      agreed
                        ? "bg-lemon hover:bg-lemon-dark  border-gray-300 text-black"
                        : "cursor-not-allowed"
                    }`}
                  >
                    Check out
                  </button>
                </Link>

                <div className="flex gap-2 justify-center mt-2">
                  <img
                    alt="Visa"
                    className="h-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                  />
                  <img
                    alt="Mastercard"
                    className="h-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  />
                  <img
                    alt="PayPal"
                    className="h-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
                  />
                </div>
              </div>

              <div className="rounded-lg p-6 max-w-md bg-gradient-to-br from-white to-[#FFF700] dark:from-black dark:to-[#FFF700]">
                <div className="text-2xl mb-2 dark:text-white">★ ★ ★ ★ ★</div>
                <div className="text-lg font-semibold mb-2 dark:text-white">
                  “Stylish, comfortable, and perfect for any occasion! My new
                  favorite fashion destination.”
                </div>
                <div className="text-sm text-gray-900">
                  <span className="dark:text-white">Viera P.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              You May Also Like
            </h3>
            <RandomProducts></RandomProducts>
          </div>
        </div>
      </div>
    </>
  );
}