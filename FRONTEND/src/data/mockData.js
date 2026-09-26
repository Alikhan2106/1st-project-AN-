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
  { id: "b1", name: "Traditional Pottery Workshop", type: "Workshop", distance: "0.8 km", price: "₹300" },
  { id: "b2", name: "Mewari Family Restaurant", type: "Food", distance: "1.2 km", price: "₹250" },
  { id: "b3", name: "Heritage Old-City Walking Tour", type: "Guide", distance: "0.5 km", price: "₹500" }
];