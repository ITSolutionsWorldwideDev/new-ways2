// app/login/page.tsx
import { AuthLayout } from "@/components/layout/auth-layout"
import LoginSection from "@/components/sections/auth/login/login-section"
import ShopBanner from "@/components/shop/ShopBanner"
import { commonData } from "@/lib/commonData"
import type { Metadata } from "next"

/* export const metadata: Metadata = {
  title: "Sign In - Balance Beam | Access Your Account",
  description:
    "Sign in to your Balance Beam account to access your bookkeeping and tax services dashboard. Secure login portal.",
  keywords: "sign in, login, access account, bookkeeping login, tax services portal",
  openGraph: {
    title: "Sign In - Balance Beam",
    description: "Sign in to your Balance Beam account",
    type: "website",
  },
} */

export default function SigninPage() {
  return (
    <>
      {/* <ShopBanner {...commonData.checkoutbanner} /> */}
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        <div className="w-full max-w-6xl">
          <LoginSection />          
        </div>
      </div>
    </>
    // <AuthLayout>
    // <LoginSection />
    // </AuthLayout>
  )
}
