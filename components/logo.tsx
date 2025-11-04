"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export function Logo() {
  // const { theme } = useTheme();

  const theme = "light"

  return (
    <Link href="/" className="flex flex-shrink-0 items-center gap-2">
      <Image
        src={
          theme === "light"
            ? "/G-Rollz logo black.png"
            : "/G-Rollz logo white.png"
        }
        alt="G-Rollz Logo"
        width={260}
        height={78}
        className="h-10 w-auto"
        priority
      />
      {/* Hidden image preload for smoother theme switching */}
      <Image
        src={
          theme === "light"
            ? "/G-Rollz logo white.png"
            : "/G-Rollz logo black.png"
        }
        alt="G-Rollz Logo Preload"
        width={260}
        height={78}
        className="hidden"
        priority
      />
    </Link>
  );
}
