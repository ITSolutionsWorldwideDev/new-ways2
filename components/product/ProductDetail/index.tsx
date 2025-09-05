import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
// import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
// import ColorSelection from "./ColorSelection";
// import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";

const ProductDetail = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="container mx-auto py-8 mt-[20px]">
        <div className="flex gap-8">
          <div className="w-1/2">
          <PhotoSection data={data} />
            {/* <div className="flex flex-row gap-4 items-start h-full w-full">
              <div className="flex flex-col gap-2">
                <button className="border rounded w-16 h-16 p-1 bg-background border-foreground">
                  <img
                    alt="Thumbnail 1"
                    className="object-contain w-full h-full"
                    src="/dummy/img-product.png"
                  />
                </button>
                <button className="border rounded w-16 h-16 p-1 bg-background border-border">
                  <img
                    alt="Thumbnail 2"
                    className="object-contain w-full h-full"
                    src="/dummy/img-product.png"
                  />
                </button>
                <button className="border rounded w-16 h-16 p-1 bg-background border-border">
                  <img
                    alt="Thumbnail 3"
                    className="object-contain w-full h-full"
                    src="/dummy/img-product.png"
                  />
                </button>
                <button className="border rounded w-16 h-16 p-1 bg-background border-border">
                  <img
                    alt="Thumbnail 4"
                    className="object-contain w-full h-full"
                    src="/dummy/img-product.png"
                  />
                </button>
                <div className="flex flex-col gap-2 mt-2">
                  <button className="px-2 py-1 border border-border rounded bg-background text-foreground">
                    ↑
                  </button>
                  <button className="px-2 py-1 border border-border rounded bg-background text-foreground">
                    ↓
                  </button>
                </div>
              </div>
              <div className="flex-1 h-[480px] border border-border rounded flex items-center justify-center bg-background min-w-0">
                <img
                  alt="Product image 1"
                  className="object-contain w-full h-full"
                  src="/dummy/img-product.png"
                />
              </div>
            </div> */}
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-muted px-2 py-1 rounded text-xs">
                {/* CS309-D18  --  */}{data?.itemid}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{data?.displayname}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-xs text-muted-foreground">(5 reviews)</span>
            </div>
            <div className="flex items-center mb-3 sm:mb-3.5">
              <Rating
                initialValue={data.rating}
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
              <span className="text-2xl font-bold text-foreground">$60.00</span>
              <span className="line-through text-muted-foreground text-lg">
                $80.00
              </span>
              <span className="bg-foreground text-background px-2 py-1 rounded text-xs">
                20% OFF
              </span>
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
              <button className="border border-border px-2 py-1 rounded bg-background text-foreground">
                -
              </button>
              <span>1</span>
              <button className="border border-border px-2 py-1 rounded bg-background text-foreground">
                +
              </button>
            </div>
            <div className="flex gap-4 mb-4">
              <button className="bg-muted text-foreground px-4 py-2 rounded border border-border">
                Add to cart
              </button>
              <button className="bg-foreground text-background px-4 py-2 rounded">
                Buy it now
              </button>
            </div>
            <div className="flex gap-4 text-sm mb-4">
              <button className="underline text-muted-foreground">
                Ask a question
              </button>
              <button className="underline text-muted-foreground">Share</button>
            </div>
            <div className="border border-border rounded-lg p-4 mb-4 bg-background">
              <div className="font-semibold mb-2 text-foreground">
                Buy more, Save more!
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="bulk" />
                  Buy from 3 to 5 items for 10% OFF
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">
                    FREE SHIPPING
                  </span>
                  <span className="text-xs text-muted-foreground">$250.00</span>
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="bulk" />
                  Buy from 6 to 8 items for 15% OFF
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">
                    FREE SHIPPING
                  </span>
                  <span className="text-xs text-muted-foreground">$250.00</span>
                  <span className="bg-foreground text-background px-2 py-1 rounded text-xs">
                    Most Popular
                  </span>
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="bulk" />
                  Buy from 10+ items for 20% OFF
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">
                    FREE SHIPPING
                  </span>
                  <span className="text-xs text-muted-foreground">$250.00</span>
                  <span className="bg-muted text-foreground px-2 py-1 rounded text-xs">
                    Best Value
                  </span>
                </label>
              </div>
              <button className="mt-4 w-full bg-foreground text-background py-2 rounded">
                Grab this deal
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-border rounded-lg p-6 bg-background">
            <div className="font-semibold mb-4 text-foreground">
              Frequently Bought Together
            </div>
            <div className="flex gap-4 items-center mb-4">
              <img
                className="w-20 h-20 object-contain"
                src="/dummy/img-product.png"
              />
              <span className="text-2xl font-bold text-foreground">+</span>
              <img
                className="w-20 h-20 object-contain"
                src="/dummy/img-product.png"
              />
              <span className="text-2xl font-bold text-foreground">+</span>
              <img
                className="w-20 h-20 object-contain"
                src="/dummy/img-product.png"
              />
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
            <button className="w-full bg-foreground text-background py-2 rounded">
              Add selected to Cart
            </button>
          </div>
          <div className="border border-border rounded-lg p-6 bg-background">
            <div className="font-semibold mb-4 text-foreground">
              Customer review
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="text-xs text-muted-foreground">(23)</span>
              <span className="ml-2 text-foreground">4.5/5.0</span>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs">
                <span>5★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded w-[80%]"></span>
                </span>
                <span>10</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>4★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded w-[50%]"></span>
                </span>
                <span>5</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>3★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded  w-[30%]"></span>
                </span>
                <span>3</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>2★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded  w-[10%]"></span>
                </span>
                <span>3</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>1★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded  w-[10%]"></span>
                </span>
                <span>3</span>
              </div>
            </div>
            <button className="bg-foreground text-background px-4 py-2 rounded mb-4">
              Write a review
            </button>
            <div className="mb-4">
              <div className="mb-2 font-semibold text-foreground">
                Emily R.
                <span className="text-xs text-muted-foreground ml-2">
                  Mar 3rd, 2025
                </span>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Great seller, everything was as expected even threw in a free
                gift, which was a nice touch already reordered
              </div>
              <div className="mb-2 font-semibold text-foreground">
                James L.
                <span className="text-xs text-muted-foreground ml-2">
                  Mar 3rd, 2025
                </span>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Great seller, everything was as expected even threw in a free
                gift, which was a nice touch already reordered
              </div>
              <div className="mb-2 font-semibold text-foreground">
                Sophia M.
                <span className="text-xs text-muted-foreground ml-2">
                  Mar 3rd, 2025
                </span>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Great seller, everything was as expected even threw in a free
                gift, which was a nice touch already reordered
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-2 text-foreground">
                Write a review
              </div>
              <form className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <span className="text-foreground">Your rating</span>
                  <span className="text-yellow-500">☆☆☆☆☆</span>
                </div>
                <input
                  placeholder="Name *"
                  className="border border-border rounded px-2 py-1 bg-background text-foreground"
                  type="text"
                />
                <input
                  placeholder="Email *"
                  className="border border-border rounded px-2 py-1 bg-background text-foreground"
                  type="email"
                />
                <textarea
                  placeholder="Your review *"
                  className="border border-border rounded px-2 py-1 bg-background text-foreground"
                ></textarea>
                <label className="flex items-center gap-2 text-xs text-foreground">
                  <input type="checkbox" /> Save my name, email, and website in
                  this browser for the next time I comment.
                </label>
                <button className="bg-foreground text-background px-4 py-2 rounded mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
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
