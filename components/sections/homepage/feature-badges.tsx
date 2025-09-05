const badges = ["Professional Service", "Secure & Reliable", "Quick Setup"];

export function FeatureBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 mb-12 sm:mb-14 md:mb-16 px-4">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-2 h-2 bg-financial-yellow rounded-full flex-shrink-0"></div>
          <span className="text-sm md:text-base text-feature-text whitespace-nowrap">
            {badge}
          </span>
        </div>
      ))}
    </div>
  );
}
