import Image from "next/image";
import { Button } from "@/components/ui/button";

export const BundleSection = () => {
  return (
    <section className="py-16 bg-[#E8FC56]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-black inline-block"></span>
            <span className="uppercase text-xs tracking-widest text-black font-semibold">
              Our Product Range
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-4 text-black text-center">
            Product That Satisfies You
          </h2>
          <p className="text-lg text-black text-center">
            Discover our exclusive bundle offers
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className=" rounded-2xl p-6 flex flex-col items-center w-[280px] shadow-lg bg-[#131313]"
            >
              {/* bg-black style={{
                  background:
                    "radial-gradient(ellipse at center, #222 60%, transparent 100%)",
                }} */}
              <img
                src="/home/papers-and-filter-tips.png"
                alt="G-Rollz Bundle"
                className="w-56 h-56 object-contain mb-6 "                
              />
              <div className="text-lg font-semibold text-white mb-2">
                Papers + Filter Tips <span aria-hidden>→</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className="bg-black text-white hover:bg-zinc-900 px-8 py-4 text-lg rounded-full font-semibold shadow-lg">
            Explore Now
          </Button>
        </div>
      </div>
    </section>
  );
};
