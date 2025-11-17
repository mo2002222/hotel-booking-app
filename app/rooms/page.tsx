"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { RoomFilters, type FilterState } from "@/components/rooms/room-filters"
import { RoomCard } from "@/components/rooms/room-card"
import { Button } from "@/components/ui/button"
import { rooms } from "@/lib/room-data"
import { Grid, List, SlidersHorizontal } from "lucide-react"

export default function RoomsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    roomType: "all",
    priceRange: [100, 700],
    guests: 1,
    amenities: [],
    availableOnly: true,
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          room.name.toLowerCase().includes(searchLower) ||
          room.description.toLowerCase().includes(searchLower) ||
          room.amenities.some((amenity) => amenity.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      // Room type filter
      if (filters.roomType !== "all" && room.type !== filters.roomType) {
        return false
      }

      // Price range filter
      if (room.price < filters.priceRange[0] || room.price > filters.priceRange[1]) {
        return false
      }

      // Guests filter
      if (room.maxGuests < filters.guests) {
        return false
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) => room.amenities.includes(amenity))
        if (!hasAllAmenities) return false
      }

      // Available only filter
      if (filters.availableOnly && !room.available) {
        return false;
      }

      return true
    })
  }, [filters])

  const sortedRooms = useMemo(() => {
    return [...filteredRooms].sort((a, b) => {
      // Popular rooms first
      if (a.isPopular && !b.isPopular) return -1
      if (!a.isPopular && b.isPopular) return 1

      // Available rooms first
      if (a.available && !b.available) return -1
      if (!a.available && b.available) return 1

      // Then by rating
      return b.rating - a.rating
    })
  }, [filteredRooms])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Our Rooms & Suites</h1>
              <p className="text-slate-600 mt-2">Discover the perfect accommodation for your stay</p>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <div className="lg:hidden">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <RoomFilters
              onFiltersChange={setFilters}
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                {sortedRooms.length} room{sortedRooms.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Room Grid/List */}
            {sortedRooms.length > 0 ? (
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
                {sortedRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-400 mb-4">
                  <Grid className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">No rooms found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your filters to see more results</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      search: "",
                      roomType: "all",
                      priceRange: [100, 700],
                      guests: 1,
                      amenities: [],
                      availableOnly: false,
                    })
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
