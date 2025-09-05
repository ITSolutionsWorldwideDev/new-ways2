import { AuthLayout } from "@/components/layout/auth-layout";
import ForgotPasswordSection from "@/components/sections/auth/forgot-password/forgot-password-section";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordSection />
    </AuthLayout>
  );
}
