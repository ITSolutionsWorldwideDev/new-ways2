import { HeroSection } from "./hero-section";
import { SetupSection } from "./setup-section";
import { ServiceSelectionSection } from "./service-selection-section";

export function HomePageSections() {
  return (
    <div className="w-full max-w-4xl mx-auto shadow-2xl bg-white rounded-3xl overflow-hidden">
      <HeroSection />
      <SetupSection />
      <ServiceSelectionSection />
    </div>
  );
}
