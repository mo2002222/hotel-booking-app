"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, Phone, Mail, X } from "lucide-react"
import { type Booking, updateBookingStatus } from "@/lib/booking-data"
import { format, isPast, differenceInDays } from "date-fns"
import { useState } from "react"

interface BookingCardProps {
  booking: Booking
  onStatusChange?: () => void
}

export function BookingCard({ booking, onStatusChange }: BookingCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const checkInDate = new Date(booking.checkIn)
  const checkOutDate = new Date(booking.checkOut)
  const isUpcoming = !isPast(checkInDate)
  const canCancel = isUpcoming && differenceInDays(checkInDate, new Date()) > 1

  const handleCancel = async () => {
    if (!canCancel) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateBookingStatus(booking.id, "cancelled")
    onStatusChange?.()
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{booking.roomName}</h3>
            <p className="text-sm text-slate-600">Booking ID: {booking.id}</p>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium">Check-in</p>
              <p className="text-sm text-slate-600">{format(checkInDate, "MMM dd, yyyy")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium">Check-out</p>
              <p className="text-sm text-slate-600">{format(checkOutDate, "MMM dd, yyyy")}</p>
            </div>
          </div>
        </div>

        {/* Guest Info */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            {booking.guests} {booking.guests === 1 ? "guest" : "guests"} • {booking.totalNights}{" "}
            {booking.totalNights === 1 ? "night" : "nights"}
          </span>
        </div>

        <Separator />

        {/* Price */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Total paid</span>
          <span className="text-lg font-semibold text-slate-800">${booking.totalPrice}</span>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && (
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-slate-800 mb-1">Special Requests</p>
            <p className="text-sm text-slate-600">{booking.specialRequests}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            View Details
          </Button>
          {canCancel && booking.status === "confirmed" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
            >
              <X className="h-4 w-4 mr-1" />
              {isLoading ? "Cancelling..." : "Cancel"}
            </Button>
          )}
        </div>

        {/* Hotel Contact */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">Hotel Contact</p>
          <div className="space-y-1 text-xs text-blue-800">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span>123 Luxury Ave, City Center</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <span>info@luxestay.com</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
