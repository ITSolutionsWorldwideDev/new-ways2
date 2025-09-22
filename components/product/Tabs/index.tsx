"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ProductDetailsContent from "./ProductDetailsContent";
import ReviewsContent from "./ReviewsContent";
import ProductReviews from "@/components/product/ProductDetail/ProductReviews";
import { Product } from "@/types/product.types";

type TabBtn = {
  id: number;
  label: string;
};

/* const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: "Product Details",
  },
  {
    id: 2,
    label: "Rating & Reviews",
  },
  {
    id: 3,
    label: "FAQs",
  },
]; */

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: "Descriptions",
  },
  {
    id: 2,
    label: "Materials",
  },
  {
    id: 3,
    label: "Return Policy",
  },
  {
    id: 4,
    label: "Additional Information",
  },
  {
    id: 5,
    label: "Reviews",
  },
];

export type ProductTabData = {
  product_id: number;
  description: string;
  rating: number;
  reviewData: any;
};
const Tabs = ({ product_id, description, rating, reviewData }: ProductTabData) => {
  const [active, setActive] = useState<number>(1);

  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start mb-6 sm:mb-8 overflow-x-auto">
      <div className="flex flex-row sm:flex-col gap-2 sm:min-w-[200px] items-start">
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            type="button"
            className={cn([
              active === tab.id
                ? " border-b-2 font-medium"
                : "border-b font-normal",
              "p-5 sm:p-6 rounded-none flex-1",
            ])}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="mt-2 mb-2 border border-border rounded-lg p-6 w-full">
        {active === 1 && <ProductDetailsContent description={description} />}
        {active === 5 && <ProductReviews product_id={product_id}/>}
        {/*  rating={rating} review={reviewData}  */}
      </div>
    </div>
  );
};

export default Tabs;

{
  /* {active === 1 && <ProductDetailsContent />}
        {active === 2 && <ReviewsContent />}
        {active === 3 && <FaqContent />} */
}
{
  /* {active === 2 && <ReviewsContent />} */
}
{
  /* {active === 3 && <FaqContent />}
        {active === 3 && <FaqContent />} */
}
