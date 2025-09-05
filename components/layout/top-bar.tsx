import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const announcements = [
  "Return extended to 60 days",
  "Life-time Guarantee",
  "Limited-Time Offer",
];

export function TopBar() {
  return (
    <div className="bg-background text-foreground border-b border-border text-sm">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center h-10 gap-2 flex-nowrap md:gap-0">
          {/* Mobile Wholesale Button - Visible on small screens */}
          <Button
            variant="link"
            className="text-foreground md:hidden flex-shrink-0"
          >
            Wholesale(B2B)
          </Button>

          {/* Announcements - Sliding/Marquee effect, always visible, fixed width */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px] overflow-hidden relative h-10">
              <div
                className="absolute left-0 top-0 flex items-center whitespace-nowrap animate-marquee"
                style={{ minWidth: "200%", height: "100%" }}
              >
                {[...announcements, ...announcements].map((text, index) => (
                  <span key={index} className="mx-4 inline-block">
                    {index % announcements.length < announcements.length && (
                      <span className="inline-block align-middle mx-2 w-1 h-1 bg-foreground rounded-full" />
                    )}
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Wholesale - Hidden on mobile */}
            <Button
              variant="link"
              className="text-foreground hidden md:inline-flex"
            >
              Wholesale(B2B)
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Selector */}
            <Select defaultValue="en">
              <SelectTrigger className="w-[90px] sm:w-[100px] border-none">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>

            {/* Currency Selector */}
            <Select defaultValue="usd">
              <SelectTrigger className="w-[100px] sm:w-[140px] border-none">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
