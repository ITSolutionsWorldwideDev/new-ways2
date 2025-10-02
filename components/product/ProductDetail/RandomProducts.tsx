// components/product/ProductDetail/RandomProducts.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

import { useCurrency } from "@/context/currencyContext";
import { formatPrice } from "@/lib/formatPrice";

export default function RandomProducts() {
  const [items, setItems] = useState<any[]>([]);

  const { currency } = useCurrency();

  useEffect(() => {
    let ignore = false;
    async function fetchReviews() {
      const res = await fetch(`/api/random-products`);

      // Check for empty body
      const text = await res.text();
      if (!text) {
        console.warn("Empty response from random-products API");
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
  }, []); 

  return (
    <>
      <div className="mt-12">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={4} // Change to 3 or more if needed
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
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
                      {formatPrice(product.price, currency)}
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
