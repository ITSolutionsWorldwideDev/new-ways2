"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  /* const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  ); */

  const cart = useCartStore(state => state.cart);

return (
  <div>
    {cart.map(item => (
      <div key={item.itemid}>{item.title} x {item.quantity}</div>
    ))}
  </div>
);

  /* return (
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
              left-[calc(100%-16px)]
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
            <table className="w-full mb-6">
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
                <tr className="border-b border-border last:border-none">
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
                      <input
                        min="1"
                        className="w-12 border border-border rounded px-2 py-1 text-center bg-background text-foreground"
                        type="number"
                        value="5"
                      />
                      <button className="border border-border px-2 py-1 rounded bg-background text-foreground">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="pr-8">$40.00</td>
                  <td>
                    <button className="text-red-500 text-xs">Remove</button>
                  </td>
                </tr>
                <tr className="border-b border-border last:border-none">
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
                </tr>
              </tbody>
            </table>
            <div className="flex items-center gap-2 mb-4">
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
                  stroke-width="2"
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
                  stroke-width="2"
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
                  stroke-width="2"
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
                  stroke-width="2"
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
                <span>$100.00 USD</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout
              </div>
              <div className="flex items-center gap-2">
                <input id="agree" className="accent-lemon" type="checkbox" />
                <label className="text-xs">
                  I agree with the
                  <a href="/terms" target="_blank" className="underline">
                    terms and conditions
                  </a>
                </label>
              </div>
            </div>
            <Link href="/checkout">
            <button className="w-full bg-foreground text-background py-2 rounded-full text-base font-semibold">
              Checkout
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
  ); */
}

/* return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className="font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6"
            >
              your cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl">Subtotal</span>
                    <span className="md:text-xl font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl">
                      Discount (-
                      {Math.round(
                        ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                      )}
                      %)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -${Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl">
                      Delivery Fee
                    </span>
                    <span className="md:text-xl font-bold">Free</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold">
                      ${Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder="Add promo code"
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-black rounded-full w-full max-w-[119px] h-[48px]"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                >
                  Go to Checkout{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  ); */

/* // /app/cart/page.tsx
"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between p-2 border-b">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, +e.target.value)}
                className="w-16 border"
              />
              <span>${item.price * item.quantity}</span>
              <button onClick={() => removeItem(item.id)}>❌</button>
            </div>
          ))}
          <h2 className="mt-4 text-xl">Total: ${total()}</h2>
          <Link href="/checkout">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
 */
