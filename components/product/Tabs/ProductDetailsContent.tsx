import React from "react";
import ProductDetails from "./ProductDetails";

type ProductDetailsProps = {
  description: string;
};

const ProductDetailsContent = ({ description }: ProductDetailsProps) => {
  return (
    // border border-border rounded-lg p-6 bg-background w-full
    <div className="">
      <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Product specifications
      </h3>
      {description}
      {/* <ProductDetails /> */}
    </div>
  );
};

export default ProductDetailsContent;
