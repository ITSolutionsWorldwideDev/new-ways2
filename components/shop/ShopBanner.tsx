import React from "react";

interface ShopBannerProps {
  title: string;
  image: string;
  breadcrumb: string[];
  description: string;
}

const ShopBanner: React.FC<ShopBannerProps> = ({
  title,
  image,
  breadcrumb,
  description,
}) => (
  <div
    className="relative w-full h-[220px] md:h-[300px] flex items-center justify-center text-center bg-black/60  bg-cover bg-center"
    style={{ backgroundImage: `url(${image})` }}
  >{/* mt-16 md:mt-28  */}
    <div className="absolute inset-0 bg-opacity-50" style={{
        background: "linear-gradient(360deg, rgba(77, 87, 0, 0.8) -44.24%, rgba(0, 0, 0, 0.8) 79.49%)",
      }}></div>{/*  */}
    {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
    <div className="relative z-10 text-center text-white">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="mb-2 text-sm opacity-80">{breadcrumb?.join(" - ")}</div>
      <p className="max-w-xl mx-auto text-base opacity-90">{description}</p>
    </div>
  </div>
);


export default ShopBanner;


/* 
<div
    className="relative w-full h-64 h-[220px] md:h-[300px] flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url(${image})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <div className="relative z-10 text-center text-white">
      <div className="mb-2 text-sm opacity-80">{breadcrumb.join(" / ")}</div>
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="max-w-xl mx-auto text-base opacity-90">{description}</p>
    </div>
  </div>

*/
