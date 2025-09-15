"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"
import { roomTypes, amenityFilters } from "@/lib/room-data"

interface RoomFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  isOpen: boolean
  onToggle: () => void
}

export interface FilterState {
  search: string
  roomType: string
  priceRange: [number, number]
  guests: number
  amenities: string[]
  availableOnly: boolean
}

export function RoomFilters({ onFiltersChange, isOpen, onToggle }: RoomFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    roomType: "all",
    priceRange: [100, 700],
    guests: 1,
    amenities: [],
    availableOnly: true,
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      roomType: "all",
      priceRange: [100, 700],
      guests: 1,
      amenities: [],
      availableOnly: true,
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    updateFilters({ amenities: newAmenities })
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-transparent"
        >
          <Filter className="h-4 w-4" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Rooms</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by name or amenities..."
                  value={filters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <Label>Room Type</Label>
              <Select value={filters.roomType} onValueChange={(value) => updateFilters({ roomType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range (per night)</Label>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  max={700}
                  min={100}
                  step={25}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label>Number of Guests</Label>
              <Select
                value={filters.guests.toString()}
                onValueChange={(value) => updateFilters({ guests: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {amenityFilters.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={filters.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm font-normal">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Only */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={filters.availableOnly}
                onCheckedChange={(checked) => updateFilters({ availableOnly: !!checked })}
              />
              <Label htmlFor="available" className="text-sm font-normal">
                Show available rooms only
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
