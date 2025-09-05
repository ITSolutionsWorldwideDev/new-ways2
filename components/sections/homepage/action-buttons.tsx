import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";

export function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-14 md:mb-16 px-4">
      <Link href="/signup" className="w-full sm:w-auto">
        <ActionButton variant="onboarding" className="w-full sm:w-[240px]">
          Start Onboarding
        </ActionButton>
      </Link>
      <Link href="/login" className="w-full sm:w-auto">
        <ActionButton variant="signin" className="w-full sm:w-[240px]">
          Sign In
        </ActionButton>
      </Link>
    </div>
  );
}
