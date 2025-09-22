"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Review {
  name: string;
  rating: number;
  review: string;
  date: string;
}

type ProductReviewsProps = {
  product_id: number;
};

const RelatedProducts = ({ product_id }: ProductReviewsProps) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let ignore = false;
    async function fetchReviews() {
      const res = await fetch(`/api/related-products?product_id=${product_id}`);

      if (!res.ok) {
        console.error("Failed to fetch related-products");
      }

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
                  <img
                    className="w-32 h-32 object-contain mb-2 m-auto"
                    src={product.image ?? "/dummy/img-product.png"}
                    alt={product.displayname}
                  />
                  <div className="font-semibold mb-1 text-foreground">
                    {product.displayname}
                  </div>
                  <div className="font-bold mb-1 text-foreground">
                    ${product.price}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default RelatedProducts;

/* {Array.isArray(items) &&
    items.map((product: any) => (
    <div className="border border-border rounded-lg p-4 flex flex-col items-center bg-background shadow" key={product.id || product.itemid}>
        <img
        className="w-32 h-32 object-contain mb-2"
        src={product.image ?? "/dummy/img-product.png"}
        alt={product.displayname}
        />
        <div className="text-center font-semibold mb-1 text-foreground">
        {product.displayname}
        </div>
        <div className="font-bold mb-1 text-foreground">
        ${product.price}
        </div>
    </div>
    ))} */
