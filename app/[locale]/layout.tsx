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
import { CurrencyProvider } from "@/context/currencyContext";

import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/getDictionary";
import { languages } from "@/lib/i18n-config";

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

// Required for static site generation (SSG)
export async function generateStaticParams() {
  return languages.map((lang) => ({ locale: lang }));
}

/* export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
 */

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const { locale } = await Promise.resolve(props.params);

  if (!languages.includes(locale as any)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as typeof languages[number]);

  return (
    <html lang={locale} className={`${inter.variable} ${poppins.variable} light`} suppressHydrationWarning>
      <body className={`${inter.className} text-base antialiased`}>
        <ThemeProvider>
          <ReduxProvider>
            <CurrencyProvider>
            <UserProvider>
              <Header locale={locale} dictionary={dictionary} />
              <Toaster />
              {/* {children} */}
              {props.children}
              <Footer locale={locale} dictionary={dictionary} />
            </UserProvider>
            </CurrencyProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

/* export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = params;

  if (!languages.includes(locale)) {
    notFound(); // Show 404 if invalid locale
  }

  return (
    <html
      lang={locale}
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
              <Footer currentLocale={locale} />
            </UserProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} */

/* export default function RootLayout({
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
} */
