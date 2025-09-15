// /app/checkout/page.tsx
"use client";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import React, { useState } from "react";
import { savePendingOrder } from "@/lib/hooks/usePendingOrder";

async function startPayment(amount?: number, customerEmail?: string) {
  const res = await fetch("/api/checkout/viva-create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: Math.round((amount ?? 19.99) * 100), // Viva expects amount in cents
      customerEmail: customerEmail ?? "customer@example.com",
    }),
  });

  const order = await res.json();
  if (order.orderCode) {

    console.log('order.orderCode ==== ',order.orderCode);
    // Redirect user to Viva Smart Checkout
    window.location.href = `https://demo.vivapayments.com/web2?ref=${order.orderCode}`;
  } else {
    alert("Failed to create order");
  }
}

const countries = [
  { id: "NL", refName: "Netherlands" },
  { id: "DE", refName: "Germany" },
  { id: "FR", refName: "France" },
  { id: "BE", refName: "Belgium" },
  { id: "UK", refName: "United Kingdom" },
  // Add more as needed
];

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [selectedShipping, setSelectedShipping] = useState("free");

  const total = cart.reduce(
    (sum, item) => sum + (item.price ? item.price : 8) * item.quantity,
    0
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: { id: "NL", refName: "Netherlands" }, // Default to NL
    // country: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
    billingSameAsShipping: true,
    paymentMethod: "viva", // 'card' or 'viva'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = "First name is required";
    if (!form.lastName) errs.lastName = "Last name is required";

    if (!form.country?.id) {
      errs.country = "Country is required";
    }

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errs.email = "Email is not valid";
    }

    if (!form.zip) errs.zip = "Postcode is required";

    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{7,}$/.test(form.phone)) {
      errs.phone = "Phone must be at least 7 digits";
    }

    return errs;
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setOrderStatus("");

    try {
      // 1️⃣ Register Customer
      const registerRes = await fetch("/api/register-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          country: form.country,
          zip: form.zip,
          cartItems: cart,
        }),
      });

      if (!registerRes.ok) throw new Error("Customer registration failed");

      const customer = await registerRes.json();

      // 2️⃣ Choose Payment Method
      if (form.paymentMethod === "card") {
        const paymentRes = await fetch("/api/process-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: customer.id,
            card: {
              number: form.cardNumber,
              expiry: form.expiry,
              cvc: form.cvc,
              name: form.nameOnCard,
            },
          }),
        });

        if (!paymentRes.ok) throw new Error("Payment failed");
      } else if (form.paymentMethod === "viva") {
        // inside handlePlaceOrder
        /* localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            customerId: customer.id, // from register-customer API response
            items: cart, // your cart array
            total: total, // total price
          })
        ); */

        savePendingOrder({
          customerId: customer.id,
          items: cart,
          total,
        });

        startPayment(total, form.email);
        // For demo purposes only
        // window.location.href = "/viva-payment-redirect";
        // return;
        // setOrderStatus("✅ Order placed successfully!");
      }
    } catch (err) {
      setOrderStatus("❌ Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ShopBanner {...commonData.checkoutbanner} />
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        <div className="w-full max-w-6xl">
          <div className="flex gap-8 items-start">
            <div className="flex-1 bg-background rounded-lg shadow p-8 border border-border text-foreground">
              <h2 className="text-xl font-bold mb-6">Checkout</h2>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePlaceOrder();
                }}
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      placeholder="First name"
                      className="border border-border rounded px-4 py-2 bg-background text-foreground"
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      name="lastName"
                      placeholder="Last name"
                      className="border border-border rounded px-4 py-2 bg-background text-foreground"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                {/* <input
              name="country"
              placeholder="Country"
              className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
              type="text"
              value={form.country}
              onChange={handleChange}
            /> */}

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Country *
                </label>
                <select
                  name="country"
                  value={form.country.id}
                  onChange={(e) => {
                    const selected = countries.find(
                      (c) => c.id === e.target.value
                    );
                    if (selected) {
                      setForm({ ...form, country: selected });
                    }
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.refName}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}

                <input
                  name="address"
                  placeholder="Address"
                  className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                />
                <div className="flex gap-4">
                  <span className="w-1/3">
                    <input
                      name="city"
                      placeholder="City"
                      className="border border-border rounded w-full px-4 py-2 bg-background text-foreground"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </span>
                  <span className="w-1/3">
                    <input
                      name="zip"
                      placeholder="ZIP code"
                      className="border border-border rounded w-full px-4 py-2 bg-background text-foreground"
                      type="text"
                      value={form.zip}
                      onChange={handleChange}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-sm">{errors.zip}</p>
                    )}
                  </span>
                  <span className="w-1/3">
                    <input
                      name="phone"
                      placeholder="Phone number *"
                      className="border border-border rounded w-full px-4 py-2  bg-background text-foreground"
                      type="text"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </span>
                </div>
                <h3 className="font-semibold mt-6 mb-2">Contact Information</h3>
                <input
                  name="email"
                  placeholder="Email or phone number"
                  className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                  type="text"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
                <h3 className="font-semibold mt-6 mb-2">Shipping Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 border border-border rounded px-4 py-2 bg-background text-foreground peer-checked:border-red-500 has-[:checked]:border-red-500">
                    <input
                      type="radio"
                      name="shipping"
                      className="peer hidden"
                      value="free"
                      checked={selectedShipping === "free"}
                      onChange={() => setSelectedShipping("free")}
                    />
                    {/* Custom radio circle */}
                    <div className="w-4 h-4 rounded-full border border-border peer-checked:border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-transparent has-[:checked]:border-red-500"></div>
                    </div>
                    Free Shipping (Estimate in 7/10 - 10/10/2025)
                    <span className="ml-auto">$0.00</span>
                  </label>
                  <label className="flex items-center gap-2 border border-border rounded px-4 py-2 bg-background text-foreground peer-checked:border-red-500 has-[:checked]:border-red-500">
                    <input
                      type="radio"
                      name="shipping"
                      className="peer hidden"
                      value="express"
                      checked={selectedShipping === "express"}
                      onChange={() => setSelectedShipping("express")}
                    />
                    {/* Custom radio circle */}
                    <div className="w-4 h-4 rounded-full border border-border peer-checked:border-red-500  flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-transparent has-[:checked]:border-red-500"></div>
                    </div>
                    Express Shipping (Estimate in 4/10 - 5/10/2025){" "}
                    <span className="ml-auto">$16.00</span>
                  </label>
                </div>
                <h3 className="font-semibold mt-6 mb-2">Payment</h3>
                <div className="space-y-2">
                  {/* <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={form.paymentMethod === "card"}
                      onChange={handleChange}
                    />
                    Credit Card
                  </label> */}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="viva"
                      checked={form.paymentMethod === "viva"}
                      onChange={handleChange}
                    />
                    Viva Wallet
                  </label>

                  {form.paymentMethod === "card" && (
                    <div className="space-y-4 mt-4">
                      <div className="flex gap-4">
                        <input
                          name="cardNumber"
                          placeholder="Card number"
                          className="border border-border rounded px-4 py-2 w-1/2 bg-background text-foreground"
                          type="text"
                          value={form.cardNumber}
                          onChange={handleChange}
                        />
                        <input
                          name="expiry"
                          placeholder="Expiration date (MM/YY)"
                          className="border border-border rounded px-4 py-2 w-1/4 bg-background text-foreground"
                          type="text"
                          value={form.expiry}
                          onChange={handleChange}
                        />
                        <input
                          name="cvc"
                          placeholder="Security code"
                          className="border border-border rounded px-4 py-2 w-1/4 bg-background text-foreground"
                          type="text"
                          value={form.cvc}
                          onChange={handleChange}
                        />
                      </div>
                      <input
                        name="nameOnCard"
                        placeholder="Name on card"
                        className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                        type="text"
                        value={form.nameOnCard}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="space-y-4 mt-4">
                    <label className="flex items-center gap-2 mt-2">
                      <input
                        name="billingSameAsShipping"
                        type="checkbox"
                        checked={form.billingSameAsShipping}
                        onChange={handleChange}
                      />
                      Use shipping address as billing address
                    </label>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <a href="/privacy-policy" className="underline">
                    privacy policy
                  </a>
                  .
                </div>
              </form>
            </div>
            <div className="w-[400px] max-w-full bg-background rounded-lg shadow p-6 h-fit sticky top-8 border border-border text-foreground">
              <h3 className="text-lg font-bold mb-4">Shopping Cart</h3>
              <div className="mb-4">
                <div className="text-sm mb-2">
                  Spend $100 more to get
                  <span className="font-semibold text-green-600">
                    Free Shipping
                  </span>
                </div>
                <div className="relative h-3 bg-muted rounded-full mb-2">
                  <div className="absolute top-0 left-0 h-3 bg-lemon rounded-full w-full transition-[width] duration-300"></div>
                  <div className="absolute top-1/2 left-[calc(100%*0.99)] -translate-y-1/2 -translate-x-1/2 ">
                    {/* left-[calc(100%-16px)] */}
                    <svg
                      className="h-5 w-5 bg-background rounded-full border border-border p-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 6h15l-1.5 9h-13z" fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="max-h-96 mb-4 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.itemid}
                    className="flex items-center gap-2 mb-4"
                  >
                    <img
                      src={item.image ?? "/dummy/img-product.png"}
                      alt={item.title}
                      className="w-16 h-16 object-contain"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-[14px] align-middle">
                        <Link href={`/product/${item.itemid}`}>
                          {item.title}
                        </Link>
                      </div>
                      <div className="text-sm">
                        ${item.price ? item.price : 8} x {item.quantity}
                      </div>
                      <div className="text-sm font-bold">
                        <span className="text-green-600 font-bold">
                          ${(item.price ? item.price : 8) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <textarea
                className="w-full border border-border rounded px-3 py-2 text-sm mb-4 bg-background text-foreground"
                placeholder="Add a Note......"
              ></textarea>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
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
              {/* <button className="w-full bg-foreground text-background py-2 rounded-full text-base font-semibold">
            Place Order
          </button> */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={!agreed || loading}
                className={`w-full bg-foreground text-background py-3 rounded-full text-base font-semibold ${
                  agreed
                    ? "bg-lemon hover:bg-lemon-dark"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                  <p className="ml-4 text-lg font-semibold">
                    Redirecting to payment...
                  </p>
                </div>
              )}

              {orderStatus && (
                <p className="mt-4 text-sm text-center text-muted-foreground">
                  {orderStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
