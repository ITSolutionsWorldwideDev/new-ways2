"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React from "react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  /*  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  sizeSelection, colorSelection.name
 */
  return (
    <button
      type="button"
      className="bg-black text-white px-5 py-1 rounded-full font-semibold text-sm mt-1 disabled:opacity-50"
      onClick={() =>
        dispatch(
          addToCart({
            id: data.id,
            itemid: data.itemid,
            name: data.displayname,
            purchasedescription: data.purchasedescription,
            srcUrl: data.srcUrl,
            price: data.price,
            attributes: [],
            discount: data.discount,
            quantity: data.quantity,
          })
        )
      }
    >
      Add to Cart
    </button>
  );
};
/* bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all */
export default AddToCartBtn;
