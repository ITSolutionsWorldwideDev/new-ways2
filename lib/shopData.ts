import { colorsData, brandData,sizesData } from "./filterData";

export const shopData = {
  banner: {
    title: "Wraps",
    image: "/default-header.png",
    breadcrumb: ["Home", "Blunt", "Wraps"],
    description:
      "A very short description limiting the category products. It can go up to 2 lines just like this dummy text.",
  },
  filters: {
    availability: ["In Stock", "Out of Stock"],
    price: { min: 8, max: 120 },
    color: colorsData.map((c) => c.name),
    size: sizesData.map((c) => c.name),
    brand: brandData.map((c) => c.name),
    // size: ["1 pcs", "10 pcs"],
    // brand: [
    //   "G-Rollz Collectors",
    //   "Pets Rock",
    //   "Radio Days",
    //   "Banksy's Graffiti",
    //   "Cheech & Chong™",
    //   "Dunkees",
    //   "Ape Cones",
    //   "Hello Kitty",
    //   "Narcos",
    // ],
  },
  sortOptions: [
    "Best Selling",
    "Price: Low to High",
    "Price: High to Low",
    "Alphabetically: A-Z",
    "Alphabetically: Z-A",
    "Date, old to new",
    "Date, new to old",
  ],
  products: [
    {
      id: "GC3500-DIS",
      key: "GC3500-DIS",
      title: "'Rap' Organic Green Hemp - 3 KS Cones",
      image: "/dummy/deal-1.png",
      priceRange: [8, 120],
      variants: [
        { label: "8.00 € | 1 pcs", value: "1" },
        { label: "120.00 € | 10 pcs", value: "10" },
      ],
      inStock: true,
    },
    {
      id: "GC3500-DIS2",
      key: "GC3500-DIS2",
      title: "'Rap' Organic Green Hemp - 3 KS Cones",
      image: "/dummy/deal-1.png",
      priceRange: [8, 120],
      variants: [
        { label: "8.00 € | 1 pcs", value: "1" },
        { label: "120.00 € | 10 pcs", value: "10" },
      ],
      inStock: true,
    },
    {
      id: "GC3500-DIS3",
      key: "GC3500-DIS3",
      title: "'Rap' Organic Green Hemp - 3 KS Cones",
      image: "/dummy/deal-1.png",
      priceRange: [8, 120],
      variants: [
        { label: "8.00 € | 1 pcs", value: "1" },
        { label: "120.00 € | 10 pcs", value: "10" },
      ],
      inStock: true,
    },
    // ...add more products as needed
  ],
  pagination: {
    currentPage: 1,
    totalPages: 3,
  },
};
