import React from "react";

interface ShopSortProps {
  options: string[];
  onSortChange?: (value: string) => void;
}

const ShopSort: React.FC<ShopSortProps> = ({ options, onSortChange }) => {
  return (
    <select
      onChange={(e) => onSortChange?.(e.target.value)}
      className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm focus:outline-none transition-colors dark:bg-background dark:border-border dark:text-white"
      defaultValue=""
    >
      <option value="" disabled>
        Sort by
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {formatLabel(opt)}
        </option>
      ))}
    </select>
  );
};

const formatLabel = (key: string) => {
  switch (key) {
    case "Matchcode":
      return "Matchcode";
    case "BestSelling":
      return "Best Selling";
    case "priceAsc":
      return "Price: Low to High";
    case "priceDesc":
      return "Price: High to Low";
    case "nameAsc":
      return "Name: A-Z";
    case "nameDesc":
      return "Name: Z-A";
    case "dateAsc":
      return "Date: Old to New";
    case "dateDesc":
      return "Date: New to Old";
    default:
      return key;
  }
};
// const ShopSort: React.FC<ShopSortProps> = ({ options, onSortChange }) => (
//   <select
//     className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm focus:outline-none transition-colors dark:bg-background dark:border-border dark:text-white"
//     onChange={(e) => onSortChange && onSortChange(e.target.value)}
//   >
//     {options.map((opt) => (
//       <option key={opt}>{opt}</option>
//     ))}
//   </select>
// );

export default ShopSort;
