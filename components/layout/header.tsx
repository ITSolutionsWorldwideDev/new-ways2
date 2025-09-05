import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, User, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { TopBar } from "./top-bar";
import { Logo } from "../logo";
import { ShopMainCategories } from "@/lib/menuData";

const categories = [
  "Papers/Tips",
  "Cones",
  "Wraps",
  "Trays",
  "Storage",
  "Collections",
  "All Products",
];

/* const ShopMainCategories = [
  {
    description:
      "Accessories used to safely collect ash residue from smoking items.",
    id: "1",
    name: "Ashtray",
  },
  {
    description:
      "General category for all types of bongs used in smoke filtration.",
    id: "5",
    name: "BONGS",
  },
  {
    description:
      "Acrylic-based water pipes used for smoking, known for being lightweight and affordable.",
    id: "2",
    name: "Bong Acrylic",
  },
  {
    description:
      "Premium glass bongs offering better filtration and smooth smoke experience.",
    id: "3",
    name: "Bong Glass",
  },
  {
    description:
      "Attachments and parts designed to complement and enhance glass bongs.",
    id: "4",
    name: "Bong Glass Acc",
  },
  {
    description:
      "Pre-rolled paper cones used for quick and easy manual filling.",
    id: "6",
    name: "Cones",
  },
  {
    description:
      "Electronic or manual tools that assist with smoking or storage, such as lighters, rollers, or humidifiers.",
    id: "7",
    name: "Gadgets",
  },
  {
    description:
      "Devices used to finely grind herbs or tobacco for better combustion.",
    id: "8",
    name: "Grinder",
  },
  {
    description:
      "Traditional water pipes designed for group smoking using flavored tobacco.",
    id: "9",
    name: "Hookah",
  },
  {
    description:
      "Accessories used with hookahs, including hoses, bowls, and mouthpieces.",
    id: "10",
    name: "Hookah Acc",
  },
  {
    description:
      "Fragrant sticks or cones used to create a pleasant aroma and ambiance.",
    id: "11",
    name: "Incense",
  },
  {
    description: "Flame-producing tools used to ignite smoking items.",
    id: "12",
    name: "Lighter",
  },
  {
    description:
      "Items used for brand promotion including posters, stickers, or branded merchandise.",
    id: "14",
    name: "PROMOTION MATERIALS",
  },
  {
    description:
      "Compact, often handheld devices used for direct smoking of dry herbs.",
    id: "13",
    name: "Pipe",
  },
  {
    description:
      "Equipment and accessories used to roll tobacco or herbs manually.",
    id: "15",
    name: "Rolling",
  },
  {
    description: "Thin papers used for hand-rolling cigarettes or joints.",
    id: "16",
    name: "Rolling Papers",
  },
  {
    description:
      "Precision weighing tools to measure tobacco, herbs, or concentrates.",
    id: "17",
    name: "Scale",
  },
  {
    description:
      "Containers or equipment used for storing and curing smoking materials.",
    id: "18",
    name: "Storage / Proceeding",
  },
  {
    description:
      "Fabrics or cloth items related to packaging or promotional items (e.g., pouches, wraps).",
    id: "19",
    name: "Textile",
  },
  {
    description:
      "Devices used to heat herbs or oils for inhalation without combustion.",
    id: "20",
    name: "Vaporizer",
  },
  {
    description:
      "Tobacco or hemp-based sheets used as rolling wrappers for blunts.",
    id: "21",
    name: "Wraps",
  },
]; */

export function Header() {
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
                  {/* {categories.map((category, index) => ( */}
                  {ShopMainCategories.map((category, index) => (
                    <Link
                      key={index}
                      // href="/shop"
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
                <Link href={`/shop/${category.name.split(" ").join("-")}`} >
                {/* href="/shop/{category.name}" */}
                
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
                <span className="absolute -top-1 -right-1 bg-lemon text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
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
