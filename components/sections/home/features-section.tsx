import { Card } from "@/components/ui/card";

export const FeaturesSection = () => {
  const features = [
    { id: 1, title: "Fast Delivery", icon: "⚡" },
    { id: 2, title: "Secure Payment", icon: "🔒" },
    { id: 3, title: "Best Quality", icon: "⭐" },
    { id: 4, title: "24/7 Support", icon: "💬" },
    { id: 5, title: "Money Back", icon: "💰" },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-4">
          {features.map((feature) => (
            <Card key={feature.id} className="p-4 text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-sm font-medium">{feature.title}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
