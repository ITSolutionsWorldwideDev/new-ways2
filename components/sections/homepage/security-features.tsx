import { Shield, Lock, BadgeIcon as IdCard } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    text: "Bank-Level Security",
  },
  {
    icon: Shield,
    text: "Privacy Protected",
  },
  {
    icon: IdCard,
    text: "SOC 2 Compliant",
  },
];

export function SecurityFeatures() {
  return (
    <div className="bg-security-gradient border border-security-border rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
      <div className="w-full justify-center flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 justify-start">
            <div className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-[#DBEAFE] flex-shrink-0">
              <feature.icon className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-blue-650 text-sm whitespace-nowrap">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
