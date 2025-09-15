export interface Room {
  id: number
  name: string
  type: "standard" | "deluxe" | "suite" | "family"
  price: number
  originalPrice?: number
  image: string
  images: string[]
  rating: number
  reviewCount: number
  amenities: string[]
  features: string[]
  description: string
  maxGuests: number
  size: number
  bedType: string
  available: boolean
  isPopular?: boolean
  discount?: number
}

export const rooms: Room[] = [
  {
    id: 1,
    name: "Ocean View Suite",
    type: "suite",
    price: 299,
    originalPrice: 349,
    image: "/luxury-hotel-ocean-view-suite.jpg",
    images: ["/luxury-hotel-ocean-view-suite.jpg", "/ocean-view-bedroom.jpg", "/ocean-view-balcony.jpg"],
    rating: 4.9,
    reviewCount: 127,
    amenities: ["Ocean View", "King Bed", "Balcony", "Mini Bar", "Room Service"],
    features: ["Free WiFi", "Air Conditioning", "Safe", "Coffee Machine"],
    description:
      "Wake up to breathtaking ocean views in our luxurious suite featuring a private balcony, king-size bed, and premium amenities.",
    maxGuests: 2,
    size: 650,
    bedType: "King Bed",
    available: true,
    isPopular: true,
    discount: 15,
  },
  {
    id: 2,
    name: "Executive Room",
    type: "deluxe",
    price: 199,
    image: "/modern-hotel-executive-room.png",
    images: ["/modern-hotel-executive-room.png", "/executive-desk.jpg", "/city-view-window.jpg"],
    rating: 4.7,
    reviewCount: 89,
    amenities: ["City View", "Work Desk", "Mini Bar", "Business Center Access"],
    features: ["Free WiFi", "Air Conditioning", "Safe", "Iron & Board"],
    description:
      "Perfect for business travelers, featuring a dedicated workspace, city views, and modern amenities for productivity and comfort.",
    maxGuests: 2,
    size: 450,
    bedType: "Queen Bed",
    available: true,
  },
  {
    id: 3,
    name: "Family Suite",
    type: "family",
    price: 349,
    image: "/spacious-hotel-family-suite.jpg",
    images: ["/spacious-hotel-family-suite.jpg", "/placeholder-6uoro.png", "/placeholder-kbp5e.png"],
    rating: 4.8,
    reviewCount: 156,
    amenities: ["2 Bedrooms", "Living Area", "Kitchenette", "Sofa Bed"],
    features: ["Free WiFi", "Air Conditioning", "Safe", "Microwave", "Refrigerator"],
    description:
      "Spacious family accommodation with separate bedrooms, living area, and kitchenette. Perfect for extended stays with children.",
    maxGuests: 6,
    size: 850,
    bedType: "2 Queen Beds + Sofa Bed",
    available: false,
  },
  {
    id: 4,
    name: "Standard Room",
    type: "standard",
    price: 149,
    image: "/placeholder-ha4xy.png",
    images: ["/placeholder-ha4xy.png", "/placeholder-rncyd.png"],
    rating: 4.5,
    reviewCount: 203,
    amenities: ["Garden View", "Double Bed", "Work Desk"],
    features: ["Free WiFi", "Air Conditioning", "Safe", "Hair Dryer"],
    description:
      "Comfortable and affordable accommodation with modern amenities and garden views. Perfect for budget-conscious travelers.",
    maxGuests: 2,
    size: 320,
    bedType: "Double Bed",
    available: true,
  },
  {
    id: 5,
    name: "Deluxe Ocean Room",
    type: "deluxe",
    price: 249,
    image: "/placeholder-3s86h.png",
    images: ["/placeholder-3s86h.png", "/placeholder-eg0vz.png"],
    rating: 4.6,
    reviewCount: 94,
    amenities: ["Partial Ocean View", "King Bed", "Marble Bathroom", "Mini Bar"],
    features: ["Free WiFi", "Air Conditioning", "Safe", "Bathrobe", "Slippers"],
    description: "Elegant room with partial ocean views, marble bathroom, and luxury amenities for a memorable stay.",
    maxGuests: 2,
    size: 480,
    bedType: "King Bed",
    available: true,
    isPopular: true,
  },
  {
    id: 6,
    name: "Presidential Suite",
    type: "suite",
    price: 599,
    originalPrice: 699,
    image: "/placeholder-b9m57.png",
    images: ["/placeholder-b9m57.png", "/placeholder-ph3zb.png", "/placeholder-oa04c.png"],
    rating: 5.0,
    reviewCount: 45,
    amenities: ["Panoramic Ocean View", "Separate Living Room", "Dining Area", "Butler Service", "Private Terrace"],
    features: ["Free WiFi", "Air Conditioning", "Safe", "Jacuzzi", "Premium Minibar", "Concierge Service"],
    description:
      "The ultimate luxury experience with panoramic ocean views, separate living and dining areas, and personalized butler service.",
    maxGuests: 4,
    size: 1200,
    bedType: "King Bed + Sofa Bed",
    available: true,
    discount: 15,
  },
]

export const roomTypes = [
  { value: "all", label: "All Rooms" },
  { value: "standard", label: "Standard" },
  { value: "deluxe", label: "Deluxe" },
  { value: "suite", label: "Suite" },
  { value: "family", label: "Family" },
]

export const amenityFilters = [
  "Ocean View",
  "City View",
  "Balcony",
  "Mini Bar",
  "Work Desk",
  "Kitchenette",
  "Living Area",
  "Butler Service",
  "Private Terrace",
]
