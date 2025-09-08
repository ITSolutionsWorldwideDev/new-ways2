// /app/contact/page.tsx
"use client";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";

export default function TermsPage() {
  return (
    <>
      <ShopBanner {...commonData.termsbanner} />
      <div className="container mx-auto py-12 flex flex-col items-center">
        <div className="w-full max-w-6xl flex flex-col gap-12">
          <h2 className="font-semibold text-[40.52px] leading-[54px] tracking-[0.63px] text-center align-middle w-full">
            Terms of service
          </h2>
          <div className="font-normal text-[15.25px] leading-[28.8px] tracking-[0.6px]  text-center align-middle w-full">
            OVERVIEW This website is operated by The New Ways BV under its brand
            G-Rollz. Throughout the site, the terms “we”, “us” and “our” refer
            to G-Rollz, a brand of The New Ways BV. G-Rollz provides this
            website, including all information, tools and services available
            from this site to you, the user, conditioned upon your acceptance of
            all terms, conditions, policies and notices stated here.
          </div>
          <div className="font-normal text-[15.25px] leading-[28.8px] tracking-[0.6px]  text-center align-middle w-full">
            By visiting our site and/ or purchasing something from us, you
            engage in our “Service” and agree to be bound by the following terms
            and conditions (“Terms of Service”, “Terms”), including those
            additional terms and conditions and policies referenced herein
            and/or available by hyperlink. These Terms of Service apply to all
            users of the site, including without limitation users who are
            browsers, vendors, customers, merchants, and/ or contributors of
            content.
          </div>
        </div>
      </div>
    </>
  );
}
