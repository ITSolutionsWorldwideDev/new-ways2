import React, { use, useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
// import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleQuestion,
  Share2,
  Flame,
} from "lucide-react";

// import ColorSelection from "./ColorSelection";
// import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";
import Tabs from "@/components/product/Tabs";

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
  /* const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }; */

  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState(0);

  const [selectedDealIndex, setSelectedDealIndex] = useState<number | null>(
    null
  );

  const updateSelectedDeal = (qty: number) => {
    const matchedIndex = bulkDeals.findIndex(
      (deal) => qty >= deal.minQty && qty <= deal.maxQty
    );
    setSelectedDealIndex(matchedIndex !== -1 ? matchedIndex : null);
  };

  // const increaseQty = () => setQuantity((q) => q + 1);
  // const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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

  const images = [data.srcUrl, ...(data.gallery ?? [])];

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: String(data.id),
      itemid: data.itemid,
      title: data.displayname,
      image: data.srcUrl,
      priceRange: calculateFinalPrice(),
      price: calculateFinalPrice(),
      // priceRange: [calculateFinalPrice(), calculateFinalPrice()],
      quantity,
    });
    setAddedToCart(true);
  };

  /* const calculateFinalPrice = () => {
    if (data.discount?.type === "percentage") {
      return data.price - (data.discount.value / 100) * data.price;
    } else if (data.discount?.type === "fixed") {
      return data.price - data.discount.value;
    }
    return data.price;
  }; */

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

    return Math.round(finalPrice * 100) / 100; // rounded to 2 decimals
  };

  const finalPrice = calculateFinalPrice();

  const handleDealSelect = (index: number) => {
    setSelectedDealIndex(index);
    const deal = bulkDeals[index];
    setQuantity(deal.minQty); // auto-set min qty of selected deal
  };

  const handleGrabDeal = () => {
    if (selectedDealIndex === null) return;

    const deal = bulkDeals[selectedDealIndex];

    addToCart({
      id: String(data.id),
      itemid: data.itemid,
      title: data.displayname,
      image: data.srcUrl,
      priceRange: calculateFinalPrice(),
      price: calculateFinalPrice(),
      quantity: quantity, // already updated from deal
    });

    setAddedToCart(true);
  };

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
            {/* <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-xs text-muted-foreground">(5 reviews)</span>
            </div> */}
            <div className="flex items-center mb-3 sm:mb-3.5">
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
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-bold text-foreground">
                ${calculateFinalPrice()}
              </span>

              {data.discount && (
                <>
                  <span className="line-through text-gray-400 text-lg ml-2">
                    ${data.price.toFixed(2)}
                  </span>
                  <span className="bg-green-500 text-white px-2 py-1 ml-2 rounded text-xs">
                    {data.discount.type === "percentage"
                      ? `${data.discount.value}% OFF`
                      : `$${data.discount.value} OFF`}
                  </span>
                </>
              )}
              {/* <span className="line-through text-muted-foreground text-lg">
                $80.00
              </span>
              <span className="bg-foreground text-background px-2 py-1 rounded text-xs">
                20% OFF
              </span> */}
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

          {/* <p className="mt-6 text-gray-700">{data.purchasedescription}</p> */}
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

              {/* <div className="flex flex-col gap-2">
                <div className="border border-border rounded-lg p-4 mb-4 bg-background">
                  <label className="flex items-center gap-2 text-foreground">
                    <input type="radio" name="bulk" />
                    <span>
                      Buy from 3 to 5 items for 10% OFF
                      <br />
                      <span className="font-normal text-[12px] align-middle ">
                        You save $10
                      </span>
                    </span>
                    <span className="border border-green-400 text-green-400 px-2 py-1 rounded text-xs">
                      FREE SHIPPING
                    </span>
                    <span className="text-xs text-muted-foreground">
                      $250.00
                    </span>
                    <span className="line-through text-muted-foreground text-xs">
                      $260.00
                    </span>
                  </label>
                </div>
                <div className="border border-border rounded-lg p-4 mb-4 bg-background">
                  <label className="flex items-center gap-2 text-foreground">
                    <input type="radio" name="bulk" />
                    <span>
                      Buy from 6 to 8 items for 15% OFF
                      <br />
                      <span className="font-normal text-[12px] align-middle ">
                        You save $30
                      </span>
                    </span>
                    <span className="border border-green-400 text-green-400 px-2 py-1 rounded text-xs">
                      FREE SHIPPING
                    </span>
                    <span className="text-xs text-muted-foreground">
                      $250.00
                    </span>
                    <span className="line-through text-muted-foreground text-xs">
                      $260.00
                    </span>
                    <span className="inline-flex bg-foreground text-background px-2 py-1 text-xs rotate-[5.97deg] opacity-100 rounded-[4px]">
                      <Flame size={16} color="currentColor" />
                      Most Popular
                    </span>
                  </label>
                </div>
                <div className="border border-border rounded-lg p-4 mb-4 bg-background">
                  <label className="flex items-center gap-2 text-foreground">
                    <input type="radio" name="bulk" />
                    <span>
                      Buy from 10+ items for 20% OFF
                      <br />
                      <span className="font-normal text-[12px] align-middle ">
                        You save $40
                      </span>
                    </span>
                    <span className="border border-green-400 text-green-400  px-2 py-1 rounded text-xs">
                      FREE SHIPPING
                    </span>
                    <span className="text-xs text-muted-foreground">
                      $250.00
                    </span>
                    <span className="line-through text-muted-foreground text-xs">
                      $260.00
                    </span>
                    <span className="bg-muted text-foreground px-2 py-1 text-xs rotate-[5.97deg] opacity-100 rounded-[4px]">
                      Best Value
                    </span>
                  </label>
                </div>
              </div>
              <button className="mt-4 w-full bg-foreground text-background py-2 rounded-[99px]">
                Grab this deal
              </button> */}

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
                        // onChange={() => handleDealSelect(index)}
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
                        {/* $260.00 */}
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
                  Grab this deal
                </button>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          // description={data.purchasedescription}
          id={data.id}
          description={data.description}
          rating={data.rating}
          reviewData={{}}
        />
        <div className="mt-12">
          <div className="font-semibold text-xl mb-4 text-foreground">
            Related Products
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border border-border rounded-lg p-4 flex flex-col items-center bg-background shadow">
              <img
                alt="Related Product"
                className="w-32 h-32 object-contain mb-2"
                src="/dummy/img-product.png"
              />
              <div className="text-center font-semibold mb-1 text-foreground">
                'Rap' Organic Green Hemp - 3 KS Cones
              </div>
              <div className="font-bold mb-1 text-foreground">$60.00</div>
            </div>
            <div className="border border-border rounded-lg p-4 flex flex-col items-center bg-background shadow">
              <img
                alt="Related Product"
                className="w-32 h-32 object-contain mb-2"
                src="/dummy/img-product.png"
              />
              <div className="text-center font-semibold mb-1 text-foreground">
                'Rap' Organic Green Hemp - 3 KS Cones
              </div>
              <div className="font-bold mb-1 text-foreground">$70.00</div>
            </div>
            <div className="border border-border rounded-lg p-4 flex flex-col items-center bg-background shadow">
              <img
                alt="Related Product"
                className="w-32 h-32 object-contain mb-2"
                src="/dummy/img-product.png"
              />
              <div className="text-center font-semibold mb-1 text-foreground">
                'Rap' Organic Green Hemp - 3 KS Cones
              </div>
              <div className="font-bold mb-1 text-foreground">$80.00</div>
            </div>
            <div className="border border-border rounded-lg p-4 flex flex-col items-center bg-background shadow">
              <img
                alt="Related Product"
                className="w-32 h-32 object-contain mb-2"
                src="/dummy/img-product.png"
              />
              <div className="text-center font-semibold mb-1 text-foreground">
                'Rap' Organic Green Hemp - 3 KS Cones
              </div>
              <div className="font-bold mb-1 text-foreground">$90.00</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* const ProductDetail = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <h1
            className="text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize"
          >
            {data?.displayname}
          </h1>
          <div className="flex items-center mb-3 sm:mb-3.5">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-50"
              size={25}
              readonly
            />
            <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
              {data.rating?.toFixed(1)}
              <span className="">/5</span>
            </span>
          </div>
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            {data.discount?.percentage > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${Math.round(
                  data.price - (data.price * ((data.discount?.percentage)?data.discount?.percentage:0)) / 100
                )}`}
              </span>
            ) : data.discount?.amount > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${data.price - ((data.discount?.amount)?data.discount?.amount:0)}`}
              </span>
            ) : (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount?.percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount?.amount > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount?.percentage > 0 ? (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount?.percentage}%`}
              </span>
            ) : (
              data.discount?.amount > 0 && (
                <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-$${data.discount?.amount}`}
                </span>
              )
            )}
          </div>
          <p className="text-sm sm:text-base mb-5">
            {data.purchasedescription}
          </p>
          <hr className="h-[1px] border-t-black/10 mb-5" />
  
          <hr className="h-[1px] border-t-black/10 my-5" />

          <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
          <AddToCardSection data={data} />
        </div>
      </div>
    </>
  );
}; */

export default ProductDetail;
