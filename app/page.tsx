"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Car, Coffee, Waves, Hotel } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featuredRooms = [
    {
      id: 1,
      name: "Ocean View Suite",
      price: 299,
      image: "/luxury-hotel-ocean-view-suite.jpg",
      rating: 4.9,
      amenities: ["Ocean View", "King Bed", "Balcony"],
      available: true,
    },
    {
      id: 2,
      name: "Executive Room",
      price: 199,
      image: "/modern-hotel-executive-room.png",
      rating: 4.7,
      amenities: ["City View", "Work Desk", "Mini Bar"],
      available: true,
    },
    {
      id: 3,
      name: "Family Suite",
      price: 349,
      image: "/spacious-hotel-family-suite.jpg",
      rating: 4.8,
      amenities: ["2 Bedrooms", "Living Area", "Kitchenette"],
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/luxury-hotel-lobby.png')" }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Experience Luxury at LuxeStay
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 text-pretty">
            Discover exceptional comfort and world-class service in the heart of
            the city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg"
            >
              Book Your Stay
            </Button>
            <Link href="/rooms">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg bg-transparent"
              >
                Explore Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Why Choose LuxeStay?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience unparalleled comfort with our premium amenities and
              exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wifi,
                title: "Free WiFi",
                desc: "High-speed internet throughout the hotel",
              },
              {
                icon: Car,
                title: "Valet Parking",
                desc: "Complimentary parking with valet service",
              },
              {
                icon: Coffee,
                title: "24/7 Room Service",
                desc: "Gourmet dining delivered to your room",
              },
              {
                icon: Waves,
                title: "Spa & Pool",
                desc: "Relax in our world-class spa and pool",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Featured Rooms
            </h2>
            <p className="text-lg text-slate-600">
              Discover our most popular accommodations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <Card
                key={room.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  {!room.available && (
                    <Badge className="absolute top-3 right-3 bg-red-500">
                      Booked
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-slate-600">
                        {room.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">
                        ${room.price}
                      </span>
                      <span className="text-slate-600">/night</span>
                    </div>
                    <Link href={`/rooms/${room.id}`}>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={!room.available}
                      >
                        {room.available ? "Book Now" : "Unavailable"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/rooms">
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-transparent"
              >
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="h-6 w-6" />
                <span className="text-lg font-bold">LuxeStay</span>
              </div>
              <p className="text-slate-400">
                Experience luxury and comfort at our premium hotel locations
                worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Rooms & Suites
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Amenities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Dining
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Luxury Ave, City Center</span>
                </div>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@luxestay.com</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <p className="text-slate-400 mb-4">
                Stay connected for exclusive offers
              </p>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-400 hover:bg-slate-700 bg-transparent"
              >
                Subscribe to Newsletter
              </Button>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 LuxeStay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
