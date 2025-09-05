import { Shield, CheckCircle, Star } from "lucide-react";

const featureCardsData = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit SSL encryption protects your data",
  },
  {
    icon: CheckCircle,
    title: "1000+ Happy Clients",
    description: "Trusted by businesses nationwide",
  },
  {
    icon: Star,
    title: "4.9/5 Star Rating",
    description: "Exceptional client satisfaction",
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4">
      {featureCardsData.map((card, index) => (
        <div
          key={index}
          className="bg-card-bg rounded-2xl p-6 md:p-8 text-center"
        >
          <div className="w-16 h-16 bg-financial-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
            <card.icon className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-[18px] font-bold text-heading-dark mb-4">
            {card.title}
          </h4>
          <p className="text-gray-550">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
