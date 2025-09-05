"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, User, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { TopBar } from "./top-bar";
import { Logo } from "../logo";
import { ShopMainCategories } from "@/lib/menuData";
import { useCartStore } from "@/store/useCartStore"; // Adjust path as needed

const categories = [
  "Papers/Tips",
  "Cones",
  "Wraps",
  "Trays",
  "Storage",
  "Collections",
  "All Products",
];

export function Header() {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  /* z-20  */
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background border-b border-border">
      {/* Top Bar */}
      <TopBar />

      {/* Main Header */}
      <div className="container mx-auto px-2 sm:px-4 md:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-0">
          {/* Mobile/Tablet Menu - Visible on tablet and below */}
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

          {/* Logo - Centered on mobile, left-aligned on md+ */}
          <div className="flex flex-1 justify-center md:justify-start md:flex-none">
            <Logo />
          </div>

          {/* Desktop Navigation - Hidden on tablet and below */}
          {/* items-center justify-center  */}
          <nav className="hidden md:flex flex-1 space-x-4 lg:space-x-8 max-w-6xl overflow-auto">
            {/* {categories.map((category, index) => ( */}
            {ShopMainCategories.map((category, index) => (
              <div key={index} className="relative group">
                <Link href={`/shop/${category.name.split(" ").join("-")}`}>

                  <Button
                    variant="ghost"
                    className="text-base font-medium px-2 lg:px-4"
                  >
                    {category.name}
                  </Button>
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0 justify-end">
            {/* Search icon hidden on mobile, visible on md+ */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-lemon text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                {/* 0 */}
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Search - Visible on md and below */}
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
