"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { BookingCard } from "@/components/dashboard/booking-card"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { getBookingsByUser, type Booking } from "@/lib/booking-data"
import { Calendar, User, Settings, CreditCard, Bell, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [activeTab, setActiveTab] = useState("bookings")

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    // Load user bookings
    const userBookings = getBookingsByUser(user.id)
    setBookings(userBookings)
  }, [user, router])

  const handleBookingStatusChange = () => {
    if (user) {
      const updatedBookings = getBookingsByUser(user.id)
      setBookings(updatedBookings)
    }
  }

  if (!user) {
    return null
  }

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" && new Date(b.checkIn) > new Date())
  const pastBookings = bookings.filter((b) => b.status === "confirmed" && new Date(b.checkOut) < new Date())
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-slate-600">Manage your bookings and account settings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{upcomingBookings.length}</p>
                  <p className="text-sm text-slate-600">Upcoming Stays</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{pastBookings.length}</p>
                  <p className="text-sm text-slate-600">Completed Stays</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    ${bookings.reduce((sum, b) => (b.status === "confirmed" ? sum + b.totalPrice : sum), 0)}
                  </p>
                  <p className="text-sm text-slate-600">Total Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{user.role === "admin" ? "Admin" : "Guest"}</p>
                  <p className="text-sm text-slate-600">Account Type</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {/* Upcoming Bookings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Upcoming Bookings</h2>
                <Badge variant="secondary">{upcomingBookings.length}</Badge>
              </div>

              {upcomingBookings.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} onStatusChange={handleBookingStatusChange} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No upcoming bookings</h3>
                    <p className="text-slate-600 mb-4">Ready to plan your next getaway?</p>
                    <Link href={`/rooms`} className="bg-blue-600 p-2 text-white rounded-md hover:bg-blue-700">Browse Rooms</Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Past Bookings</h2>
                  <Badge variant="secondary">{pastBookings.length}</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} onStatusChange={handleBookingStatusChange} />
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled Bookings */}
            {cancelledBookings.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Cancelled Bookings</h2>
                  <Badge variant="secondary">{cancelledBookings.length}</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {cancelledBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} onStatusChange={handleBookingStatusChange} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="max-w-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Profile Information</h2>
                <p className="text-slate-600">Update your personal information and preferences</p>
              </div>
              <ProfileForm />
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="max-w-2xl space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Account Settings</h2>
                <p className="text-slate-600">Manage your account security and preferences</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Login History
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="max-w-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Notification Preferences</h2>
                <p className="text-slate-600">Choose how you want to be notified</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No new notifications</h3>
                    <p className="text-slate-600">You're all caught up!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
