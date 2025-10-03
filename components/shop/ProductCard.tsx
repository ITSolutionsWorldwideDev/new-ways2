// components/shop/ProductCard.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useCurrency } from "@/context/currencyContext";
import { formatPrice } from "@/lib/formatPrice";

import { useB2BStore } from "@/store/useB2BStore";
import { useSessionStore } from "@/store/useSessionStore";

interface ProductCardProps {
  id: string;
  itemid: string;
  title: string;
  image?: string;
  // priceRange?: [number, number];
  priceRange?: number;
  price?: number;
  variants?: { label: string; value: string }[];
  inStock?: boolean;
  selCheckbox?: boolean;
  isSelected: boolean;
  onSelectChange: (checked: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  itemid,
  title,
  image = "/placeholder.png",
  // priceRange = [8, 120],
  priceRange = 8,
  price = 8,
  variants = [],
  inStock = true,
  selCheckbox = false,
  isSelected = false,
  onSelectChange = () => {},
}) => {
  const { isB2BMode } = useB2BStore();
  const { user } = useSessionStore();

  // const showPrice = !isB2BMode || (isB2BMode && user);
  const showPrice = !isB2BMode || (isB2BMode && user && user.role === "b2b");

  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const { currency } = useCurrency();
  const currencyPrice = formatPrice(price, currency);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      itemid,
      title,
      image,
      priceRange,
      price,
      quantity,
    });
    setAddedToCart(true);
  };

  return (
    <div className="border rounded-t-lg flex flex-col items-left shadow hover:shadow-lg transition bg-white">
      <div className="bg-[#F1F1F1] min-h-[300px]">
        <div className="flex w-full justify-between items-center px-2 pb-4 pt-4 ">
          <span className="bg-lemon text-black text-xs font-semibold px-3 py-1 rounded-full">
            {itemid}
          </span>
          {selCheckbox && (
            <label className="flex items-center ml-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelectChange(e.target.checked)}
                className="w-4 h-4 bg-white focus:ring-green-500 accent-white selection:ring-red"
              />
            </label>
          )}
        </div>

        {/* <input id="giftwrap" className="accent-lemon" type="checkbox" /> */}
        <img
          src={image}
          alt={title}
          className="w-64 h-64 object-contain mb-2 items-center mx-auto hover:scale-110 transition-all duration-500"
        />

        {showPrice ? (
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="add-to-cart-btn w-fit text-left border-black bg-black text-white ml-2 mb-4 rounded text-sm py-1 px-3 font-medium text-[12px]"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        ) : (
          <></>
        )}
      </div>

      <div className="bg-white w-full px-2 py-4 relative">
        <Link href={`/product/${itemid}`}>
          <h2 className="text-base mb-1 text-black font-medium align-middle capitalize">
            {title}
          </h2>
        </Link>

        <div className="flex justify-between bottom-0 ">
          {/* {price !== 0 ? ( */}

          {showPrice ? (
            <div className="text-green-600 font-bold mb-1">{currencyPrice}</div>
          ) : (
            <div className="text-lime-500 mb-1 text-sm">Login for price</div>
          )}

          {/* // ) : (wholesale
          //   <div className="text-gray-500 mb-1">Price not available</div>
          // )} */}

          {showPrice && inStock && (
            <div className="quantity-control flex items-center gap-2 justify-center rounded-full px-2 py-1 bg-[#F1F1F1]">
              <button
                className="rounded-full w-7 h-7 flex items-center justify-center  text-base"
                onClick={decreaseQty}
              >
                -
              </button>
              <span className="w-7 text-center font-semibold text-[12px]">
                {quantity}
              </span>
              <button
                className=" rounded-full w-7 h-7 flex items-center justify-center  text-base"
                onClick={increaseQty}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
