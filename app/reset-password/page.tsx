// app/reset-password/page.tsx
// import { AuthLayout } from "@/components/layout/auth-layout";
import ResetPasswordSection from "@/components/sections/auth/reset-password/reset-password-section";

export default function ResetPasswordPage() {
  return (
    <>
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        <div className="w-full max-w-6xl">
          <ResetPasswordSection />
        </div>
      </div>
    </>
  );
}

/* 
    <AuthLayout>
      <ResetPasswordSection />
    </AuthLayout> */
