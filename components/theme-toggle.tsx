"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ThemeToggle() {


  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Auto-set theme based on route
  useEffect(() => {
    if (pathname === "/") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [pathname, setTheme]);


  return (
    <></>
  );
}

/* 
<Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-foreground hover:text-muted-foreground"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
*/