"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { format, addDays, differenceInDays } from "date-fns"

interface DatePickerProps {
  checkIn: Date | undefined
  checkOut: Date | undefined
  onCheckInChange: (date: Date | undefined) => void
  onCheckOutChange: (date: Date | undefined) => void
}

export function DatePicker({ checkIn, checkOut, onCheckInChange, onCheckOutChange }: DatePickerProps) {
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)

  const handleCheckInSelect = (date: Date | undefined) => {
    onCheckInChange(date)
    if (date && checkOut && date >= checkOut) {
      onCheckOutChange(addDays(date, 1))
    }
    setCheckInOpen(false)
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    onCheckOutChange(date)
    setCheckOutOpen(false)
  }

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Check-in Date */}
        <div className="space-y-2">
          <Label>Check-in Date</Label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={handleCheckInSelect}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <Label>Check-out Date</Label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={handleCheckOutSelect}
                disabled={(date) => date <= (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {nights > 0 && (
        <div className="text-sm text-slate-600 text-center">
          {nights} night{nights !== 1 ? "s" : ""} selected
        </div>
      )}
    </div>
  )
}
