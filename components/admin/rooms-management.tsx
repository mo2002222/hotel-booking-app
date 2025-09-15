"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { rooms, type Room } from "@/lib/room-data"
import { Hotel, Edit, Trash2, Plus, Search, Star } from "lucide-react"

export function RoomsManagement() {
  const [roomList, setRoomList] = useState<Room[]>(rooms)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRooms = roomList.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleAvailability = (roomId: number) => {
    setRoomList((prev) => prev.map((room) => (room.id === roomId ? { ...room, available: !room.available } : room)))
  }

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case "suite":
        return "bg-purple-100 text-purple-800"
      case "deluxe":
        return "bg-blue-100 text-blue-800"
      case "family":
        return "bg-green-100 text-green-800"
      case "standard":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Hotel className="h-5 w-5" />
            Room Management
          </CardTitle>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={room.image || "/placeholder.svg"}
                        alt={room.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-sm text-slate-500">{room.size} sq ft</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoomTypeColor(room.type)}>
                      {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">${room.price}</p>
                      {room.originalPrice && (
                        <p className="text-sm text-slate-500 line-through">${room.originalPrice}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{room.maxGuests} guests</p>
                      <p className="text-slate-500">{room.bedType}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{room.rating}</span>
                      <span className="text-sm text-slate-500">({room.reviewCount})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={room.available} onCheckedChange={() => toggleAvailability(room.id)} />
                      <span className="text-sm text-slate-600">{room.available ? "Available" : "Unavailable"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-slate-600">
          <p>
            Showing {filteredRooms.length} of {roomList.length} rooms
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Available: {roomList.filter((r) => r.available).length}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Unavailable: {roomList.filter((r) => !r.available).length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
