"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, DollarSign, Hotel, TrendingUp, Clock } from "lucide-react"
import { getAllBookings } from "@/lib/booking-data"
import { rooms } from "@/lib/room-data"

export function AdminStats() {
  const allBookings = getAllBookings()
  const confirmedBookings = allBookings.filter((b) => b.status === "confirmed")
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0)
  const occupancyRate = Math.round((confirmedBookings.length / rooms.length) * 100)
  const avgBookingValue = confirmedBookings.length > 0 ? Math.round(totalRevenue / confirmedBookings.length) : 0

  const todayBookings = allBookings.filter((b) => {
    const today = new Date().toISOString().split("T")[0]
    return b.checkIn === today
  })

  const stats = [
    {
      title: "Total Bookings",
      value: allBookings.length,
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Occupancy Rate",
      value: `${occupancyRate}%`,
      icon: Hotel,
      color: "bg-purple-100 text-purple-600",
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "Avg Booking Value",
      value: `$${avgBookingValue}`,
      icon: TrendingUp,
      color: "bg-amber-100 text-amber-600",
      change: "+3%",
      changeType: "positive" as const,
    },
    {
      title: "Check-ins Today",
      value: todayBookings.length,
      icon: Clock,
      color: "bg-red-100 text-red-600",
      change: "2 pending",
      changeType: "neutral" as const,
    },
    {
      title: "Active Guests",
      value: confirmedBookings
        .filter((b) => {
          const today = new Date()
          const checkIn = new Date(b.checkIn)
          const checkOut = new Date(b.checkOut)
          return checkIn <= today && checkOut >= today
        })
        .reduce((sum, b) => sum + b.guests, 0),
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
      change: "8 rooms",
      changeType: "neutral" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
            <div className="flex items-center gap-2">
              <Badge
                variant={stat.changeType === "positive" ? "default" : "secondary"}
                className={
                  stat.changeType === "positive" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                }
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
