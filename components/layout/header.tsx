// components/layout/header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { Logo } from "../logo";
import { ShopMainCategories } from "@/lib/menuData";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import CartSidebar from "@/components/cart/CartSidebar";

import { usePathname, useRouter } from "next/navigation";
import TopBar from "./top-bar";

interface UserSession {
  firstName: string;
  lastName: string;
  email: string;
}

type HeaderProps = {
  locale: string;
  dictionary: any;
};

export function Header({ locale, dictionary }: HeaderProps) {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [cartOpen, setCartOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  useEffect(() => {
    closeCart();
  }, [pathname]);

  const [user, setUser] = useState<UserSession | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();

          if (data?.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed fetching session:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchSession();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <TopBar locale={locale} dictionary={dictionary} />

      <div className="container mx-auto sm:px-4 md:px-0">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-0">
          <div className="flex items-center flex-shrink-0 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[70vw] max-w-xs p-0">
                <nav className="flex flex-col gap-2 p-4 ">
                  {ShopMainCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/shop/${category.name.split(" ").join("-")}`}
                      className="text-base font-medium py-2 px-2 rounded hover:bg-muted hover:text-muted-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-1 justify-center md:justify-start md:flex-none">
            <Logo />
          </div>

          <nav className="hidden md:flex flex-1 space-x-4 lg:space-x-8 max-w-6xl justify-center">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-base font-medium px-2 lg:px-4"
              >
                {dictionary.nav.home}
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="ghost"
                className="text-base font-medium px-2 lg:px-4"
              >
                {dictionary.nav.shop}
              </Button>
            </Link>

            <Link href="/customizer">
              <Button
                variant="ghost"
                className="text-base font-medium px-2 lg:px-4"
              >
                {dictionary.nav.customize}
              </Button>
            </Link>
            <div className="relative group">
              <Button
                variant="ghost"
                className="text-base font-medium px-2 lg:px-4"
              >
                {dictionary.nav.collections}
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </Button>

              <div className="absolute left-1/2 -translate-x-1/2  mt-4 bg-background text-foreground border border-gray-200 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                  {ShopMainCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/shop/${category.name.split(" ").join("-")}`}
                      className="block break-inside-avoid"
                    >
                      <Button variant="ghost" className="text-base font-medium">
                        {category.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0 justify-end">
            {/* Search icon hidden on mobile, visible on md+ */}
            {/* <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button> */}

            {!loadingUser && !user && (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="icon" aria-label="Login">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}

            {!loadingUser && user && (
              <div className="relative group inline-flex">
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
                <div className="absolute top-8 right-0 mt-2 w-48 bg-background border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-muted"
                  >
                    {user.firstName}
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-muted flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-lemon text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {useCartStore.getState().cart.length}
              </span>
            </Button>

            <CartSidebar isOpen={cartOpen} onClose={closeCart} />
          </div>
        </div>

        <div className="block md:hidden pb-3 pt-2">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full text-sm h-10"
          />
        </div>
      </div>
    </header>
  );
}
