import { ServiceCards } from "./service-cards";
import { ActionButton } from "@/components/ui/action-button";
import Image from "next/image";
import Link from "next/link";

export function ServiceSelectionSection() {
  return (
    <section className="pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <Image
            src={"/service-icon.svg"}
            alt="service"
            width={64}
            height={64}
            className="mb-4"
          />
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading-dark mb-3 sm:mb-4 text-center px-4">
            What service do you need?
          </h3>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto text-center px-4">
            Choose the service that best fits your needs
          </p>
        </div>

        <ServiceCards />

        <div className="text-center mb-6 sm:mb-8 px-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <ActionButton variant="continue" className="w-full sm:w-auto">
              Continue to Next Step
            </ActionButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
