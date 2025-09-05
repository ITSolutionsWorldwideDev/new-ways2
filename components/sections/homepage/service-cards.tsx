"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const serviceCardsData = [
  {
    icon: "/Bookkeeping.png",
    title: "Bookkeeping Services",
    description:
      "Connect your bank accounts for automatic transaction sync and categorization",
    badge: {
      text: "• Real-time sync",
      bgColor: "bg-realtime-bg",
      textColor: "text-blue-600",
    },
    isSelected: false,
    serviceKey: "bookkeeping",
  },
  {
    icon: "/Tax-organizer.png",
    title: "Tax Preparation",
    description:
      "Complete our digital tax organizer and upload supporting documents",
    badge: {
      text: "• Expert guidance",
      bgColor: "bg-expert-bg",
      textColor: "text-amber-600",
    },
    isSelected: true,
    serviceKey: "tax-organizer",
  },
];

export function ServiceCards() {
  const router = useRouter();

  const handleServiceSelection = (serviceKey: string) => {
    // Store the selected service in localStorage
    localStorage.setItem("selectedService", serviceKey);

    // Navigate to login page (or directly to service if user is authenticated)
    router.push("/login");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
      {serviceCardsData.map((card, index) => (
        <div
          key={index}
          onClick={() => handleServiceSelection(card.serviceKey)}
          className={`bg-card-bg flex flex-col text-center items-center rounded-2xl p-4 sm:p-6 md:p-8 border-2 transition-all duration-300 relative cursor-pointer hover:shadow-lg ${
            card.isSelected
              ? "border-financial-yellow"
              : "border-transparent hover:border-gray-200"
          }`}
        >
          {card.isSelected && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-financial-yellow rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
          <Image
            src={card.icon || "/placeholder.svg"}
            alt="icon"
            width={96}
            height={96}
            className="mb-4 sm:mb-6 w-20 h-20 sm:w-24 sm:h-24"
          />
          <h4 className="text-xl sm:text-2xl font-bold text-heading-dark mb-3 sm:mb-4">
            {card.title}
          </h4>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            {card.description}
          </p>
          <div
            className={`${card.badge.bgColor} rounded-lg px-3 sm:px-4 py-2 inline-block`}
          >
            <span className={`${card.badge.textColor} font-medium text-sm`}>
              {card.badge.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
