import React from "react";

interface ShopSortProps {
  options: string[];
  onSortChange?: (value: string) => void;
}

const ShopSort: React.FC<ShopSortProps> = ({ options, onSortChange }) => (
  <select
    className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm focus:outline-none transition-colors dark:bg-background dark:border-border dark:text-white"
    onChange={(e) => onSortChange && onSortChange(e.target.value)}
  >
    {options.map((opt) => (
      <option key={opt}>{opt}</option>
    ))}
  </select>
);

export default ShopSort;
