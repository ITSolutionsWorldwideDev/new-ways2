// app/login/page.tsx

"use client";

import LoginSection from "@/components/sections/auth/login/login-section";
import { useSessionStore } from "@/store/useSessionStore"; // ✅ NEW
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninPage() {
  const { user, loading } = useSessionStore(); // ✅ Zustand version
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && user) {
      const redirectTo = searchParams.get("from") || "/";
      console.log("redirectTo === ", redirectTo);
      router.replace(redirectTo);
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
      <div className="w-full max-w-6xl">
        <LoginSection />
      </div>
    </div>
  );
}
