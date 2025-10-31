"use client"

// import { useState } from "react"
// import { Header } from "@/components/layout/header"
// import { BookingForm } from "@/components/booking/booking-form"
// import { BookingConfirmation } from "@/components/booking/booking-confirmation"
// import { Button } from "@/components/ui/button"
// import { rooms } from "@/lib/room-data"
// import { addBooking, type Booking, type BookingFormData } from "@/lib/booking-data"
// import { useAuth } from "@/lib/auth-context"
// import { ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import { notFound, useRouter } from "next/navigation"
// import { format } from "date-fns"

// interface BookPageProps {
//   params: {
//     id: string
//   }
// }

// export default function BookPage({ params }: BookPageProps) {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [booking, setBooking] = useState<Booking | null>(null)

//   const room = rooms.find((r) => r.id === Number.parseInt(params.id))

//   if (!room) {
//     notFound()
//   }

//   if (!user) {
//     router.push("/")
//     return null
//   }

//   const handleBookingSubmit = async (data: BookingFormData & { checkIn: Date; checkOut: Date }) => {
//     setIsLoading(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24))
//     const subtotal = nights * room.price
//     const total = subtotal * 1.12 // Including taxes

//     const newBooking: Booking = {
//       id: `booking-${Date.now()}`,
//       roomId: room.id,
//       roomName: room.name,
//       userId: user.id,
//       userName: `${data.firstName} ${data.lastName}`,
//       userEmail: data.email,
//       checkIn: format(data.checkIn, "yyyy-MM-dd"),
//       checkOut: format(data.checkOut, "yyyy-MM-dd"),
//       guests: data.guests,
//       totalNights: nights,
//       pricePerNight: room.price,
//       totalPrice: Math.round(total),
//       status: "confirmed",
//       createdAt: new Date().toISOString(),
//       specialRequests: data.specialRequests,
//     }

//     addBooking(newBooking)
//     setBooking(newBooking)
//     setIsLoading(false)
//   }

//   if (booking) {
//     return (
//       <div className="min-h-screen bg-slate-50">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <BookingConfirmation booking={booking} />
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header />

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link href={`/rooms/${room.id}`}>
//             <Button variant="ghost" className="flex items-center gap-2">
//               <ArrowLeft className="h-4 w-4" />
//               Back to Room Details
//             </Button>
//           </Link>
//         </div>

//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800 mb-2">Complete Your Booking</h1>
//           <p className="text-slate-600">
//             You're booking <span className="font-medium">{room.name}</span> at LuxeStay Hotel
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Room Summary */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               <div className="bg-white rounded-lg shadow-sm border p-6">
//                 <img
//                   src={room.image || "/placeholder.svg"}
//                   alt={room.name}
//                   className="w-full h-48 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-slate-800 mb-2">{room.name}</h3>
//                 <p className="text-slate-600 text-sm mb-4">{room.description}</p>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Room type:</span>
//                     <span className="font-medium capitalize">{room.type}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Max guests:</span>
//                     <span className="font-medium">{room.maxGuests}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Size:</span>
//                     <span className="font-medium">{room.size} sq ft</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Price per night:</span>
//                     <span className="font-medium text-lg">${room.price}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Booking Form */}
//           <div className="lg:col-span-2">
//             <BookingForm room={room} onSubmit={handleBookingSubmit} isLoading={isLoading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Header } from "@/components/layout/header"
// import { BookingForm } from "@/components/booking/booking-form"
// import { BookingConfirmation } from "@/components/booking/booking-confirmation"
// import { Button } from "@/components/ui/button"
// import { rooms } from "@/lib/room-data"
// import { addBooking, type Booking, type BookingFormData } from "@/lib/booking-data"
// import { useAuth } from "@/lib/auth-context"
// import { ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import { notFound, useRouter } from "next/navigation"
// import { format } from "date-fns"

// interface BookPageProps {
//   params: {
//     id: string
//   }
// }

// // ✅ ADD THIS FUNCTION
// export async function generateStaticParams() {
//   return rooms.map((room) => ({
//     id: room.id.toString(),
//   }))
// }

// export default function BookPage({ params }: BookPageProps) {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [booking, setBooking] = useState<Booking | null>(null)

//   const room = rooms.find((r) => r.id === Number.parseInt(params.id))

//   if (!room) {
//     notFound()
//   }

//   if (!user) {
//     router.push("/")
//     return null
//   }

//   const handleBookingSubmit = async (data: BookingFormData & { checkIn: Date; checkOut: Date }) => {
//     setIsLoading(true)

//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24))
//     const subtotal = nights * room.price
//     const total = subtotal * 1.12

//     const newBooking: Booking = {
//       id: `booking-${Date.now()}`,
//       roomId: room.id,
//       roomName: room.name,
//       userId: user.id,
//       userName: `${data.firstName} ${data.lastName}`,
//       userEmail: data.email,
//       checkIn: format(data.checkIn, "yyyy-MM-dd"),
//       checkOut: format(data.checkOut, "yyyy-MM-dd"),
//       guests: data.guests,
//       totalNights: nights,
//       pricePerNight: room.price,
//       totalPrice: Math.round(total),
//       status: "confirmed",
//       createdAt: new Date().toISOString(),
//       specialRequests: data.specialRequests,
//     }

//     addBooking(newBooking)
//     setBooking(newBooking)
//     setIsLoading(false)
//   }

//   if (booking) {
//     return (
//       <div className="min-h-screen bg-slate-50">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <BookingConfirmation booking={booking} />
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header />
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-6">
//           <Link href={`/rooms/${room.id}`}>
//             <Button variant="ghost" className="flex items-center gap-2">
//               <ArrowLeft className="h-4 w-4" />
//               Back to Room Details
//             </Button>
//           </Link>
//         </div>

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800 mb-2">Complete Your Booking</h1>
//           <p className="text-slate-600">
//             You're booking <span className="font-medium">{room.name}</span> at LuxeStay Hotel
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               <div className="bg-white rounded-lg shadow-sm border p-6">
//                 <img
//                   src={room.image || "/placeholder.svg"}
//                   alt={room.name}
//                   className="w-full h-48 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-slate-800 mb-2">{room.name}</h3>
//                 <p className="text-slate-600 text-sm mb-4">{room.description}</p>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Room type:</span>
//                     <span className="font-medium capitalize">{room.type}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Max guests:</span>
//                     <span className="font-medium">{room.maxGuests}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Size:</span>
//                     <span className="font-medium">{room.size} sq ft</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-600">Price per night:</span>
//                     <span className="font-medium text-lg">${room.price}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-2">
//             <BookingForm room={room} onSubmit={handleBookingSubmit} isLoading={isLoading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { rooms } from "@/lib/room-data"
import { notFound } from "next/navigation"
import BookClient from "./BookClient" // ✅ import client-only component

// ✅ Generates static params so Next.js can prebuild each page
export async function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id.toString(),
  }))
}

// ✅ This file must NOT use useState, useRouter, useAuth, etc.
export default function BookPage({ params }: { params: { id: string } }) {
  const room = rooms.find((r) => r.id === Number.parseInt(params.id))

  if (!room) {
    notFound()
  }

  return <BookClient room={room} />
}
