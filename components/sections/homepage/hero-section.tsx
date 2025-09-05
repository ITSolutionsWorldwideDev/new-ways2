import { FeatureBadges } from "./feature-badges";

export function HeroSection() {
  return (
    <section
      className="relative bg-no-repeat bg-top bg-cover sm:bg-auto overflow-hidden rounded-t-3xl"
      style={{ backgroundImage: 'url("/hero-background.png")' }}
    >
      <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 text-center z-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
            Balance Beam
          </h1>
        </div>

        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-[60px] font-bold mb-3 sm:mb-4 leading-tight">
            <span className="bg-welcome-gradient bg-clip-text text-transparent">
              Welcome to Your
            </span>
            <br />
            <span className="bg-financial-gradient bg-clip-text text-transparent">
              Financial Journey
            </span>
          </h2>
          <p className="text-subtitle-gray text-base sm:text-lg md:text-[24px] max-w-3xl mx-auto px-4">
            Streamline your finances with our expert bookkeeping and tax
            services
          </p>
        </div>

        {/* Feature Badges */}
        <FeatureBadges />
      </div>
    </section>
  );
}
