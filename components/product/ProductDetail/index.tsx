"use client";
import React, { use, useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import Rating from "@/components/ui/Rating";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleQuestion,
  Share2,
  Flame,
} from "lucide-react";

import Tabs from "@/components/product/Tabs";
import RelatedProducts from "@/components/product/ProductDetail/RelatedProducts";

import { useCurrency } from "@/context/currencyContext";
import { formatPrice } from "@/lib/formatPrice";

const bulkDeals = [
  {
    label: "Buy from 3 to 5 items for 10% OFF",
    minQty: 3,
    maxQty: 5,
    discount: 0.1,
    savings: 10,
    Popularlabel: "",
    icon: false,
  },
  {
    label: "Buy from 6 to 8 items for 15% OFF",
    minQty: 6,
    maxQty: 8,
    discount: 0.15,
    savings: 30,
    Popularlabel: "Most Popular",
    icon: true,
  },
  {
    label: "Buy from 10+ items for 20% OFF",
    minQty: 10,
    maxQty: Infinity,
    discount: 0.2,
    savings: 40,
    Popularlabel: "Best Value",
    icon: false,
  },
];

const ProductDetail = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const [selectedDealIndex, setSelectedDealIndex] = useState<number | null>(
    null
  );

  const updateSelectedDeal = (qty: number) => {
    const matchedIndex = bulkDeals.findIndex(
      (deal) => qty >= deal.minQty && qty <= deal.maxQty
    );
    setSelectedDealIndex(matchedIndex !== -1 ? matchedIndex : null);
  };

  const increaseQty = () => {
    setQuantity((prev) => {
      const newQty = prev + 1;
      updateSelectedDeal(newQty);
      return newQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prev) => {
      const newQty = prev > 1 ? prev - 1 : 1;
      updateSelectedDeal(newQty);
      return newQty;
    });
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: String(data.product_id),
      itemid: data.itemid,
      title: data.displayname,
      image: data.srcUrl,
      priceRange: calculateFinalPrice(),
      price: calculateFinalPrice(),
      quantity,
    });
    setAddedToCart(true);
  };

  const calculateFinalPrice = () => {
    const basePrice = data.price;

    let finalPrice = basePrice;

    if (selectedDealIndex !== null) {
      const deal = bulkDeals[selectedDealIndex];
      finalPrice = basePrice * (1 - deal.discount);
    } else if (data.discount?.type === "percentage") {
      finalPrice = basePrice - (data.discount.value / 100) * basePrice;
    } else if (data.discount?.type === "fixed") {
      finalPrice = basePrice - data.discount.value;
    }

    return Math.round(finalPrice * 100) / 100;
  };

  const handleGrabDeal = () => {
    if (selectedDealIndex === null) return;

    const deal = bulkDeals[selectedDealIndex];

    addToCart({
      id: String(data.product_id),
      itemid: data.itemid,
      title: data.displayname,
      image: data.srcUrl,
      priceRange: calculateFinalPrice(),
      price: calculateFinalPrice(),
      quantity: quantity, // already updated from deal
    });

    setAddedToCart(true);
  };

  const { currency } = useCurrency();
  const mainPrice = formatPrice(data.price, currency);
  const currencyPrice = formatPrice(calculateFinalPrice(), currency);
  const discountPrice = data.discount?.value
    ? formatPrice(data.discount?.value, currency)
    : data.discount?.value;

  return (
    <>
      <div className="container mx-auto py-8 mt-[20px]">
        <div className="flex gap-8">
          <div className="w-1/2">
            <PhotoSection data={data} />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-muted px-2 py-1 rounded text-xs">
                {data?.itemid}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{data?.displayname}</h1>

            {/* <div className="flex items-center mb-3 sm:mb-3.5">
              <Rating
                initialValue={data?.rating}
                allowFraction
                SVGclassName="inline-block"
                emptyClassName="fill-gray-50"
                size={15}
                readonly
              />
              <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
                {data.rating?.toFixed(1)}
                <span className="">/5</span>
              </span>
            </div> */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-bold text-foreground">
                {currencyPrice}
              </span>

              {data.discount && (
                <>
                  <span className="line-through text-gray-400 text-lg ml-2">
                    {mainPrice}
                  </span>
                  <span className="bg-green-500 text-white px-2 py-1 ml-2 rounded text-xs">
                    {data.discount.type === "percentage"
                      ? `${data.discount.value}% OFF`
                      : `${discountPrice} OFF`}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 dark:text-green-400 font-semibold">
                In Stock
              </span>
              <span className="text-xs text-muted-foreground">
                3 sold in last 24 hours
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={decreaseQty}
                className="border border-border px-2 py-1 rounded bg-background text-foreground"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={increaseQty}
                className="border border-border px-2 py-1 rounded bg-background text-foreground"
              >
                +
              </button>
            </div>
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleAddToCart}
                className="bg-muted text-foreground px-4 py-2 rounded-[99px] border border-border w-1/2"
              >
                {addedToCart ? "Added!" : "Add to Cart"}
              </button>
              <button className="bg-foreground text-background px-4 py-2 rounded-[99px] w-1/2">
                Buy it now
              </button>
            </div>

            <div className="flex gap-4 text-sm mb-4">
              <button className="inline-flex text-muted-foreground">
                <MessageCircleQuestion size={16} color="currentColor" />
                &nbsp;&nbsp;Ask a question
              </button>
              <button className="inline-flex text-muted-foreground">
                <Share2 size={16} color="currentColor" />
                &nbsp;&nbsp;Share
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-border rounded-lg p-6 bg-background">
            <div className="mb-6 text-foreground text-center font-medium text-[24px] align-middle">
              Frequently Bought Together
            </div>
            <div className="grid grid-flow-col justify-items-center gap-4 items-center mb-4">
              <div className="flex flex-row align-middle content-center">
                <img
                  className="w-40 h-40 object-contain hover:scale-110 transition-all duration-500"
                  src="/dummy/img-product.png"
                />
                <span className="text-2xl font-bold text-foreground align-middle content-center">
                  +
                </span>
              </div>
              <div className="flex flex-row align-middle content-center">
                <img
                  className="w-40 h-40 object-contain hover:scale-110 transition-all duration-500"
                  src="/dummy/img-product.png"
                />
                <span className="text-2xl font-bold text-foreground align-middle content-center">
                  +
                </span>
              </div>
              <div className="flex flex-row align-middle content-center">
                <img
                  className="w-40 h-40 object-contain hover:scale-110 transition-all duration-500"
                  src="/dummy/img-product.png"
                />
              </div>
            </div>
            <ul className="mb-4">
              <li className="text-foreground">
                Single Breasted Blazer{" "}
                <span className="float-right">$130.00</span>
              </li>
              <li className="text-foreground">
                Single Breasted Blazer{" "}
                <span className="float-right">$130.00</span>
              </li>
              <li className="text-foreground">
                Single Breasted Blazer{" "}
                <span className="float-right">$130.00</span>
              </li>
            </ul>
            <div className="font-bold mb-4 text-foreground">
              Total Price: $240.00
            </div>
            <button className="w-full bg-foreground text-background py-2 rounded-[99px]">
              Add selected to Cart
            </button>
          </div>
          <div className="border border-border rounded-lg p-6 bg-background">
            <div className="mb-4 bg-background">
              <div className="mb-6 text-foreground text-center font-medium text-[24px] align-middle">
                Buy more, Save more!
              </div>

              <div className="flex flex-col gap-2">
                {bulkDeals.map((deal, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 mb-4 bg-background"
                  >
                    <label className="flex items-center gap-2 text-foreground">
                      <input
                        type="radio"
                        name="bulk"
                        checked={selectedDealIndex === index}
                        onChange={() => setSelectedDealIndex(index)}
                      />

                      <span>
                        {deal.label}
                        <br />
                        <span className="font-normal text-[12px] align-middle ">
                          You save ${deal.savings}
                        </span>
                      </span>
                      <span className="border border-green-400 text-green-400  px-2 py-1 rounded text-xs">
                        FREE SHIPPING
                      </span>

                      <span className="text-xs text-muted-foreground">
                        ${calculateFinalPrice().toFixed(2)}
                      </span>
                      <span className="line-through text-muted-foreground text-xs">
                        ${data.price}
                      </span>

                      {deal.Popularlabel && deal.icon && (
                        <span className="inline-flex bg-foreground text-background px-2 py-1 text-xs rotate-[5.97deg] opacity-100 rounded-[4px]">
                          <Flame size={16} color="currentColor" />
                          {deal.Popularlabel}
                        </span>
                      )}

                      {deal.Popularlabel && !deal.icon && (
                        <span className="bg-muted text-foreground px-2 py-1 text-xs rotate-[5.97deg] opacity-100 rounded-[4px]">
                          {deal.Popularlabel}
                        </span>
                      )}
                    </label>
                  </div>
                ))}

                <button
                  onClick={handleGrabDeal}
                  className="mt-4 w-full bg-foreground text-background py-2 rounded-[99px]"
                >
                  Grab this deal {data.product_id}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          product_id={data.product_id}
          description={data.description}
          rating={data.rating}
          reviewData={{}}
        />

        <RelatedProducts product_id={data.product_id} />
      </div>
    </>
  );
};

export default ProductDetail;
