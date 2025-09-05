import Image from "next/image";

export const AboutStatsSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4 md:px-0">
        {/* Image on the left */}
        <div className="flex-shrink-0 flex items-center justify-center h-[420px]">
          <img
            src="/home/vape-kit.png"
            alt="G-Rollz Vape Kit"
            className="w-[340px] h-[420px] object-contain rounded-2xl shadow-xl"
            draggable={false}
          />
        </div>
        {/* Text and stats on the right */}
        <div className="flex-1 flex flex-col justify-center max-w-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-lemon inline-block"></span>
            <span className="uppercase text-xs tracking-widest text-white font-semibold">
              About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Paper that performs.
            <br />
            Blunt
          </h2>
          <p className="text-base text-gray-300 mb-8">
            Whether you're a seasoned roller or just getting started, we're here
            to make your sesh better, safer, and more fun.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                85<span className="text-lemon text-2xl align-super">+</span>
              </div>
              <div className="text-sm text-gray-400">Vaping Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                16<span className="text-lemon text-2xl align-super">+</span>
              </div>
              <div className="text-sm text-gray-400">Retail Shops</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                120<span className="text-lemon text-2xl align-super">+</span>
              </div>
              <div className="text-sm text-gray-400">Expert Staffs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                99<span className="text-lemon text-2xl align-super">%</span>
              </div>
              <div className="text-sm text-gray-400">Positive Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
