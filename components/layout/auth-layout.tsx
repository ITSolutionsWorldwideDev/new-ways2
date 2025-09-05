import type React from "react";
import { AuthHeader } from "./auth-header";
import { AuthFooter } from "./auth-footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #F9FAFB, #F3F4F6)",
      }}
    >
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}
