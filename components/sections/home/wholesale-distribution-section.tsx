import Image from "next/image";

export default function WholesaleDistributionSection() {
  return (
    <section className="w-full bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Top Row: Main Card */}
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left: Text */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Wholesale & Distribution
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Access to over 300 premium products. Unlock Exclusive Access to
              Wholesale Pricing, Bulk Discounts, and B2B Perks. Join our network
              and grow your business with our premium accessories.
            </p>
            <button className="px-5 py-2 rounded-lg bg-lime-200 text-black font-semibold shadow hover:scale-105 transition w-fit">
              Register Now
            </button>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="relative rounded-xl overflow-hidden w-full max-w-md aspect-[16/9] bg-gray-100 flex items-center justify-center">
              <Image
                src="/home/grollz-truck.png"
                alt="Wholesale Truck"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
        {/* Bottom Row: Product Cards */}
        <div className="flex flex-col md:flex-row gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 bg-white rounded-2xl shadow flex min-w-[320px] overflow-hidden"
            >
              {/* Text Side */}
              <div className="w-1/2 flex flex-col justify-center p-6">
                <h3 className="font-semibold text-lg text-black mb-1">
                  High-Quality, Natural Products
                </h3>
                <p className="text-gray-400 text-sm">
                  Vestibulum lobortis vel sapien ac feugiat. In...
                </p>
              </div>
              {/* Image Side */}
              <div className="w-1/2 flex items-center justify-center p-4">
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100 relative">
                  <Image
                    src="/home/wholesale-1.png"
                    alt="Product"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 180px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
