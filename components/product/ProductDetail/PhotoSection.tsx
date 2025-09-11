"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useRef, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const defaultGallery = [
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=1",
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=2",
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=3",
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=4",
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=5",
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=6",
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=7",
  "/dummy/img-product.png",
  "https://dummyimage.com/152x167/cccccc/000000&text=8",
];

const PhotoSection = ({ data }: { data: Product }) => {
  const gallery = data?.gallery?.length ? data.gallery : defaultGallery;

  const [selected, setSelected] = useState<string>(data?.srcUrl);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3">
      {gallery && gallery.length > 0 && (
        <div className="flex flex-col items-center lg:w-fit max-h-[530px]">
          {/* Scroll Up Button */}
          <button
            onClick={() => scrollBy(-150)}
            className="p-1 mb-2 bg-gray-200 hover:bg-gray-300 rounded text-xl"
          >
            ⬆
          </button>

          {/* Radix Scroll Area */}
          <ScrollArea.Root
            type="always"
            className="w-full lg:w-fit h-full overflow-hidden rounded"
          >
            <ScrollArea.Viewport ref={scrollRef} className="h-full w-full p-1">
              <div className="flex flex-row lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 items-center justify-center">
                {gallery.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelected(photo)}
                    className="focus:outline-none"
                  >
                    <Image
                      src={photo}
                      width={100}
                      height={100}
                      alt={data.displayname}
                      className="rounded border border-gray-300 hover:border-black transition"
                    />
                  </button>
                ))}
              </div>
            </ScrollArea.Viewport>

            {/* Optional: Custom styled scrollbar */}
            <ScrollArea.Scrollbar
              orientation="vertical"
              className="flex select-none touch-none p-0.5 bg-gray-200 rounded w-2"
            >
              <ScrollArea.Thumb className="flex-1 bg-gray-500 rounded-full" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>

          <button
            onClick={() => scrollBy(150)}
            className="p-1 mt-2 bg-gray-200 hover:bg-gray-300 rounded text-xl"
          >
            ⬇
          </button>
        </div>
      )}

      {
        <div className="flex items-center justify-center bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0">
          <Image
            src={selected ?? "/dummy/img-product.png"}
            width={444}
            height={530}
            className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
            alt=""
            priority
            unoptimized
          />
        </div>
      }
    </div>
  );
};

export default PhotoSection;

/* 
// ✅ Gallery Section
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src={images[activeImage]}
              alt={data.displayname}
              className="w-full h-auto rounded"
            />
            // Arrows
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

        // Thumbnails
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 object-cover border ${
                    i === activeImage ? "border-black" : "border-gray-300"
                  } cursor-pointer rounded`}
                />
              ))}
            </div>
          )}
        </div>

*/

/* {gallery && gallery.length > 0 && (
        <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center h-full max-h-[530px] min-h-[330px] overflow-y-auto">
          {gallery.map((photo, index) => (
            <button
              key={index}
              type="button"
              className="bg-[#F0EEED] rounded-[13px] xl:rounded-[20px] w-full max-w-[111px] xl:max-w-[120px] max-h-[120px] xl:max-h-[120px] xl:min-h-[120px] aspect-square overflow-hidden"
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo}
                width={120}
                height={120}
                className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
                alt={data.displayname}
                priority
              />
            </button>
          ))}
        </div>
      )} */
