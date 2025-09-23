import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";
import { UserProvider } from "@/context/userContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Your Brand - Premium Products",
  description:
    "Discover our premium collection of products. Quality and style combined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className={`${inter.className} text-base antialiased`}>
        <ThemeProvider>
          <ReduxProvider>
            <UserProvider>
            <Header />
            <Toaster />
            {children}
            <Footer />
            </UserProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
