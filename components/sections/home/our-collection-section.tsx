import Image from "next/image";

export default function OurCollectionSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between py-20 px-4 md:px-24 bg-black">
      {/* Left Side */}
      <div className="max-w-6xl mx-auto flex-1 flex flex-col items-start ">{/* max-w-lg */}
        <div className="flex items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mr-2">
            Our Collection
          </h2>
          <span className="w-3 h-3 rounded-full bg-lime-300 inline-block"></span>
        </div>
        <div className="flex items-center bg-[#23262F] rounded-xl p-4 mb-8 w-full max-w-md">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-lime-200 to-yellow-300 mr-4">
            {/* Icon placeholder */}
            <span className="w-8 h-8 block"></span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Cheech &amp; Chong
            </h3>
            <p className="text-sm text-gray-300 leading-snug">
              Elevate your shop with a curated selection of our best-selling
              blunts. This convenient bundle is perfect for any collection.
            </p>
          </div>
        </div>
        <button className="mt-2 px-8 py-2 rounded-lg bg-gradient-to-br from-lime-200 to-yellow-300 text-black font-semibold shadow transition hover:scale-105">
          View More
        </button>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/home/snoop-dogg-vape-kit.png"
            alt="Snoop Dogg Vape Kit"
            width={340}
            height={420}
            className="rounded-2xl object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
