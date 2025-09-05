// /app/checkout/page.tsx
"use client";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();

  const handleCheckout = async () => {
    // Call backend API for payment processing
    alert("Redirecting to payment...");
    clearCart();
  };
  return (
    <>
      <ShopBanner {...commonData.checkoutbanner} />
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        <div className="flex-1 max-w-[600px] bg-background rounded-lg shadow p-8 border border-border text-foreground">
          <h2 className="text-xl font-bold mb-6">Checkout</h2>
          <form className="space-y-6">
            <div className="flex gap-4">
              <input
                placeholder="First name"
                className="border border-border rounded px-4 py-2 w-1/2 bg-background text-foreground"
                type="text"
              />
              <input
                placeholder="Last name"
                className="border border-border rounded px-4 py-2 w-1/2 bg-background text-foreground"
                type="text"
              />
            </div>
            <input
              placeholder="Country"
              className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
              type="text"
            />
            <input
              placeholder="Address"
              className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
              type="text"
            />
            <div className="flex gap-4">
              <input
                placeholder="City"
                className="border border-border rounded px-4 py-2 w-1/3 bg-background text-foreground"
                type="text"
              />
              <input
                placeholder="ZIP code"
                className="border border-border rounded px-4 py-2 w-1/3 bg-background text-foreground"
                type="text"
              />
              <input
                placeholder="Phone number"
                className="border border-border rounded px-4 py-2 w-1/3 bg-background text-foreground"
                type="text"
              />
            </div>
            <h3 className="font-semibold mt-6 mb-2">Contact Information</h3>
            <input
              placeholder="Email or phone number"
              className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
              type="text"
            />
            <h3 className="font-semibold mt-6 mb-2">Shipping Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 border border-border rounded px-4 py-2 bg-background text-foreground">
                <input type="radio" name="shipping" />
                Free Shipping (Estimate in 7/10 - 10/10/2025)
                <span className="ml-auto">$0.00</span>
              </label>
              <label className="flex items-center gap-2 border border-border rounded px-4 py-2 bg-background text-foreground">
                <input type="radio" name="shipping" />
                Express Shipping (Estimate in 4/10 - 5/10/2025){" "}
                <span className="ml-auto">$16.00</span>
              </label>
            </div>
            <h3 className="font-semibold mt-6 mb-2">Payment</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                Credit Card
                <img
                  alt="Visa"
                  className="h-5 ml-2"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                />
              </label>
              <div className="flex gap-4">
                <input
                  placeholder="Card number"
                  className="border border-border rounded px-4 py-2 w-1/2 bg-background text-foreground"
                  type="text"
                />
                <input
                  placeholder="Expiration date (MM/YY)"
                  className="border border-border rounded px-4 py-2 w-1/4 bg-background text-foreground"
                  type="text"
                />
                <input
                  placeholder="Security code"
                  className="border border-border rounded px-4 py-2 w-1/4 bg-background text-foreground"
                  type="text"
                />
              </div>
              <input
                placeholder="Name on card"
                className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                type="text"
              />
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" />
                Use shipping address as billing address
              </label>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
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
          <div className="flex items-center gap-2 mb-4">
            <img
              alt="'Rap' Organic Green Hemp - 3 KS Cones"
              className="w-16 h-16 object-contain"
              src="/dummy/img-product.png"
            />
            <div className="flex-1">
              <div className="font-semibold">
                'Rap' Organic Green Hemp - 3 KS Cones
              </div>
              <div className="text-sm">$8.00 x 5</div>
              <div className="text-sm font-bold">$40.00</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <img
              alt="'Rap' Organic Green Hemp - 3 KS Cones"
              className="w-16 h-16 object-contain"
              src="/dummy/img-product.png"
            />
            <div className="flex-1">
              <div className="font-semibold">
                'Rap' Organic Green Hemp - 3 KS Cones
              </div>
              <div className="text-sm">$60.00 x 1</div>
              <div className="text-sm font-bold">$60.00</div>
            </div>
          </div>
          <textarea
            className="w-full border border-border rounded px-3 py-2 text-sm mb-4 bg-background text-foreground"
            placeholder="Add a Note......"
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
          <button className="w-full bg-foreground text-background py-2 rounded-full text-base font-semibold">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

/* return (
  <div className="p-8">
    <h1 className="text-2xl mb-4">Checkout</h1>
    {items.map((item) => (
      <div key={item.id} className="flex justify-between border-b py-2">
        <span>{item.name} (x{item.quantity})</span>
        <span>${item.price * item.quantity}</span>
      </div>
    ))}
    <h2 className="text-xl mt-4">Total: ${total()}</h2>

    <form className="mt-4 grid gap-2">
      <input className="border p-2" placeholder="Full Name" />
      <input className="border p-2" placeholder="Address" />
      <input className="border p-2" placeholder="Email" />
      <button
        type="button"
        onClick={handleCheckout}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </form>
  </div>
);
}
*/
