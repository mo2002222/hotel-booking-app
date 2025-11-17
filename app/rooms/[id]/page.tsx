// "use client"

// import { useState } from "react"
// import { Header } from "@/components/layout/header"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { rooms } from "@/lib/room-data"
// import { useAuth } from "@/lib/auth-context"
// import { Star, Users, Maximize, Bed, ArrowLeft, Calendar, Clock, Wifi, Car, Coffee, Waves } from "lucide-react"
// import Link from "next/link"
// import { notFound } from "next/navigation"

// interface RoomDetailPageProps {
//   params: {
//     id: string
//   }
// }

// export default function RoomDetailPage({ params }: RoomDetailPageProps) {
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [showAuthModal, setShowAuthModal] = useState(false)
//   const { user } = useAuth()
//   const room = rooms.find((r) => r.id === Number.parseInt(params.id))

//   if (!room) {
//     notFound()
//   }

//   const amenityIcons: Record<string, any> = {
//     "Free WiFi": Wifi,
//     "Valet Parking": Car,
//     "24/7 Room Service": Coffee,
//     "Spa & Pool": Waves,
//   }

//   const handleBookClick = () => {
//     if (!user) {
//       setShowAuthModal(true)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link href="/rooms">
//             <Button variant="ghost" className="flex items-center gap-2">
//               <ArrowLeft className="h-4 w-4" />
//               Back to Rooms
//             </Button>
//           </Link>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Image Gallery */}
//           <div className="lg:col-span-2">
//             <div className="space-y-4">
//               {/* Main Image */}
//               <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
//                 <img
//                   src={room.images[selectedImage] || "/placeholder.svg"}
//                   alt={room.name}
//                   className="w-full h-full object-cover"
//                 />
//                 {room.discount && (
//                   <Badge className="absolute top-4 left-4 bg-red-500 text-white">{room.discount}% OFF</Badge>
//                 )}
//               </div>

//               {/* Thumbnail Images */}
//               <div className="grid grid-cols-3 gap-4">
//                 {room.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
//                       selectedImage === index ? "border-blue-500" : "border-transparent"
//                     }`}
//                   >
//                     <img
//                       src={image || "/placeholder.svg"}
//                       alt={`${room.name} view ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Room Details */}
//           <div className="space-y-6">
//             {/* Basic Info */}
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h1 className="text-2xl font-bold text-slate-800 mb-2">{room.name}</h1>
//                     <p className="text-slate-600 capitalize">{room.type} Room</p>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
//                     <span className="font-medium">{room.rating}</span>
//                     <span className="text-sm text-slate-500">({room.reviewCount} reviews)</span>
//                   </div>
//                 </div>

//                 {/* Room Stats */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Users className="h-4 w-4" />
//                     <span className="text-sm">{room.maxGuests} guests</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Maximize className="h-4 w-4" />
//                     <span className="text-sm">{room.size} sq ft</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Bed className="h-4 w-4" />
//                     <span className="text-sm">{room.bedType}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Clock className="h-4 w-4" />
//                     <span className="text-sm">Check-in 3 PM</span>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="mb-6">
//                   {room.originalPrice && (
//                     <span className="text-lg text-slate-500 line-through mr-2">${room.originalPrice}</span>
//                   )}
//                   <span className="text-3xl font-bold text-slate-800">${room.price}</span>
//                   <span className="text-slate-600">/night</span>
//                 </div>

//                 {/* Book Button */}
//                 {room.available ? (
//                   user ? (
//                     <Link href={`/book/${room.id}`} className="block">
//                       <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
//                         <Calendar className="h-5 w-5 mr-2" />
//                         Book This Room
//                       </Button>
//                     </Link>
//                   ) : (
//                     <Button onClick={handleBookClick} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
//                       <Calendar className="h-5 w-5 mr-2" />
//                       Sign In to Book
//                     </Button>
//                   )
//                 ) : (
//                   <Button className="w-full" disabled>
//                     Currently Unavailable
//                   </Button>
//                 )}

//                 {room.available && (
//                   <p className="text-xs text-slate-500 text-center mt-2">
//                     Free cancellation up to 24 hours before check-in
//                   </p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Quick Info */}
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="font-semibold text-slate-800 mb-4">What's Included</h3>
//                 <div className="space-y-3">
//                   {[
//                     "Free WiFi throughout stay",
//                     "Daily housekeeping service",
//                     "Complimentary toiletries",
//                     "24/7 front desk support",
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
//                       <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Description and Amenities */}
//         <div className="mt-12 grid lg:grid-cols-2 gap-8">
//           {/* Description */}
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-xl font-semibold text-slate-800 mb-4">About This Room</h2>
//               <p className="text-slate-600 leading-relaxed mb-6">{room.description}</p>

//               <Separator className="my-6" />

//               <h3 className="font-semibold text-slate-800 mb-4">Room Features</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {room.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
//                     <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
//                     {feature}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Amenities */}
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-xl font-semibold text-slate-800 mb-4">Room Amenities</h2>
//               <div className="space-y-3">
//                 {room.amenities.map((amenity, index) => {
//                   const IconComponent = amenityIcons[amenity]
//                   return (
//                     <div key={index} className="flex items-center gap-3 text-slate-600">
//                       {IconComponent ? (
//                         <IconComponent className="h-5 w-5 text-blue-600" />
//                       ) : (
//                         <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
//                           <div className="w-2 h-2 bg-blue-600 rounded-full" />
//                         </div>
//                       )}
//                       <span>{amenity}</span>
//                     </div>
//                   )
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


import { rooms } from "@/lib/room-data"
import { notFound } from "next/navigation"
import RoomClient from "./RoomClient" 
import RoomDetailPage from "@/app/book/[id]/BookClient"

// ✅ Tell Next.js to statically generate all pages for each room ID
export async function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id.toString(),
  }))
}

export default function RoomPage({ params }: { params: { id: string } }) {
  const room = rooms.find((r) => r.id === Number.parseInt(params.id))

  if (!room) {
    notFound()
  }

  return <RoomDetailPage room={room} />
}
