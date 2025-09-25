// app/login/page.tsx

"use client";
import LoginSection from "@/components/sections/auth/login/login-section";
import { useUser } from "@/context/userContext";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninPage() {
  const { user, loadingUser } = useUser();
  const router = useRouter();

  // Inside component
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  /* useEffect(() => {
    if (!loadingUser && user) {
      router.replace("/");
    }
  }, [user, loadingUser]); */

  useEffect(() => {
    if (!loadingUser && user) {
      const redirectTo = searchParams.get("from") || "/";

      console.log('redirectTo === ',redirectTo);
      router.replace(redirectTo);
    }
  }, [user, loadingUser]);

  if (loadingUser) return null;

  return (
    <>
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        <div className="w-full max-w-6xl">
          <LoginSection />
        </div>
      </div>
    </>
    // <AuthLayout>
    // <LoginSection />
    // </AuthLayout>
  );
}
