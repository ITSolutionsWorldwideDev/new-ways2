"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import React, { useState } from "react";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";
import { useCartStore } from "@/store/useCartStore";

import * as ScrollArea from "@radix-ui/react-scroll-area";

export default function CartPage() {
  /* const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  ); */

  const cart = useCartStore((state) => state.cart);
  const [agreed, setAgreed] = useState(false);

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
          <div className="mb-8">
            <div className="text-center text-lg font-semibold mb-2">
              Spend $100 more to get{" "}
              <span className="text-green-600">Free Shipping</span>
            </div>
            <div className="relative h-3 bg-muted rounded-full mx-auto max-w-xl">
              <div className="absolute top-0 left-0 h-3 bg-lemon rounded-full w-full transition-[width] duration-300"></div>
              <div className="absolute top-1/2 left-[calc(100%*0.99)] -translate-y-1/2 -translate-x-1/2">
                <svg
                  className="h-5 w-5 bg-background rounded-full border border-border p-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h15l-1.5 9h-13z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
          </div>
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

              {/* Scrollable Body with Custom Scrollbar */}
              <ScrollArea.Root
                type="always"
                className="w-full h-auto max-h-[400px] overflow-y-auto"
              >
                <ScrollArea.Viewport className="w-full">
                  <table className="w-full table-fixed">
                    <tbody>
                      {cart.map((item) => (
                        // <div key={item.itemid}>{item.title} x {item.quantity}</div>
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
                            ${item.price ? item.price : 8}
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
                            ${(item.price ? item.price : 8) * item.quantity}
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

                {/* Custom Scrollbar */}
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex select-none touch-none p-0.5 bg-gray-100 rounded w-2"
                >
                  <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-full" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>

              {/* <table className="w-full mb-6">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    // <div key={item.itemid}>{item.title} x {item.quantity}</div>
                    <tr
                      key={item.itemid}
                      className="border-b border-border last:border-none"
                    >
                      <td className="flex items-center gap-2 py-4">
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
                      <td className="pr-8">${item.price ? item.price : 8}</td>
                      <td className="pr-8">
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
                          <input
                            min="1"
                            className="w-12 border border-border rounded px-2 py-1 text-center bg-background text-foreground"
                            type="number"
                            value="{item.quantity}"
                          />
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
                      <td className="pr-8">
                        ${(item.price ? item.price : 8) * item.quantity}
                      </td>
                      <td>
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
              </table> */}
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
            <div className="w-[400px] max-w-full bg-background rounded-lg shadow p-6 border border-border text-foreground h-fit sticky top-8 flex flex-col gap-4">
              <label className="font-semibold mb-2">
                Special instructions for seller
              </label>
              <textarea
                id="note"
                className="w-full border border-border rounded px-3 py-2 text-sm mb-2 bg-background text-foreground"
                placeholder="Special instructions for seller"
              ></textarea>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  {/* <span>$100.00 USD</span> */}
                  <span>${total.toFixed(2)}</span>
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

              {/* <Link href="/checkout">
                <button className="w-full bg-foreground text-background py-2 rounded-full text-base font-semibold">
                  Checkout
                </button>
              </Link> */}
              <div className="flex gap-2 justify-center mt-2">
                <img
                  alt="Visa"
                  className="h-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                />
                <img
                  alt="Mastercard"
                  className="h-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Mastercard-logo.svg"
                />
                <img
                  alt="PayPal"
                  className="h-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/PayPal.svg"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
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
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-background rounded-lg shadow p-4 flex flex-col items-center border border-border">
                <img
                  alt="Product"
                  className="w-32 h-32 object-contain mb-2"
                  src="/dummy/img-product.png"
                />
                <div className="font-semibold mb-1">
                  'Rap' Organic Green Hemp - 3 KS Cones
                </div>
                <div className="text-green-600 font-bold mb-1">$55.00</div>
              </div>
              <div className="bg-background rounded-lg shadow p-4 flex flex-col items-center border border-border">
                <img
                  alt="Product"
                  className="w-32 h-32 object-contain mb-2"
                  src="/dummy/img-product.png"
                />
                <div className="font-semibold mb-1">
                  'Rap' Organic Green Hemp - 3 KS Cones
                </div>
                <div className="text-green-600 font-bold mb-1">$115.00</div>
              </div>
              <div className="bg-background rounded-lg shadow p-4 flex flex-col items-center border border-border">
                <img
                  alt="Product"
                  className="w-32 h-32 object-contain mb-2"
                  src="/dummy/img-product.png"
                />
                <div className="font-semibold mb-1">
                  'Rap' Organic Green Hemp - 3 KS Cones
                </div>
                <div className="text-green-600 font-bold mb-1">$85.00</div>
              </div>
              <div className="bg-background rounded-lg shadow p-4 flex flex-col items-center border border-border">
                <img
                  alt="Product"
                  className="w-32 h-32 object-contain mb-2"
                  src="/dummy/img-product.png"
                />
                <div className="font-semibold mb-1">
                  'Rap' Organic Green Hemp - 3 KS Cones
                </div>
                <div className="text-green-600 font-bold mb-1">$85.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <tr className="border-b border-border last:border-none">
                    <td className="flex items-center gap-2 py-4">
                      <img
                        alt="'Rap' Organic Green Hemp - 3 KS Cones"
                        className="w-16 h-16 object-contain"
                        src="/dummy/img-product.png"
                      />
                      <span className="font-semibold">
                        'Rap' Organic Green Hemp - 3 KS Cones
                      </span>
                    </td>
                    <td className="pr-8">$8.00</td>
                    <td className="pr-8">
                      <div className="flex items-center gap-4">
                        <button className="border border-border px-2 py-1 rounded bg-background text-foreground">
                          -
                        </button>
                        5
                        <button className="border border-border px-2 py-1 rounded bg-background text-foreground">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="pr-8">$40.00</td>
                    <td>
                      <button className="text-red-500 text-xs">Remove</button>
                    </td>
                  </tr> */
}
{
  /* <tr className="border-b border-border last:border-none">
                    <td className="flex items-center gap-2 py-4">
                      <img
                        alt="'Rap' Organic Green Hemp - 3 KS Cones"
                        className="w-16 h-16 object-contain"
                        src="/dummy/img-product.png"
                      />
                      <span className="font-semibold">
                        'Rap' Organic Green Hemp - 3 KS Cones
                      </span>
                    </td>
                    <td className="pr-8">$60.00</td>
                    <td className="pr-8">
                      <div className="flex items-center gap-4">
                        <button className="border border-border px-2 py-1 rounded bg-background text-foreground">
                          -
                        </button>
                        <input
                          min="1"
                          className="w-12 border border-border rounded px-2 py-1 text-center bg-background text-foreground"
                          type="number"
                          value="1"
                        />
                        <button className="border border-border px-2 py-1 rounded bg-background text-foreground">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="pr-8">$60.00</td>
                    <td>
                      <button className="text-red-500 text-xs">Remove</button>
                    </td>
                  </tr> */
}
