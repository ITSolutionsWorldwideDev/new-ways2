"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

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
  price=8,
  variants = [],
  inStock = true,
  selCheckbox = false,
  isSelected = false,
  onSelectChange = () => {},
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const addToCart = useCartStore((state) => state.addToCart);

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
    <div className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
      <div className="flex w-full justify-between items-center px-4 mb-4">
        <span className="bg-lemon text-black text-xs font-semibold px-3 py-1 rounded-full">
          {itemid}
        </span>
        {selCheckbox && (
          <label className="flex items-center ml-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelectChange(e.target.checked)}
              className="w-5 h-5 bg-lemon"
            />
          </label>
        )}
      </div>
      <Link
        href={`/product/${itemid}`}
        className="justify-between items-center"
      >
        <img
          src={image}
          alt={title}
          className="w-32 h-32 object-contain mb-2 items-center mx-auto"
        />
        <h2 className="text-base font-semibold text-center mb-1">{title}</h2>
      </Link>

      {/* {priceRange[0] !== 0 && priceRange[1] !== 0 ? (
        <div className="text-green-600 font-bold mb-1">
          € {priceRange[0].toFixed(2)} - € {priceRange[1].toFixed(2)}
        </div>
      ) : (
        <div className="text-gray-500 mb-1">Price not available</div>
      )} */}

      {price !== 0 ? (
        <div className="text-green-600 font-bold mb-1">
          € {price.toFixed(2)}
        </div>
      ) : (
        <div className="text-gray-500 mb-1">Price not available</div>
      )}

      <div className="cart-actions">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="add-to-cart-btn"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>

        {inStock && addedToCart && (
          <div className="quantity-control flex items-center gap-2 justify-center">
            <button
              className="border border-border rounded-full w-7 h-7 flex items-center justify-center bg-background text-foreground text-base"
              onClick={decreaseQty}
            >
              -
            </button>
            <span className="w-7 text-center font-semibold">
              {String(quantity).padStart(2, "0")}
            </span>
            <button
              className="border border-border rounded-full w-7 h-7 flex items-center justify-center bg-background text-foreground text-base"
              onClick={increaseQty}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
/* 


     <div className="cart-actions">
        <button
          className="  bg-black text-white px-5 py-1 rounded-full font-semibold text-sm mt-1 disabled:opacity-50"
          disabled={!inStock}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>

        // inStock && 

        {addedToCart && (
          <div className="quantity-control">
            <button onClick={decreaseQty}>-</button>
            <span>{String(quantity).padStart(2, "0")}</span>
            <button onClick={increaseQty}>+</button>
          </div>
        )}
      </div>
bg-black text-white px-4 py-1 rounded w-full disabled:opacity-50  


<div className="text-green-600 font-bold mb-1">
      € {priceRange[0].toFixed(2)} – € {priceRange[1].toFixed(2)}
    </div>
    <select className="border rounded px-2 py-1 mb-2 w-full">
      {variants.map((v) => (
        <option key={v.value}>{v.label}</option>
      ))}
    </select>
*/

/* {variants.length > 0 && (
      <select className="border rounded px-2 py-1 mb-2 w-full">
        {variants.map((v) => (
          <option key={v.value}>{v.label}</option>
        ))}
      </select>
    )} */
