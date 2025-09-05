import { SecurityFeatures } from "./security-features";
import { ActionButtons } from "./action-buttons";
import { FeatureCards } from "./feature-cards";

export function SetupSection() {
  return (
    <section className="pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 md:px-8 ">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading-dark mb-3 sm:mb-4 px-4">
            Let's get you set up
          </h3>
          <p className="text-gray-750 text-base sm:text-lg max-w-2xl mx-auto px-4">
            We'll need some basic information and then you can choose your
            service.
          </p>
        </div>

        <SecurityFeatures />
        <ActionButtons />
        <FeatureCards />
      </div>
    </section>
  );
}
