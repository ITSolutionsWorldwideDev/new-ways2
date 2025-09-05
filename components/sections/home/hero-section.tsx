import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";

export const HeroSection = () => {
  // const { theme } = useTheme();
  /* bg-black text-white  
  dark:bg-[url('/hero-background.png')] 
  dark:bg-black smoke-bg
  bg-none dark:bg-black smoke-bg
  */
  return (
    <section className="relative h-screen overflow-hidden ">

      <video
        className="absolute top-0 left-0 w-full h-full object-cover  hidden dark:block"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/smoke.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto h-full flex items-center relative z-10 px-4 md:px-8">
        <div className="max-w-2xl z-20">
          <div className="mb-4 flex items-center gap-2 dark:text-[#E8FC56] text-xs font-semibold tracking-widest">
            <span className="w-2 h-2 rounded-full dark:bg-[#fff] bg-[#000] inline-block"></span>
            G-ROLLZ - G-ROLLZ
          </div>
          {/* font-bold leading-tight  */}
          <h1 className="text-5xl font-medium mb-6 [line-height:84.5px]">
            The Right Brand
            <br />
            for the Right Blunt Paper
          </h1>
          {/* text-lg mb-8  */}
          <p className="font-inter mb-8 font-normal text-[15px] leading-[27px] tracking-[0] align-middle">
            Whether you're a seasoned roller or just getting started, we’re here
            to make your sesh better, safer, and more fun.
          </p>

          <div className="flex gap-4">
            <Button className="bg-[#0AA854] dark:bg-[#E8FC56] hover:bg-[#d4e600] rounded-full px-8 py-6  shadow-lg  font-poppins font-medium text-[14px] leading-[14px] tracking-[0] text-center align-middle">
              Explore Now
            </Button>
            {/* text-lg font-semibold   */}
            <Button
              variant="outline"
              className="dark:border-[#E8FC56]  hover:bg-[#EBFF00]/10 rounded-full px-8 py-6 border-2 font-poppins font-medium text-[14px] leading-[14px] tracking-[0] text-center align-middle"
            >
              Become a Partner
            </Button>
          </div>
        </div>
        {/* Images on the right */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] z-10 pointer-events-none">
          <img
            src="/home/bg-circles.png"
            alt="Background Circles"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] object-contain opacity-80"
            style={{ zIndex: 1 }}
          />
          <img
            src="/home/hero-section-main.png"
            alt="Tray Main"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  h-auto object-contain drop-shadow-2xl"
            style={{ zIndex: 2 }}
          />
        </div>
      </div>
    </section>
  );
};

export const PartnersSection = () => {
  return (
    <section className="bg-black py-12">
      <div className="container mx-auto flex flex-col items-center px-4 md:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-lemon inline-block"></span>
          <span className="uppercase text-xs tracking-widest text-white font-semibold">
            Our Beloved Partners
          </span>
        </div>
        <div className="flex gap-8 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-black rounded-full p-4 shadow-lg border border-[#222] flex items-center justify-center w-28 h-28"
            >
              <img
                src="/home/radius-logo.png"
                alt="Radius Partner Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
