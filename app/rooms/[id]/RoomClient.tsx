"use client"

import { Header } from "@/components/layout/header"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RoomClient({ room }: { room: any }) {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Room Details */}
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{room.name}</h1>
        <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-slate-600 mb-4">{room.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Room type:</span>
            <span className="font-medium capitalize">{room.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Max guests:</span>
            <span className="font-medium">{room.maxGuests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Size:</span>
            <span className="font-medium">{room.size} sq ft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Price per night:</span>
            <span className="font-medium text-lg">${room.price}</span>
          </div>
        </div>

        <div className="mt-6">
          <Link href={`/book/${room.id}`}>
            <Button>Book This Room</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
