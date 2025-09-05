import React, { useState } from "react";

interface ShopFiltersProps {
  filters: {
    availability: string[];
    price: { min: number; max: number };
    color: string[];
    size: string[];
    brand: string[];
  };
  onFilterChange?: (filters: any) => void;
}

const colorEmojiMap:any = {
  Red: "🟥",
  Green: "🟩",
  White: "⬜",
  Yellow: "🟨",
  Blue: "🟦",
  Brown: "🟫",
  Orange: "🟧",
  Violet: "🟪",
  Indigo: "🔵",
};

const ShopFilters: React.FC<ShopFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [selected, setSelected] = useState({});

  const handleChange = (key: string, value: any) => {
    const updated = { ...selected, [key]: value };
    setSelected(updated);
    onFilterChange && onFilterChange(updated);
  };

  return (
    <div className="flex flex-row flex-wrap gap-2 items-center mb-4 w-full">
      <select
        className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm focus:outline-none transition-colors dark:bg-background dark:border-border dark:text-white"
        onChange={(e) => handleChange("availability", e.target.value)}
      >
        <option value="">Availability</option>
        {filters.availability.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 font-medium shadow-sm dark:bg-background dark:border-border dark:text-white">
        <span>Price:</span>
        {/* <input
          type="number"
          min={filters.price.min}
          max={filters.price.max}
          placeholder="Min"
          className="w-16 border rounded px-1"
          onChange={(e) => handleChange("priceMin", e.target.value)}
        />
        <span>-</span>
        <input
          type="number"
          min={filters.price.min}
          max={filters.price.max}
          placeholder="Max"
          className="w-16 border rounded px-1"
          onChange={(e) => handleChange("priceMax", e.target.value)}
        /> */}
      </div>
      <select
        className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm focus:outline-none transition-colors dark:bg-background dark:border-border dark:text-white"
        onChange={(e) => handleChange("color", e.target.value)}
      >
        <option value="">Color</option>
        {filters.color.map((opt) => (
          <option key={opt}> {colorEmojiMap[opt] || "⬛"} {opt}</option>
        ))}
      </select>
      <select
        className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm focus:outline-none transition-colors dark:bg-background dark:border-border dark:text-white"
        onChange={(e) => handleChange("size", e.target.value)}
      >
        <option value="">Size</option>
        {filters.size.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm focus:outline-none transition-colors dark:bg-background dark:border-border dark:text-white"
        onChange={(e) => handleChange("brand", e.target.value)}
      >
        <option value="">Brand</option>
        {filters.brand.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search products..."
        className="rounded-full border border-gray-200 bg-white text-gray-900 px-4 py-2 font-medium shadow-sm ml-2 dark:bg-background dark:border-border dark:text-white"
        onChange={(e) => handleChange("search", e.target.value)}
      />
      <label className="flex items-center ml-4 rounded-full border border-gray-200 bg-white px-3 py-1 font-medium shadow-sm dark:bg-background dark:border-border dark:text-white">
        <input
          type="checkbox"
          onChange={(e) => handleChange("selectAll", e.target.checked)}
          className="mr-2 accent-lemon"
        />
        Select All
      </label>
    </div>
  );
};

export default ShopFilters;
