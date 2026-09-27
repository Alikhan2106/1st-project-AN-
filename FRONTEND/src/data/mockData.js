export const UDAIPUR_ATTRACTIONS = [
  {
    id: "1",
    name: "City Palace",
    category: "Heritage",
    cost: 400,
    timeMinutes: 150,
    tags: ["History", "Architecture", "Photography"],
    crowdLevel: 88, // Overcrowded!
    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600",
    description: "Massive palace complex overlooking Lake Pichola.",
    alternativeId: "2"
  },
  {
    id: "2",
    name: "Ahar Cenotaphs",
    category: "Heritage",
    cost: 50,
    timeMinutes: 60,
    tags: ["History", "Photography"],
    crowdLevel: 22, // Low crowd
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
    description: "Royal cenotaphs of the Maharanas of Mewar. Peaceful and historic.",
    isAlternative: true
  },
  {
    id: "3",
    name: "Shilpgram Artisan Village",
    category: "Artisan",
    cost: 100,
    timeMinutes: 120,
    tags: ["Handicrafts", "Culture", "Local"],
    crowdLevel: 35,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600",
    isLocalBusiness: true,
    description: "Rural arts and crafts complex promoting traditional artisans."
  }
];



export const MOCK_LOCAL_BUSINESSES = [
  {
    id: 1,
    cityId: "udaipur",
    name: "Jharokha Lake Cafe",
    type: "Cafe",
    distance: "0.4 km away",
    price: "₹300 - ₹600",
  },
  {
    id: 2,
    cityId: "udaipur",
    name: "Traditional Pichola Crafts",
    type: "Handicraft",
    distance: "0.8 km away",
    price: "₹500 - ₹2,000",
  },
  {
    id: 3,
    cityId: "agra",
    name: "Petha Junction",
    type: "Food",
    distance: "1.2 km away",
    price: "₹150 - ₹400",
  },
  {
    id: 4,
    cityId: "jaipur",
    name: "Hawa Mahal Handlooms",
    type: "Handicraft",
    distance: "0.5 km away",
    price: "₹400 - ₹1,500",
  },
];