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

export type Material = {
  id: number;
  name: string;
};

export type PaperType = {
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

export const materialData: Material[] = [
  {
    id: 1,
    name: "Paper",
  },
  {
    id: 2,
    name: "Leaf",
  },
  {
    id: 3,
    name: "Acrylic",
  },
  {
    id: 4,
    name: "Bamboo",
  },
  {
    id: 5,
    name: "Metal",
  },
  {
    id: 6,
    name: "Magnet",
  },
  {
    id: 7,
    name: "Aluminum",
  },
  {
    id: 8,
    name: "Glass",
  },
  {
    id: 9,
    name: "Canvas",
  },
];

export const PaperTypeData: PaperType[] = [
  {
    id: 1,
    name: "Unbleached",
  },
  {
    id: 2,
    name: "Bamboo",
  },
  {
    id: 3,
    name: "Organic Hemp",
  },
  {
    id: 4,
    name: "Green Hemp",
  },
  {
    id: 5,
    name: "Lightly Dyed Blue",
  },
  {
    id: 6,
    name: "Lightly Dyed Pink",
  },
  {
    id: 7,
    name: "Medicago Sativa",
  },
  {
    id: 8,
    name: "Gold",
  },
  {
    id: 9,
    name: "White",
  },
  {
    id: 10,
    name: "Spanish Hemp",
  },
  {
    id: 11,
    name: "USA Hemp Green",
  },
  {
    id: 12,
    name: "Pineapple",
  },
  {
    id: 13,
    name: "Mango",
  },
  {
    id: 14,
    name: "Blueberry",
  },
  {
    id: 15,
    name: "Rose",
  },
  {
    id: 16,
    name: "Goji",
  },
  {
    id: 17,
    name: "Mint",
  },
  {
    id: 18,
    name: "Herbal Blend",
  },
  {
    id: 19,
    name: "Tobacco Leaf",
  },
];

export const ArtWorkData: PaperType[] = [
  {
    id: 1,
    name: "G-Rollz",
  },
]

/* 

2,"Colossal Dream"
3,"Rap"
4,"Reggae"
5,"Mexico"
6,"Serenade"
7,"Fabulous Face"
8,"Rude Copper"
9,"Torch Boy"
10,"Sofa"
11,"Grunge"
12,"Vintage Faces"
13,"High Rollers"
14,"Kissing Coppers"
15,"Alice"
16,"Teen"
17,"London Take Over"
18,"Blue Spark"
19,"Thug For Life"
20,"Lowrider"
21,"Dr. Whiskerz"
22,"Soup"
23,"Flower Thrower"
24,"Joint Venture"
25,"Panda Gunnin` - Thug for Life"
26,"Bandaged Heart - Queen Bowie"


27,"Classic"
28,"Diamond - Fool"
29,"Vegas - Pop"
30,"Reggae - Rap"
31,"Scientist"
32,"Mushroom Lover"
33,"Thug for Life - Kissing Girl Cops"

34,"Forest Kiss"
35,"Eve"
36,"Mushroom Whisper"
37,"Sun Flowers"
38,"Skate Goblin"
39,"Two Rap"
40,"Panda Gunnin`"
41,"The Hustler"
42,"Livin` the Dream"
43,"Tour Bus"
44,"Picnic"
45,"Praying Boy"
46,"Hot Rod"
47,"Kung Fu"
48,"Tiki Amsterdam"
49,"Split"
50,"Mushroom Stairs"
51,"Lizzie Stardust"
52,"Bored Ape #3124"
53,"Bored Ape #3676"
54,"Bored Ape #9939"
55,"Bored Ape #1659"
56,"Bored Ape #761"
57,"Bored Ape #5125"
58,"Bored Ape #3720"
59,"Bored Ape #7016"
60,"Bored Ape #5526"
61,"Pop"
62,"Fruits"
63,"Shroomie"
64,"Dali"
65,"Spy Booth"
66,"Panda with Guns"
67,"Blazing Tulips"
68,"Purple Haze Tour"
69,"Prayer"
70,"Grassroot Skeleton"
71,"Amsterdam Picnic Blue"
72,"Amsterdam Picnic Green"
73,"Amsterdam Picnic Candy Pink"
74,"Amsterdam Picnic Pink"
75,"Amsterdam Picnic Red"
76,"Amsterdam Picnic Yellow"
77,"Umbrella girl"
78,"Girl Floating"
79,"Follow"
80,"Breakfast"
81,"GG"
82,"Psychedelic"
83,"Diamond"
84,"Raggae"
85,"Tramp"
86,"Vegas"
87,"Serenade The Crowd"
88,"Purple Haze"
89,"Auto Parts"
90,"Queen Bowie"
91,"Smoke Cloud"
92,"Greatest Hits"
93,"Amsterdam Canna Lions"
94,"Moth Lick"
95,"Smokey Sisters"
96,"Fly High"
97,"Vondel Nymph"
98,"Canna Bath"
99,"Amsterdam Picnic Valentines"
100,"Amsterdam Mad Scientist"
101,"Roxy"
102,"Fool"
103,"Diamonds"
104,"Kimono Pink"
105,"Harajuku"
106,"Retro Tourist"
107,"Doctor"
108,"Space"
109,"Neon Amsterdam"
110,"Classic Amsterdam"
111,"Mona Launcher"
112,"Trippy"
113,"Kimono"
114,"Best Hits"
115,"Pajama Party"
116,"Avocado"
117,"Amsterdam Neon Lights"
118,"Western"
119,"Brain"
120,"Amsterdam Picnic"
121,"Amsterdam Picnic Checked"
122,"Bulletproof Dove"
123,"Playing Cards"
124,"Amsterdam Picnic - Wake n Bake - Colossal Dream - Amsterdam Picnic Valentines"
125,"Canna Bath - Vondel Nymph - Amsterdam Picnic Checked - Sea Weed"
126,"Space - Neon Amsterdam"
127,"School"
128,"Amsterdam Picnic - Mushroom Lover - Wake n Bake"
129,"Amsterdam Picnic Checked - Colossal Dream"
130,"Bong Fiction - Mushroom Lover"
131,"Canna Bath - Vondel Nymph - Sea Weed"
132,"Pop - Vegas"
133,"Roxy - Grunge - Psychedelic"
134,"Badge - Greatest Hits - Playing Cards"
135,"Retro Tourist - Classic Amsterdam"
136,"Amsterdam Picnic - Mushroom Dream - Wake n Bake"
137,"Amsterdam Picnic Checked - Colossal Dream - Amsterdam Picnic Valentines"
138,"Lizzie Stardust - Torch Boy - Praying Boy"
139,"Soldier Being Frisked"
140,"Bulletproof Dover - Kissing Coppers - Flower Thrower"
141,"Roxy - Psychedlic - Grunge"
142,"Badge"
143,"Best Hits - Classic"
144,"Kimono Pink - Kimono Red - Pajama party"
145,"Kimono Red"
146,"Amsterdam Neon Lights - Classic - Neon Amsterdam"
147,"Cheerleader"
148,"Canna Bath - Sea Weed"
149,"Bong Fiction - Amsterdam Picnic"
150,"Fantasy - Vondel Nymph"
151,"Mushroom Dream - Mushroom Lover"
152,"Wake n Bake - Colossal Dream"
153,"Bandaged Heart"
154,"Spy Booth - Soldier Being Frisked"
155,"Mona Launcha - Paint Roller Rat"
156,"Paint Roller Rat"
157,"Hit Dogs"
158,"Big Doggie"
159,"Camo"
160,"Cupido"
161,"Camden Maid"
162,"Girl Frisking Soldiering Girl"
163,"Ikea Punk"
164,"Snowflake Boy"
165,"Old Skool"
166,"Blind Napoleon"
167,"Fast Food Caveman"
168,"Retro Classic"
169,"Speeding Tricycle"
170,"Lean"
171,"Smoking Brothers"
172,"Panda Gunnin"
173,"Girl Frisking Soldier"
174,"Balloon Girl"
175,"Bronx Zoo Leopard"
176,"Crayon Shooter"
177,"Pablo`s War"
178,"King"
179,"El Patrón"
180,"Worldwide"
181,"Truth"
182,"Escobar Legacy"
183,"Logo"
184,"El Patron`s Reserve"
185,"Medellin Mango"
186,"Banana Bandit"
187,"Colombian Cream"
188,"Blueberry"
189,"Watermelon Punch"
190,"Passion Fruit"
191,"Mix"
 */