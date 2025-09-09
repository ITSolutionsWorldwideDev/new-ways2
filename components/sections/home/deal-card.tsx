import Image from "next/image";

interface DealCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  isNew?: boolean;
  endTime: string;
}

function CountdownTimer() {
  return (
    <div className="flex gap-2 mt-4">
      {["Days", "Hours", "Mins", "Secs"].map((label, idx) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded px-4 py-2 min-w-[60px]"
        >
          <div className="text-lemon text-xl font-bold leading-none">00</div>
          <div className="text-xs text-gray-400 mt-1 font-medium">{label}</div>
        </div>
      ))}
    </div>
  );
}

export const DealCard = ({
  name,
  description,
  price,
  originalPrice,
  image,
  isNew,
}: DealCardProps) => {
  return (
    <div className="bg-[#18181B] rounded-2xl flex flex-row flex-shrink-0 snap-start overflow-hidden shadow-lg border border-[#222]">
      {/* Left: Product Image   min-w-[600px] max-w-[650px] */}
      {/* bg-[#111] */}
      <div className="flex items-center justify-center p-0 min-w-[260px] ">
        <div className="relative w-[220px] h-[165px] rounded-xl overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </div>
      {/* Right: Details */}
      <div className="flex flex-col justify-between p-8 flex-1">
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">{name}</h3>
          <div className="text-sm text-gray-400 mb-2 font-medium">Playon:</div>
          {isNew && (
            <span className="inline-block bg-lemon text-black px-4 py-1 text-sm font-bold rounded mb-4">
              NEW RELEASE
            </span>
          )}
          <p className="text-base text-white/80 mb-6">{description}</p>
        </div>
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-2">
            <span className="text-lemon text-2xl font-bold">
              ${price.toFixed(2)}
            </span>
            <span className="text-base text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
};
