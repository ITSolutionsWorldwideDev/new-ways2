import { AuthLayout } from "@/components/layout/auth-layout"
import SignupSection from "@/components/sections/auth/signup/signup-section"
import type { Metadata } from "next"

/* export const metadata: Metadata = {
  title: "Sign Up - Balance Beam | Create Your Account",
  description:
    "Create a new account to get started with Balance Beam's expert bookkeeping and tax services. Quick and secure registration process.",
  keywords: "sign up, create account, register, bookkeeping account, tax services registration",
  openGraph: {
    title: "Sign Up - Balance Beam",
    description: "Create a new account to get started with Balance Beam",
    type: "website",
  },
} */

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupSection />
    </AuthLayout>
  )
}
