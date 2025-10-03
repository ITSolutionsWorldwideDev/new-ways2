"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

import { useCurrency } from "@/context/currencyContext";
import { formatPrice } from "@/lib/formatPrice";

import { useB2BStore } from "@/store/useB2BStore";
import { useSessionStore } from "@/store/useSessionStore";

type ProductRelatedProps = {
  product_id: number;
};

export default function RelatedProducts({ product_id }: ProductRelatedProps) {
  const { isB2BMode } = useB2BStore();
  const { user } = useSessionStore();

  // const showPrice = !isB2BMode || (isB2BMode && user);
  const showPrice = !isB2BMode || (isB2BMode && user && user.role === "b2b");
  const [items, setItems] = useState<any[]>([]);

  const { currency } = useCurrency();

  useEffect(() => {
    let ignore = false;
    async function fetchReviews() {
      const res = await fetch(`/api/related-products?product_id=${product_id}`);

      // Check for empty body
      const text = await res.text();
      if (!text) {
        console.warn("Empty response from related-products API");
        return;
      }

      if (!ignore) {
        const data = JSON.parse(text);
        setItems(data.items);
      }
    }

    fetchReviews();
    return () => {
      ignore = true; // cleanup flag
    };
  }, [product_id]);

  return (
    <>
      <div className="mt-12">
        <div className="font-semibold text-xl mb-4 text-foreground">
          Related Products
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={4} // Change to 3 or more if needed
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true, // 👈 Allows user to click dots
          // }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 4 },
          }}
        >
          {Array.isArray(items) &&
            items.map((product: any) => (
              <SwiperSlide key={product.id}>
                <div className="border border-border rounded-lg p-4 items-center text-center bg-background shadow justify-center  object-center">
                  <Link href={`/product/${product.itemid}`}>
                    <img
                      className="w-32 h-32 object-contain mb-2 m-auto"
                      src={product.image ?? "/dummy/img-product.png"}
                      alt={product.displayname}
                    />
                    <div className="font-semibold mb-1 text-foreground">
                      {product.displayname}
                    </div>
                    <div className="font-bold mb-1 text-foreground">
                      {showPrice ? (
                        <div className="text-green-600 font-bold mb-1">
                          {formatPrice(product.price, currency)}
                        </div>
                      ) : (
                        <div className="text-lime-500 mb-1 text-sm">
                          Login for price
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
