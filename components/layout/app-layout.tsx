"use client";

import type React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Calculator, FileText, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogout } from "@/hooks/use-logout";
import { useAppSelector } from "@/redux/store";

interface AppLayoutProps {
  children: React.ReactNode;
}

const excludedPaths = ["/", "/login", "/signup"];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.userInfo.value);
  const logout = useLogout({ sidebar: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldShowSidebar = !excludedPaths.includes(pathname);

  // Handle service selection from localStorage
  useEffect(() => {
    if (shouldShowSidebar) {
      const selectedService = localStorage.getItem("selectedService");

      if (selectedService) {
        // Clear the localStorage value
        localStorage.removeItem("selectedService");

        // Navigate to the selected service
        if (selectedService === "bookkeeping") {
          router.push("/bookkeeping");
        } else if (selectedService === "tax-organizer") {
          router.push("/tax-organizer");
        } else if (selectedService === "bookkeeping-setup") {
          router.push("/bookkeeping-setup");
        }
      }
    }
  }, [shouldShowSidebar, router]);

  // Auto-open sidebar on hover from left edge
  useEffect(() => {
    if (!shouldShowSidebar) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 10 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientX > 256 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldShowSidebar, sidebarOpen]);

  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  const navigationItems = [
    {
      href: "/bookkeeping",
      label: "Bookkeeping",
      icon: Calculator,
      isActive: pathname === "/bookkeeping",
    },
    {
      href: "/tax-organizer",
      label: "Tax Organization",
      icon: FileText,
      isActive: pathname.startsWith("/tax-organizer"),
    },
  ];

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar>
            <SidebarHeader className="p-4">
              <Logo />
            </SidebarHeader>
            <SidebarContent className="px-2 mt-5">
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className={`w-full flex items-center px-4 py-2 text-black font-medium rounded-md transition-colors ${
                        item.isActive
                          ? "bg-financial-yellow"
                          : "hover:bg-amber-500"
                      } `}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center w-full"
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 p-0">
                    <div className="p-4">
                      <Logo />
                    </div>
                    <nav className="px-2 mt-5">
                      <div className="space-y-1">
                        {navigationItems.map((item) => {
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`w-full flex items-center px-4 py-2 text-black font-medium rounded-md hover:bg-amber-500 transition-colors ${
                                item.isActive ? "bg-financial-yellow" : ""
                              }`}
                            >
                              <item.icon className="w-4 h-4 mr-2" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Sidebar Trigger */}
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>

              <h1 className="text-lg font-semibold truncate">
                {pathname === "/bookkeeping"
                  ? "Bookkeeping"
                  : pathname.startsWith("/tax-organizer")
                  ? "Tax Organization"
                  : "Balance Beam"}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome, {userInfo?.firstName}
              </span>
              <span className="text-sm text-gray-600 sm:hidden">John</span>
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </header>
          <main className="w-full max-w-[1318px] mx-auto flex-1 p-4 sm:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
