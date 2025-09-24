// import LoginSection from "@/components/sections/auth/login/login-section";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";
// import type { Metadata } from "next";

export default function SigninPage() {
  return (
    <>
      <ShopBanner {...commonData.accountbanner} />
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        {/* <div className="w-full max-w-6xl"> */}
          <div className="w-full flex flex-col md:flex-row gap-12">
            <div className="flex-1 bg-background rounded-lg p-8 border border-border text-foreground">

            </div>
          </div>

          <div className="flex-1 bg-background rounded-lg p-8 border border-border text-foreground"></div>
          {/* <LoginSection /> */}
        {/* </div> */}
      </div>
    </>
  );
}
