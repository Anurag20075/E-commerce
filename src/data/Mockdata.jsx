const mockProducts = [
  // T-Shirts & Apparel
  {
    id: 1,
    name: "Custom T-Shirt",
    price: 18.99,
    category: "T-Shirts",
    customizable: true,
    bestSeller: true,
    description: "Full Color | Cotton Blend",
    material: "Cotton",
    colors: ["cyan", "magenta", "yellow", "black", "white"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Premium Hoodie",
    price: 45.99,
    category: "Hoodies",
    customizable: true,
    bestSeller: true,
    description: "DTG Print | Premium Cotton",
    material: "Cotton",
    colors: ["black", "cyan", "magenta"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Logo Polo Shirt",
    price: 32.99,
    category: "T-Shirts",
    customizable: true,
    bestSeller: false,
    description: "Embroidered | Pique Cotton",
    material: "Cotton",
    colors: ["white", "black", "cyan"],
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },

  // Business Cards & Stationery
  {
    id: 4,
    name: "Premium Business Cards",
    price: 24.99,
    category: "Business Cards",
    customizable: true,
    bestSeller: true,
    description: "CMYK Print | Matte Finish",
    material: "Paper Stock",
    colors: ["cyan", "magenta", "yellow", "black"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Letterhead Design",
    price: 19.99,
    category: "Stationery",
    customizable: true,
    bestSeller: false,
    description: "Professional Layout | High Quality",
    material: "Paper Stock",
    colors: ["cyan", "magenta", "yellow", "black"],
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Custom Notebook",
    price: 16.99,
    category: "Stationery",
    customizable: true,
    bestSeller: false,
    description: "Spiral Bound | Custom Cover",
    material: "Paper Stock",
    colors: ["cyan", "magenta", "yellow", "black"],
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },

  // Posters & Large Format
  {
    id: 7,
    name: "Event Poster A2",
    price: 12.99,
    category: "Posters",
    customizable: true,
    bestSeller: true,
    description: "Full Color | Gloss Finish",
    material: "Paper Stock",
    colors: ["cyan", "magenta", "yellow", "black"],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 8,
    name: "Canvas Print Large",
    price: 89.99,
    category: "Posters",
    customizable: true,
    bestSeller: false,
    description: "High Resolution | Gallery Wrap",
    material: "Canvas",
    colors: ["cyan", "magenta", "yellow", "black"],
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 9,
    name: "Banner Vinyl",
    price: 34.99,
    category: "Banners",
    customizable: true,
    bestSeller: true,
    description: "Weather Resistant | Full Color",
    material: "Vinyl",
    colors: ["cyan", "magenta", "yellow", "black"],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },

  // Mugs & Drinkware
  {
    id: 10,
    name: "Custom Photo Mug",
    price: 14.99,
    category: "Mugs",
    customizable: true,
    bestSeller: true,
    description: "Sublimation Print | Dishwasher Safe",
    material: "Ceramic",
    colors: ["white", "black", "cyan"],
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 11,
    name: "Travel Mug Steel",
    price: 24.99,
    category: "Mugs",
    customizable: true,
    bestSeller: false,
    description: "Laser Engraved | Insulated",
    material: "Stainless Steel",
    colors: ["silver", "black", "cyan"],
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 12,
    name: "Magic Color Mug",
    price: 19.99,
    category: "Mugs",
    customizable: true,
    bestSeller: true,
    description: "Heat Activated | Color Change",
    material: "Ceramic",
    colors: ["black", "cyan", "magenta"],
    image:
      "https://images.unsplash.com/photo-1580752300992-559f8e0734e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },

  // Branded Items
  {
    id: 13,
    name: "Logo Pen Set",
    price: 12.99,
    category: "Stationery",
    customizable: true,
    bestSeller: false,
    description: "Laser Engraved | Premium Feel",
    material: "Metal",
    colors: ["silver", "black", "cyan"],
    image:
      "https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 14,
    name: "Corporate Folder",
    price: 8.99,
    category: "Stationery",
    customizable: true,
    bestSeller: false,
    description: "Professional Print | Pocket Design",
    material: "Paper Stock",
    colors: ["cyan", "magenta", "yellow", "black"],
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },

  // Promotional Items
  {
    id: 15,
    name: "Tote Bag Canvas",
    price: 22.99,
    category: "Bags",
    customizable: true,
    bestSeller: true,
    description: "Screen Print | Eco Friendly",
    material: "Canvas",
    colors: ["white", "black", "cyan", "magenta"],
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 16,
    name: "Keychain Metal",
    price: 6.99,
    category: "Accessories",
    customizable: true,
    bestSeller: false,
    description: "Laser Cut | Custom Shape",
    material: "Metal",
    colors: ["silver", "black", "cyan"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },

  // New Arrival Items
  {
    id: 17,
    name: "Eco T-Shirt Organic",
    price: 26.99,
    category: "T-Shirts",
    customizable: true,
    bestSeller: false,
    description: "Organic Cotton | Water-based Ink",
    material: "Organic Cotton",
    colors: ["white", "black", "cyan"],
    isNewArrival: true,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 18,
    name: "LED Sign Acrylic",
    price: 79.99,
    category: "Signs",
    customizable: true,
    bestSeller: false,
    description: "RGB Backlight | Custom Cut",
    material: "Acrylic",
    colors: ["clear", "cyan", "magenta", "yellow"],
    isNewArrival: true,
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
];
export default mockProducts;
