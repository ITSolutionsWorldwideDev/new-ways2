// /app/checkout/page.tsx
"use client";
import React, { useEffect, useState } from "react";
// import { useUser } from "@/context/userContext";
import { useSessionStore } from "@/store/useSessionStore";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { savePendingOrder } from "@/lib/hooks/usePendingOrder";
import ShippingBar from "@/components/shop/ShippingBar";
import { useToast } from "@/hooks/use-toast";

import { useCurrency } from "@/context/currencyContext";
import { formatPrice } from "@/lib/formatPrice";

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
];

const freeShippingThreshold = 100;

export default function CheckoutPage() {
  // const { user } = useUser();
  const { user } = useSessionStore();
  const cart = useCartStore((state) => state.cart);
  const [agreed, setAgreed] = useState(false);
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [selectedShipping, setSelectedShipping] = useState("free");
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const { currency } = useCurrency();

  const total = cart.reduce(
    (sum, item) => sum + (item.price ? item.price : 8) * item.quantity,
    0
  );

  useEffect(() => {
    if (total >= freeShippingThreshold) {
      setSelectedShipping("free");
    } else {
      setSelectedShipping("express");
    }
  }, [total]);

  const shippingCost = selectedShipping === "express" ? 16 : 0;
  const grandTotal = total + shippingCost;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: { id: "NL", refName: "Netherlands" },
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
    billingFirstName: "",
    billingLastName: "",
    billingPhone: "",
    billingEmail: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
    billingCountry: { id: "NL", refName: "Netherlands" },
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
    billingSameAsShipping: true,
    paymentMethod: "viva",
  });

  useEffect(() => {
    if (!user?.userId) return;

    let ignore = false;

    async function fetchAccount() {
      try {
        setLoading(true);
        const res = await fetch(`/api/account-details?userId=${user?.userId}`);
        const text = await res.text();
        if (!text || ignore) return;

        const data = JSON.parse(text);
        const acc = data.account?.[0];

        if (acc) {
          const hasBillingAddress = !!acc.billingfirstname;

          setUseDifferentBilling(hasBillingAddress);

          setForm({
            firstName: acc.firstName || "",
            lastName: acc.lastName || "",
            email: acc.email || "",
            phone: acc.addrPhone || "",
            address: acc.addr1 || "",
            city: acc.city || "",
            zip: acc.zip || "",
            country: {
              id: acc.country || "",
              refName:
                countries.find((c) => c.id === acc.country)?.refName || "",
            },
            billingFirstName: acc.billingfirstname || "",
            billingLastName: acc.billinglastname || "",
            billingEmail: acc.billingemail || "",
            billingPhone: acc.billingphone || "",
            billingAddress: acc.billingaddress || "",
            billingCity: acc.billingcity || "",
            billingZip: acc.billingzip || "",
            billingCountry: {
              id: acc.billingcountry || "",
              refName:
                countries.find((c) => c.id === acc.billingcountry)?.refName ||
                "",
            },
            cardNumber: "",
            expiry: "",
            cvc: "",
            nameOnCard: "",
            billingSameAsShipping: true,
            paymentMethod: "viva",
          });
        }
      } catch (err) {
        console.error("Error fetching account details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAccount();
    return () => {
      ignore = true;
    };
  }, [user?.userId]);

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
          ...(useDifferentBilling && {
            billingFirstName: form.billingFirstName,
            billingLastName: form.billingLastName,
            billingPhone: form.billingPhone,
            billingEmail: form.billingEmail,
            billingAddress: form.billingAddress,
            billingCity: form.billingCity,
            billingZip: form.billingZip,
            billingCountry: form.billingCountry.id,
          }),
          cartItems: cart,
        }),
      });

      if (!registerRes.ok) throw new Error("Customer registration failed");

      const customer = await registerRes.json();

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
        savePendingOrder({
          customerId: customer.id,
          items: cart,
          total,
        });

        startPayment(total, form.email);
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
                <div className="space-y-4 mt-4">
                  <label className="flex items-center gap-2 mt-4">
                    <input
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={!useDifferentBilling}
                      onChange={() => setUseDifferentBilling((prev) => !prev)}
                    />
                    Use shipping address as billing address
                  </label>
                </div>
                {useDifferentBilling && (
                  <div className="mt-6 space-y-4 border-t pt-4">
                    <h4 className="font-semibold">Billing Address</h4>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          name="billingFirstName"
                          placeholder="Billing First Name"
                          className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                          value={form.billingFirstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          name="billingLastName"
                          placeholder="Billing Last Name"
                          className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                          value={form.billingLastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <input
                      name="billingEmail"
                      placeholder="Billing Email"
                      className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                      value={form.billingEmail}
                      onChange={handleChange}
                    />
                    <input
                      name="billingAddress"
                      placeholder="Billing Address"
                      className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                      value={form.billingAddress}
                      onChange={handleChange}
                    />
                    <select
                      name="billingCountry"
                      value={form.billingCountry?.id || ""}
                      onChange={(e) => {
                        const selected = countries.find(
                          (c) => c.id === e.target.value
                        );
                        if (selected) {
                          setForm((prev) => ({
                            ...prev,
                            billingCountry: selected,
                          }));
                        }
                      }}
                      className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.refName}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-4">
                      <input
                        name="billingCity"
                        placeholder="Billing City"
                        className="w-1/3 border border-border rounded px-4 py-2 bg-background text-foreground"
                        value={form.billingCity}
                        onChange={handleChange}
                      />
                      <input
                        name="billingZip"
                        placeholder="Billing ZIP"
                        className="w-1/3 border border-border rounded px-4 py-2 bg-background text-foreground"
                        value={form.billingZip}
                        onChange={handleChange}
                      />
                      <input
                        name="billingPhone"
                        placeholder="Billing Phone"
                        className="w-1/3 border border-border rounded px-4 py-2 bg-background text-foreground"
                        value={form.billingPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
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
                    <div className="w-4 h-4 rounded-full border border-border peer-checked:border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-transparent has-[:checked]:border-red-500"></div>
                    </div>
                    Free Shipping (Estimate in 7/10 - 10/10/2025)
                    <span className="ml-auto">{formatPrice(0.00, currency)}</span>
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
                    <div className="w-4 h-4 rounded-full border border-border peer-checked:border-red-500  flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-transparent has-[:checked]:border-red-500"></div>
                    </div>
                    Express Shipping (Estimate in 4/10 - 5/10/2025){" "}
                    <span className="ml-auto">{formatPrice(16.00, currency)}</span>
                  </label>
                </div>
                <h3 className="font-semibold mt-6 mb-2">Payment</h3>
                <div className="space-y-2">
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
              <ShippingBar cartTotal={total}></ShippingBar>

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
                        {formatPrice(item.price ? item.price : 8, currency)} x{" "}
                        {item.quantity}
                      </div>
                      <div className="text-sm font-bold">
                        <span className="text-green-600 font-bold">
                          {formatPrice(
                            (item.price ? item.price : 8) * item.quantity,
                            currency
                          )}{" "}
                          x {item.quantity}
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
                  <span>Subtotal:</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Shipping:</span>
                  <span>{formatPrice(shippingCost, currency)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(grandTotal, currency)}</span>
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
