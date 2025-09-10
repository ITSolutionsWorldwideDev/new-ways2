"use client";
import { DealCard } from "./deal-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"; // Add this line

const deals = [
  {
    id: 1,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 2,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 3,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 4,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 5,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 6,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 7,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 8,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 9,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
];

export const DealSection = () => {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4 md:px-2">
        <h2 className="text-white text-3xl font-bold mb-8">DEAL OF THE WEEK</h2>
        <div className="h-1 w-32 bg-lemon mb-8" />
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2} // Change to 3 or more if needed
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
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id}>
              <DealCard {...deal} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
