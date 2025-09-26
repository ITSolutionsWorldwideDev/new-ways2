"use client";

import React from "react";
// import { FaTruck } from 'react-icons/fa'
import { RiTruckLine } from "react-icons/ri";

type ShippingBarProps = {
  cartTotal: number;
  freeShippingThreshold?: number;
};

const ShippingBar = ({
  cartTotal,
  freeShippingThreshold = 100,
}: ShippingBarProps) => {
  const percent = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remaining = freeShippingThreshold - cartTotal;

  return (
    <div className="mb-8">
      <div className="text-center text-lg font-semibold mb-2">
        {cartTotal >= freeShippingThreshold ? (
          <>
            <span className="text-green-600">🎉 Free Shipping unlocked!</span>
          </>
        ) : (
          <>
            Spend ${remaining.toFixed(2)} more to get{" "}
            <span className="text-green-600">Free Shipping</span>
          </>
        )}
      </div>

      <div className="relative h-3 bg-muted rounded-full mx-auto max-w-xl">
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-3 bg-lemon rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>

        {/* Truck icon */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
          style={{ left: `calc(${percent}% + 0%)` }} // optional offset
        >
          {/* Truck Icon */}
          <RiTruckLine
            className="absolute top-[-12px] text-xl  transition-all duration-300 bg-lemon rounded-full border border-border p-1"
            style={{ left: `calc(${percent}% - 10px)` }}
          />
          {/* <svg
            className="h-5 w-5 bg-background rounded-full border border-border p-1 text-gray-700"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 6h15l-1.5 9h-13z" />
          </svg> */}
        </div>
      </div>
    </div>
  );
};

export default ShippingBar;
