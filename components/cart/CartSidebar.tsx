// components/cart/CartSidebar.tsx
"use client";

import { useCartStore } from "@/store/useCartStore";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const [agreed, setAgreed] = useState(false);

  console.log(cart);
  // item.priceRange?item.priceRange:

  const total = cart.reduce(
    (sum, item) => sum + (item.price ? item.price : 8) * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full border-l w-[400px]  z-50 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
        {/*   sm:max-w-sm */}
      <div className="fixed z-50 gap-4 right-0 bg-background p-6 shadow-lg transition ease-in-out w-full h-full">
        <div className="flex items-start justify-between px-4 py-3">
          <h2 className="text-foreground text-lg font-bold mb-4">
            Shopping Cart
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-4">
          <div className="text-sm text-center mb-2">
            <span className="font-semibold text-green-600">
              You have Free Shipping!
            </span>
          </div>
        </div>
        <div>
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.itemid}
                className="flex items-center gap-2 mb-4 border-b pb-4"
              >
                <img
                  src={item.image ?? "/dummy/img-product.png"}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <div className="font-medium text-[14px] align-middle">
                    {item.title}
                  </div>
                  <div className="flex gap-2 items-center font-medium text-[14px] align-middle">
                    <span className="text-green-600 font-bold">
                      {/* €{item.price?item.price:8} x {item.quantity} */}€
                      {item.price ? item.price : 8 * item.quantity}
                    </span>
                  </div>
                  <button
                    className="mr-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-6 h-6"
                    onClick={() =>
                      updateQuantity(item.itemid, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.itemid, item.quantity + 1)
                    }
                    className="ml-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-6 h-6"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.itemid)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-red-500"
                >
                  ×
                </button>
              </div>
            ))
          )}

          <div className="mb-4">
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Add a Note......"
            ></textarea>
          </div>
          {cart.length > 0 && (
            <>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500">
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
                    I agree with the{' '}
                    <a href="/terms" target="_blank" className="underline">
                      terms and conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link href="/checkout">
                  <button
                    disabled={!agreed}
                    className={`px-4 py-2 text-white rounded ${
                      agreed
                        ? "bg-lemon hover:bg-lemon-dark"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {/* className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 flex-1 text-base py-2 rounded-full" */}
                    Check out
                  </button>
                </Link>
                <Link href="/cart">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-10 px-4 flex-1 text-base py-2 rounded-full bg-gray-100 text-black border border-gray-300 hover:bg-gray-200">
                    View cart
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-140px)]">
                {cart.length === 0 ? (
                    <p className="text-gray-500">Cart is empty</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.itemid} className="flex gap-4 items-center border p-2 rounded">
                            <img
                                src={item.image ?? "/placeholder.png"}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <p className="text-xs text-gray-500">
                                    €{item.priceRange} x {item.quantity}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => updateQuantity(item.itemid, item.quantity - 1)}
                                    className="px-1 text-sm"
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.itemid, item.quantity + 1)}
                                    className="px-1 text-sm"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.itemid)}
                                className="text-red-500 ml-2"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="p-4 border-t">
                    <div className="flex justify-between font-semibold text-sm mb-2">
                        <span>Total:</span>
                        <span>€{total.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout">
                        <button className="w-full bg-black text-white py-2 text-sm rounded">
                            Checkout
                        </button>
                    </Link>
                </div>
            )} */}
    </div>
  );
};

export default CartSidebar;
