import { DealCard } from "./deal-card";

const deals = [
  {
    id: 1,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 2,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
  {
    id: 3,
    name: "Montes Halo Stud Arcu",
    description:
      "Elevate your shop with a curated selection of our best-selling blunts. This convenient box features our",
    price: 51.0,
    originalPrice: 95.0,
    image: "/dummy/deal-1.png",
    isNew: true,
    endTime: "2025-12-31T00:00:00",
  },
];

export const DealSection = () => {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4 md:px-2">
        <h2 className="text-white text-3xl font-bold mb-8">DEAL OF THE WEEK</h2>
        <div className="h-1 w-32 bg-lemon mb-8" />
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
          {deals.map((deal) => (
            <DealCard key={deal.id} {...deal} />
          ))}
        </div>
      </div>
    </section>
  );
};
