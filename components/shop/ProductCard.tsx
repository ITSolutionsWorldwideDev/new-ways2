import React from "react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  itemid?: string;
  title?: string;
  image?: string;
  priceRange?: [number, number];
  variants?: { label: string; value: string }[];
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  itemid,
  title,
  image = "/placeholder.png",
  priceRange = [8, 120],
  variants = [],
  inStock = true,
}) => (
  <div className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
    <div className="flex w-full justify-between items-center px-4 mb-4">
      <span className="bg-lemon text-black text-xs font-semibold px-3 py-1 rounded-full">
        {itemid}
      </span>
      <label className="flex items-center ml-4">
        <input type="checkbox" className="w-5 h-5 bg-lemon" />
      </label>
    </div>
    <Link href={`/product/${itemid}`} className="justify-between items-center">
      <img src={image} alt={title} className="w-32 h-32 object-contain mb-2 items-center mx-auto" />
      <h2 className="text-base font-semibold text-center mb-1">{title}</h2>
    </Link>

    {priceRange[0] !== 0 && priceRange[1] !== 0 ? (
      <div className="text-green-600 font-bold mb-1">
        € {priceRange[0].toFixed(2)} - € {priceRange[1].toFixed(2)}
      </div>
    ) : (
      <div className="text-gray-500 mb-1">Price not available</div>
    )}

    <button
      className="  bg-black text-white px-5 py-1 rounded-full font-semibold text-sm mt-1 disabled:opacity-50"
      disabled={!inStock}
    >
      {inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  </div>
);

export default ProductCard;
/* 

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
