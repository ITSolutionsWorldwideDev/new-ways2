"use client";
import Image from "next/image";
import { useState } from "react";

const instagramPosts = [
  {
    name: "Daro NiVell",
    role: "The Weathered Scout",
    img: "/home/daro-n-vell.png",
  },
  {
    name: "Kael Sorrin",
    role: "Pathfinder",
    img: "/home/daro-n-vell.png",
  },
  {
    name: "Tavion Rhyse",
    role: "Mastermind",
    img: "/home/daro-n-vell.png",
  },
];

export default function InstagramSection() {
  const [active, setActive] = useState(0);
  const handlePrev = () =>
    setActive((prev) => (prev === 0 ? instagramPosts.length - 1 : prev - 1));
  const handleNext = () =>
    setActive((prev) => (prev === instagramPosts.length - 1 ? 0 : prev + 1));

  return (
    <section
      className="w-full min-h-[600px] py-20 px-4"
      style={{ background: "linear-gradient(90deg, #F3E850 0%, #E8FC56 100%)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        {/* Left: Large Image */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-lg aspect-[4/5] md:aspect-[4/5] bg-gray-200 flex items-center justify-center"
            style={{ minHeight: 480 }}
          >
            <Image
              src={instagramPosts[active].img}
              alt={instagramPosts[active].name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
              priority
            />
          </div>
        </div>
        {/* Right: Instagram Feed */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Instagram
          </h2>
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {instagramPosts.map((post, idx) => (
              <div
                key={idx}
                className={`bg-white/10 rounded-xl overflow-hidden shadow w-40 sm:w-48 aspect-[4/5] relative flex-shrink-0 transition-all duration-300 ${
                  active === idx ? "ring-2 ring-black/30" : ""
                }`}
                style={{ opacity: active === idx ? 1 : 0.7, cursor: "pointer" }}
                onClick={() => setActive(idx)}
              >
                <Image
                  src={post.img}
                  alt={post.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <div className="font-semibold text-base">{post.name}</div>
                  <div className="text-xs opacity-80">{post.role}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Controls */}
          <div className="flex gap-3 mt-2">
            <button
              className="w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center text-lg hover:bg-black"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              &#8592;
            </button>
            <button
              className="w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center text-lg hover:bg-black"
              onClick={handleNext}
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
