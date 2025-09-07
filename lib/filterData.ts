export type Color = {
  id: number;
  name: string;
  code: string;
};

export type Size = {
  id: number;
  name: string;
};

export type Brand = {
  id: number;
  name: string;
};

export const colorsData: Color[] = [
  {
    id: 1,
    name: "Blue",
    code: "bg-[#31344F]",
  },
  {
    id: 2,
    name: "Green",
    code: "bg-[#314F4A]",
  },
  {
    id: 3,
    name: "Yellow",
    code: "bg-[#FFFF00]",
  },
  {
    id: 4,
    name: "Orange",
    code: "bg-[#FFA500]",
  },
  {
    id: 5,
    name: "Red",
    code: "bg-[#FF0000]",
  },
  {
    id: 6,
    name: "Grey",
    code: "bg-[#808080]",
  },
  {
    id: 7,
    name: "Pink",
    code: "bg-[#FFC0CB]",
  },
  {
    id: 8,
    name: "Brown",
    code: "bg-[#4F4631]",
  },
  {
    id: 9,
    name: "Vintage",
    code: "bg-[#CDA777]",
  },
  {
    id: 10,
    name: "Black",
    code: "bg-[#000000]",
  },
  {
    id: 11,
    name: "White",
    code: "bg-[#FFFFFF]",
  },
  {
    id: 12,
    name: "Purple",
    code: "bg-[#A020F0]",
  },
  {
    id: 13,
    name: "Gold",
    code: "bg-[#FFD700]",
  },
  {
    id: 14,
    name: "Rasta",
    code: "bg-[#e20d0d]",
  },

  
// Matchcode
  
  // {
  //   id: 6,
  //   name: "Violet",
  //   code: "bg-[#8F00FF]",
  // },
  // {
  //   id: 7,
  //   name: "Indigo",
  //   code: "bg-[#4B0082]",
  // },
  
  // {
  //   id: 16,
  //   name: "Multicolor",
  //   code: "",
  // },
];

export const brandData: Brand[] = [
  {
    id: 1,
    name: "G-Rollz Collectors",
  },
  {
    id: 2,
    name: "Pets Rock",
  },
  {
    id: 3,
    name: "Radio Days",
  },
  {
    id: 4,
    name: "Banksy's Graffiti",
  },
  {
    id: 5,
    name: "Cheech & Chong™",
  },
  {
    id: 6,
    name: "Dunkees",
  },
  {
    id: 7,
    name: "Ape Cones",
  },
  {
    id: 8,
    name: "Hello Kitty",
  },
  {
    id: 9,
    name: "Narcos",
  },
];

export const sizesData: Size[] = [
  {
    id: 1,
    name: "King Size",
  },
  {
    id: 2,
    name: "Quarter Size",
  },
  {
    id: 3,
    name: "2 x 6 cm",
  },
  {
    id: 4,
    name: "2.5 x 6 cm",
  },
  {
    id: 5,
    name: "12 cm",
  },
  {
    id: 6,
    name: "28 x 17 cm",
  },
  {
    id: 7,
    name: "20 x 16 cm",
  },
  {
    id: 8,
    name: "19 x 14 cm",
  },
  {
    id: 9,
    name: "19 x 23 cm",
  },
  {
    id: 10,
    name: "28.5 x 21.5 cm",
  },
  {
    id: 11,
    name: "22 x 25 cm",
  },
  {
    id: 12,
    name: "26 x 49 cm",
  },
  {
    id: 13,
    name: "7.5 x 20 cm",
  },
  {
    id: 14,
    name: "13 cm",
  },
  {
    id: 15,
    name: "10 cm",
  },
  {
    id: 16,
    name: "5 cm",
  },
  {
    id: 17,
    name: "32 x 7 cm",
  },
  {
    id: 18,
    name: "29 x 34 x 20 cm",
  },
  {
    id: 19,
    name: "24 x 34 x 18 cm",
  },
  {
    id: 20,
    name: "30 x 34 x 10 cm",
  },
  {
    id: 21,
    name: "27.5 x 30 x 25.5 cm",
  },
  {
    id: 22,
    name: "28 x 17 x 9 cm",
  },
  {
    id: 23,
    name: "26 x 7 x 2 cm",
  },
  {
    id: 24,
    name: "32 x 8 x 3 cm",
  },
  {
    id: 25,
    name: "32 x 16 x 6 cm",
  },
  {
    id: 26,
    name: "33 x 16 x 6 cm",
  },
  {
    id: 27,
    name: "36 x 10 x 3 cm",
  },
  {
    id: 28,
    name: "35 x 22 x 3 cm",
  },
  {
    id: 29,
    name: "35 x 17 x 4.5 cm",
  },
  {
    id: 30,
    name: "14 x 18 cm",
  },
  {
    id: 31,
    name: "17.5 x 27.5 cm",
  },
  {
    id: 32,
    name: "27.5 x 17.5 cm",
  },
  {
    id: 33,
    name: "12 x 4 x 2.5 cm",
  },
  {
    id: 34,
    name: "11.5 x 6.5 x 2.8 cm",
  },
  {
    id: 35,
    name: "13 x 8.5 x 3 cm",
  },
  {
    id: 36,
    name: "13.5 cm",
  },
  {
    id: 37,
    name: "70 x 60 mm",
  },
  {
    id: 38,
    name: "65 x 85 mm ",
  },
  {
    id: 39,
    name: "90 x 80 mm",
  },
  {
    id: 40,
    name: "105 x 80 mm",
  },
  {
    id: 41,
    name: "100 x 125 mm",
  },
  {
    id: 42,
    name: "100 x 150 mm",
  },
  {
    id: 43,
    name: "150 x 200 mm",
  },
  {
    id: 44,
    name: "200 x 300 mm",
  },
  {
    id: 45,
    name: "43 mm",
  },
  {
    id: 46,
    name: "53 mm",
  },
  {
    id: 47,
    name: "32 x 45 x 2 cm",
  },
  {
    id: 48,
    name: "45 x 32 x 2 cm",
  },
  {
    id: 49,
    name: "48 x 67.5 x 2.5 cm",
  },
  {
    id: 50,
    name: "67.5 x 48 x 2 cm",
  },
  {
    id: 51,
    name: "64 x 90 x 3 cm",
  },
  {
    id: 52,
    name: "90 x 64 x 3 cm",
  },
  {
    id: 53,
    name: "37 x 28 x 5 cm",
  },
  {
    id: 54,
    name: "36 x 23 x 5 cm",
  },
  {
    id: 55,
    name: "28 x 23 x 5 cm",
  },
];
