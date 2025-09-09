import {
  HeroSection,
  PartnersSection,
} from "@/components/sections/home/hero-section";
import { DealSection } from "@/components/sections/home/deal-section";
import { BundleSection } from "@/components/sections/home/bundle-section";
import { BundlePromoSection } from "@/components/sections/home/bundle-promo-section";
import { FAQSection } from "@/components/sections/home/faq-section";
import { AboutStatsSection } from "@/components/sections/home/about-stats-section";
import type { Metadata } from "next";
import OurCollectionSection from "@/components/sections/home/our-collection-section";
import WholesaleDistributionSection from "@/components/sections/home/wholesale-distribution-section";
import InstagramSection from "@/components/sections/home/instagram-section";

import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

/* export const metadata: Metadata = {
  displayname: "Your Brand - Premium Products",
  description:
    "Discover our premium collection of products. Quality and style combined.",
  keywords: "premium products, brand, quality, style, collection",
  openGraph: {
    displayname: "Your Brand - Premium Products",
    description: "Discover our premium collection of products",
    type: "website",
  },
}; */
/* 
export const newArrivalsData: Product[] = [
  {
    id: 1,
    displayname: "T-shirt with Tape Details",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 120,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 2,
    displayname: "Skinny Fit Jeans",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    price: 260,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
  },
  {
    id: 3,
    displayname: "Chechered Shirt",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic3.png",
    gallery: ["/images/pic3.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 4,
    displayname: "Sleeve Striped T-shirt",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    displayname: "Vertical Striped Shirt",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic5.png",
    gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
    price: 232,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
  },
  {
    id: 6,
    displayname: "Courage Graphic T-shirt",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic6.png",
    gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
  },
  {
    id: 7,
    displayname: "Loose Fit Bermuda Shorts",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic7.png",
    gallery: ["/images/pic7.png"],
    price: 80,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.0,
  },
  {
    id: 8,
    displayname: "Faded Skinny Jeans",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic8.png",
    gallery: ["/images/pic8.png"],
    price: 210,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    displayname: "Polo with Contrast Trims",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic12.png",
    gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"],
    price: 242,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.0,
  },
  {
    id: 13,
    displayname: "Gradient Graphic T-shirt",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic13.png",
    gallery: ["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.5,
  },
  {
    id: 14,
    displayname: "Polo with Tipping Details",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic14.png",
    gallery: ["/images/pic14.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 15,
    displayname: "Black Striped T-shirt",
    itemid:"",
    purchasedescription:"",
    srcUrl: "/images/pic15.png",
    gallery: ["/images/pic15.png"],
    price: 150,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 5.0,
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."`,
    rating: 5,
    date: "August 19, 2023",
  },
]; */

export default function HomePage() {
  return (
    <main className="min-h-screen">{/*  pt-[120px] */}
      <HeroSection />
      {/* <PartnersSection /> */}
      <DealSection />
      <BundleSection />
      <BundlePromoSection
        title="G-ROLLZ BLUNTS BUNDLE"
        description={`Elevate your shop with a curated selection of our best-selling blunts. This convenient box\nfeatures our fastest-moving products from each category. Classic favorites, terpene-infused blunts, and botanical blunts.\nOrder now and enhance your catalog with just one click.\nView full details`}
        buttonText="EXPLORE CATEGORY"
        image="/home/blunt-bundle.png"
      />
      <BundlePromoSection
        reverse
        title="G-ROLLZ PAPERS BUNDLE"
        description={`Discover our top-selling papers in one exclusive bundle. Includes a variety of sizes and flavors to suit every preference.\nPerfect for shops looking to offer the best selection to their customers.\nOrder now and stock up with ease.\nView full details`}
        buttonText="EXPLORE CATEGORY"
        image="/home/blunt-bundle.png"
      />
      <AboutStatsSection />
      <OurCollectionSection />
      <WholesaleDistributionSection />
      <InstagramSection />
      <FAQSection />
    </main>
  );
}
