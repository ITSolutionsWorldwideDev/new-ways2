// app/forgot-password/page.tsx
// import { AuthLayout } from "@/components/layout/auth-layout";
import ForgotPasswordSection from "@/components/sections/auth/forgot-password/forgot-password-section";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        <div className="w-full max-w-6xl">
          <ForgotPasswordSection />
        </div>
      </div>
    </>
  );
}

/* 
    <AuthLayout>
      <ForgotPasswordSection />
    </AuthLayout> */


