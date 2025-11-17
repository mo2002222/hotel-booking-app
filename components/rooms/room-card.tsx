"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Maximize, Bed, Eye } from "lucide-react"
import type { Room } from "@/lib/room-data"
import Link from "next/link"

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={room.image || "/placeholder.svg"}
          alt={room.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {room.isPopular && <Badge className="bg-amber-500 text-white">Popular</Badge>}
          {room.discount && <Badge className="bg-red-500 text-white">{room.discount}% OFF</Badge>}
        </div>

        {!room.available && <Badge className="absolute top-3 right-3 bg-slate-500">Unavailable</Badge>}

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Link href={`/rooms/${room.id}`}>
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-3">
        <div className="flex justify-between items-start whitespace-nowrap flex-col mb-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-1">{room.name}</h3>
            <p className="text-sm text-slate-600 capitalize">{room.type} Room</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{room.rating}</span>
            <span className="text-xs text-slate-500">({room.reviewCount})</span>
          </div>
        </div>

        {/* Room Details */}
        <div className="flex items-start gap-2 text-sm text-slate-600 mb-4 xl:flex-col">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{room.size} sq ft</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{room.bedType}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{room.description}</p>

        {/* Price and Book Button */}
        <div className="flex justify-between items-center gap-2 flex-col">
          <div>
            {room.originalPrice && (
              <span className="text-sm text-slate-500 line-through mr-2">${room.originalPrice}</span>
            )}
            <span className="text-2xl font-bold text-slate-800">${room.price}</span>
            <span className="text-slate-600">/night</span>
          </div>
          <Link href={`/rooms/${room.id}`} className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-md text-sm font-medium">
            {room.available ? "Book Now" : "Unavailable"}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
