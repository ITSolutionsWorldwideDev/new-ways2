"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "onboarding" | "signin" | "continue";
  icon?: LucideIcon;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function ActionButton({
  children,
  variant = "continue",
  icon: Icon,
  showArrow = true,
  className,
  onClick,
  type = "button",
  disabled = false,
  ...props
}: ActionButtonProps) {
  const baseClasses =
    "px-8 py-6 text-lg font-semibold rounded-xl group transition-all duration-300";

  const variantClasses = {
    onboarding: "bg-onboarding-gradient hover:opacity-90 text-white",
    signin: "bg-signin-gradient hover:opacity-90 text-white",
    continue:
      "bg-continue-btn hover:bg-amber-500 text-continue-text text-[18px] font-normal",
  };

  return (
    <Button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="mr-2 w-5 h-5" />}
      {children}
      {showArrow && (
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </Button>
  );
}
