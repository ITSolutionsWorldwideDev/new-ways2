import Image from "next/image";

export default function OurCollectionSection() {
  return (
    // <section className="w-full flex flex-col md:flex-row items-center justify-between py-20 px-4 md:px-24 bg-black">
    <section className="w-full bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto pb-20 flex flex-row gap-12">
        <div className="flex flex-col md:flex-col w-1/2 "></div>
        <div className="flex flex-col items-end mt-12 md:mt-0 w-1/2">
          <Image
            src="/home/collection_mesh.png"
            alt="collection mesh"
            width={340}
            height={120}
            className="opacity-10 h-32"
            priority
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-row gap-12">
        {/* Left Side */}
        <div className="flex flex-col md:flex-col w-1/2 ">
          {/* max-w-lg */}
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
          <button className="w-1/2 mt-2 px-8 py-2 rounded-lg bg-gradient-to-br from-lime-200 to-yellow-300 text-black font-semibold shadow transition hover:scale-105">
            View More
          </button>
        </div>
        {/* Right Side */}
        <div className="flex flex-col items-end mt-12 md:mt-0 w-1/2">
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
      </div>
    </section>
  );
}
