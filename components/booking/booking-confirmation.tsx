"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Users, MapPin, Phone, Mail, Download } from "lucide-react"
import type { Booking } from "@/lib/booking-data"
import { format } from "date-fns"
import Link from "next/link"

interface BookingConfirmationProps {
  booking: Booking
}

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h1>
          <p className="text-slate-600">
            Your reservation has been successfully confirmed. We've sent a confirmation email to {booking.userEmail}.
          </p>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>Booking Details</CardTitle>
            <Badge className="bg-green-100 text-green-800">
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Booking ID</p>
              <p className="font-medium">{booking.id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Room</p>
              <p className="font-medium">{booking.roomName}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-medium">Check-in: {format(new Date(booking.checkIn), "EEEE, MMMM dd, yyyy")}</p>
                <p className="text-sm text-slate-600">After 3:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-medium">Check-out: {format(new Date(booking.checkOut), "EEEE, MMMM dd, yyyy")}</p>
                <p className="text-sm text-slate-600">Before 11:00 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-medium">
                  {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                </p>
                <p className="text-sm text-slate-600">
                  {booking.totalNights} {booking.totalNights === 1 ? "night" : "nights"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Room rate ({booking.totalNights} nights)</span>
              <span>${(booking.totalPrice / 1.12).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Taxes & fees</span>
              <span>${((booking.totalPrice * 0.12) / 1.12).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Paid</span>
              <span>${booking.totalPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">{booking.userName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium">{booking.userName}</p>
              <p className="text-sm text-slate-600">Primary guest</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <Mail className="h-4 w-4" />
            <span>{booking.userEmail}</span>
          </div>
        </CardContent>
      </Card>

      {/* Hotel Information */}
      <Card>
        <CardHeader>
          <CardTitle>Hotel Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-slate-400" />
            <div>
              <p className="font-medium">LuxeStay Hotel</p>
              <p className="text-sm text-slate-600">123 Luxury Ave, City Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <Phone className="h-4 w-4" />
            <span>(555) 123-4567</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Download Confirmation
        </Button>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">View My Bookings</Button>
        </Link>
      </div>

      {/* Important Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Please bring a valid photo ID for check-in</li>
            <li>• Free cancellation up to 24 hours before check-in</li>
            <li>• Check-in starts at 3:00 PM, check-out by 11:00 AM</li>
            <li>• Contact the hotel directly for any special requests</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
