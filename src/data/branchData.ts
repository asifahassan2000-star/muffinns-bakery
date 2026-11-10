export interface BakeryBranch {
  id: number;
  name: string;
  shortName: string;
  tag: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  openingHours: string;
  services: string[];
  plusCode?: string;
  mapsQuery: string;
}

export const BRAND_HEADLINES = {
  brandName: "Muffins – Sweets & Bakers (پتاشہ / Patashay)",
  mainHeadline: "Decadence in Every Bite",
  subHeadline: "Handcrafted gourmet pastries baked fresh for your daily indulgence.",
  ctaButtonText: "ORDER NOW",
  heritageTagline: "Where Generational Mithai Craft Meets Modern Artisanal Baking — Bahawalpur, Punjab (Since 1988).",
  kitchenIntroHeading: "The Patisserie Craft Since 1988",
  kitchenLeadParagraph:
    "We craft slow-baked pastries and pure royal sweets for patrons who appreciate true uncompromising taste. Every recipe relies on copper cauldron reduction, stone-cracked cardamom, farm-fresh milk, and French double cream without shortcuts.",
  heroEditorialLeft:
    "Handcrafted croissants, warm muffins and slow-simmered royal halwas baked with pure farm desi ghee.",
  heroEditorialRight:
    "Traditional recipes perfected since 1988 for weddings, cherished gatherings and refined daily indulgence.",
  operatingHours: "Ovens hot daily: 06:00 AM – 12:00 Midnight.",
  whatsappLines: "+92 320 2587047 / 0302 6567774",
  complaintsEmail: "Muffinnscomplain@gmail.com"
};

export const BAHAWALPUR_BRANCHES: BakeryBranch[] = [
  {
    id: 1,
    name: "Muffinns Sweets & Bakers (Trust Colony Branch)",
    shortName: "Trust Colony",
    tag: "Flagship Store • Branch 1",
    address: "Circular Road, Near Trust Colony Chowk, Bahawalpur",
    phone: "03026567774",
    phoneDisplay: "0302 6567774",
    openingHours: "08:00 AM – 12:00 AM",
    services: ["Takeaway", "Dine-in", "Express Home Delivery"],
    plusCode: "9M7V+8P Bahawalpur",
    mapsQuery: "Muffinns Sweets Bakers Trust Colony Circular Road Bahawalpur"
  },
  {
    id: 2,
    name: "Muffinns Sweets & Bakers (Aziz Bhatti Road)",
    shortName: "Model Town",
    tag: "Model Town • Branch 2",
    address: "28 Aziz Bhatti Shaheed Rd, Model Town, Bahawalpur",
    phone: "03026567774",
    phoneDisplay: "0302 6567774",
    openingHours: "08:00 AM – 11:30 PM",
    services: ["Delivery", "Takeaway", "Dine-in"],
    plusCode: "9M5V+GHP Bahawalpur",
    mapsQuery: "Muffinns Sweets Bakers Aziz Bhatti Road Model Town Bahawalpur"
  },
  {
    id: 3,
    name: "Muffinns Sweets & Bakers (Rafi Qamar Road)",
    shortName: "Satellite Town",
    tag: "Satellite Town • Branch 3",
    address: "Rafi Qamar Road Chowk, Satellite Town, Bahawalpur",
    phone: "03326567774",
    phoneDisplay: "0332 6567774",
    openingHours: "08:30 AM – 12:00 AM",
    services: ["Takeaway", "Dine-in", "Delivery"],
    mapsQuery: "Muffinns Sweets Bakers Rafi Qamar Road Satellite Town Bahawalpur"
  },
  {
    id: 4,
    name: "Muffins Patashay (Madni Town Branch)",
    shortName: "Madni Town",
    tag: "Hasilpur Road • Branch 4",
    address: "Hasilpur Road, Madni Town, Bahawalpur",
    phone: "03316567780",
    phoneDisplay: "0331 6567780",
    openingHours: "08:00 AM – 11:45 PM",
    services: ["Dine-in", "Takeaway", "Delivery"],
    plusCode: "9QP3+GCG Bahawalpur",
    mapsQuery: "Muffins Patashay Hasilpur Road Madni Town Bahawalpur"
  },
  {
    id: 5,
    name: "Muffinns Sweets & Bakers (Jhangi Wala Road)",
    shortName: "Jhangi Wala Road",
    tag: "Jhangi Wala • Branch 5",
    address: "Jhangi Wala Road, CP42+3PM, Bahawalpur",
    phone: "03306567774",
    phoneDisplay: "0330 6567774",
    openingHours: "09:00 AM – 11:00 PM",
    services: ["Delivery", "Takeaway"],
    plusCode: "CP42+3PM Bahawalpur",
    mapsQuery: "Muffinns Sweets Bakers Jhangi Wala Road Bahawalpur"
  },
  {
    id: 6,
    name: "Muffinns Sweets & Bakers (IUB Baghdad Campus)",
    shortName: "IUB Baghdad Campus",
    tag: "University Sector • Branch 6",
    address: "Opposite Islamia University Baghdad-ul-Jadeed Campus, Bahawalpur",
    phone: "03316567774",
    phoneDisplay: "0331 6567774",
    openingHours: "08:00 AM – 11:00 PM",
    services: ["Takeaway", "Campus Delivery"],
    mapsQuery: "Muffinns Sweets Bakers Islamia University Baghdad ul Jadeed Campus Bahawalpur"
  },
  {
    id: 7,
    name: "Muffinns Cafe & Sweets (Farid Gate Road)",
    shortName: "Farid Gate",
    tag: "Commercial Market • Branch 7",
    address: "Near Farid Gate, Commercial Market, Bahawalpur",
    phone: "03279497421",
    phoneDisplay: "0327 9497421",
    openingHours: "09:00 AM – 12:00 AM",
    services: ["Takeaway", "Dine-in"],
    plusCode: "9M5V+GHP Bahawalpur",
    mapsQuery: "Muffinns Cafe Sweets Farid Gate Commercial Market Bahawalpur"
  }
];
