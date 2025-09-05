import { AuthLayout } from "@/components/layout/auth-layout";
import ResetPasswordSection from "@/components/sections/auth/reset-password/reset-password-section";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordSection />
    </AuthLayout>
  );
}
