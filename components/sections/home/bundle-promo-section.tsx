import Image from "next/image";
import { Button } from "@/components/ui/button";

interface BundlePromoSectionProps {
  reverse?: boolean;
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

export const BundlePromoSection = ({
  reverse = false,
  title,
  description,
  buttonText,
  image,
}: BundlePromoSectionProps) => {
  return (
    <section className="py-20 bg-[#131313]">
      <div
        className={`container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between gap-12 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text Content */}
        <div className="flex-1 max-w-xl">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${reverse ? "text-right" : ""}`} >
            {/* text-3xl md:text-4xl font-bold text-white mb-6 flex items-center */}
            {title}🍃
          </h2>
          <div className="w-full float-none  mb-8">

          <div className={`h-1 w-32 bg-lemon ${reverse ? "float-right" : ""}`} />
          </div>
          {/* h-1 w-32 bg-lemon mb-8 */}
          <p className={`text-gray-300 mb-8 whitespace-pre-line  font-normal text-[13px] leading-[22px] tracking-[0] ${reverse ? "text-right" : ""}`} >
            {/* className="text-lg text-gray-300 mb-8 whitespace-pre-line " */}

            {/* class="font-rubik font-normal text-[13px] leading-[22px] tracking-[0] align-middle" */}
            {description}
          </p>
          <Button 
          className={`bg-lemon text-black hover:bg-lemon/90 px-10 py-4 text-lg font-bold rounded-full ${reverse ? "float-end" : ""}`} >
          {/* bg-lemon text-black hover:bg-lemon/90 px-10 py-4 text-lg font-bold rounded-full */}
            {buttonText}
          </Button>
        </div>
        {/* Image */}
        <div className={`${reverse ? "flex-1 flex  items-end" : "float-end"}`}>
          {/*  drop-shadow-2xl */}
          {/* flex-1 flex  justify-center items-left  */}
          <img
            src={image}
            alt={title}
            className="max-w-[520px] w-full h-auto"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};
