// app/[locale]/page.tsx
import {
  HeroSection,
  PartnersSection,
} from "@/components/sections/home/hero-section";
import { DealSection } from "@/components/sections/home/deal-section";
import { BundleSection } from "@/components/sections/home/bundle-section";
import { BundlePromoSection } from "@/components/sections/home/bundle-promo-section";
import { FAQSection } from "@/components/sections/home/faq-section";
import { AboutStatsSection } from "@/components/sections/home/about-stats-section";
import OurCollectionSection from "@/components/sections/home/our-collection-section";
import WholesaleDistributionSection from "@/components/sections/home/wholesale-distribution-section";
import InstagramSection from "@/components/sections/home/instagram-section";

// import type { Metadata } from "next";
// import { Product } from "@/types/product.types";
// import { Review } from "@/types/review.types";

export default async function HomePage(props: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(props.params);
  return (
    <main className="min-h-screen">
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

