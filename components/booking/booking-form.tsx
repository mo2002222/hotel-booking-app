"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DatePicker } from "./date-picker"
import type { Room } from "@/lib/room-data"
import type { BookingFormData } from "@/lib/booking-data"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Lock, Users } from "lucide-react"
import { differenceInDays } from "date-fns"

interface BookingFormProps {
  room: Room
  onSubmit: (data: BookingFormData & { checkIn: Date; checkOut: Date }) => void
  isLoading: boolean
}

export function BookingForm({ room, onSubmit, isLoading }: BookingFormProps) {
  const { user } = useAuth()
  const [checkIn, setCheckIn] = useState<Date | undefined>()
  const [checkOut, setCheckOut] = useState<Date | undefined>()
  const [guests, setGuests] = useState(1)
  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    specialRequests: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: user?.name || "",
  })

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0
  const subtotal = nights * room.price
  const taxes = subtotal * 0.12
  const total = subtotal + taxes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkIn || !checkOut) return

    onSubmit({
      ...formData,
      checkIn,
      checkOut,
      guests,
    })
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dates and Guests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DatePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />

          <div className="space-y-2">
            <Label>Number of Guests</Label>
            <Select value={guests.toString()} onValueChange={(value) => setGuests(Number.parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => updateFormData("specialRequests", e.target.value)}
              placeholder="Any special requests or preferences..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              value={formData.cardName}
              onChange={(e) => updateFormData("cardName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => updateFormData("cardNumber", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) => updateFormData("expiryDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => updateFormData("cvv", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      {nights > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{room.name}</span>
                <span className="font-medium">${room.price}/night</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>
                  {nights} nights × ${room.price}
                </span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Taxes & fees</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              disabled={!checkIn || !checkOut || isLoading}
            >
              {isLoading ? "Processing..." : `Complete Booking - $${total.toFixed(2)}`}
            </Button>

            <p className="text-xs text-slate-500 text-center">Free cancellation up to 24 hours before check-in</p>
          </CardContent>
        </Card>
      )}
    </form>
  )
}
