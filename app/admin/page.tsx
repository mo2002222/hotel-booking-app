"use client"

import { useEffect } from "react"
import { Header } from "@/components/layout/header"
import { AdminStats } from "@/components/admin/admin-stats"
import { BookingsTable } from "@/components/admin/bookings-table"
import { RoomsManagement } from "@/components/admin/rooms-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { BarChart3, Calendar, Hotel, Users, Settings, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/")
      return
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Manage your hotel operations and bookings</p>
            </div>
            <Badge className="bg-purple-100 text-purple-800">Administrator</Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Overview</h2>
          <AdminStats />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="guests" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guests
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Bookings Management */}
          <TabsContent value="bookings">
            <BookingsTable />
          </TabsContent>

          {/* Rooms Management */}
          <TabsContent value="rooms">
            <RoomsManagement />
          </TabsContent>

          {/* Guests Management */}
          <TabsContent value="guests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Guest Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 mb-2">Guest Management</h3>
                  <p className="text-slate-600 mb-4">
                    View and manage guest accounts, preferences, and booking history
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-slate-800">156</div>
                      <div className="text-sm text-slate-600">Total Guests</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-slate-800">23</div>
                      <div className="text-sm text-slate-600">VIP Members</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-slate-800">8</div>
                      <div className="text-sm text-slate-600">New This Month</div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 mb-2">Analytics Dashboard</h3>
                  <p className="text-slate-600 mb-4">
                    View detailed analytics, revenue reports, and performance metrics
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <Card className="p-6">
                      <h4 className="font-semibold text-slate-800 mb-2">Revenue Analytics</h4>
                      <p className="text-sm text-slate-600 mb-4">Track revenue trends and forecasts</p>
                      <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                        <span className="text-slate-500">Revenue Chart</span>
                      </div>
                    </Card>
                    <Card className="p-6">
                      <h4 className="font-semibold text-slate-800 mb-2">Occupancy Trends</h4>
                      <p className="text-sm text-slate-600 mb-4">Monitor room occupancy patterns</p>
                      <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                        <span className="text-slate-500">Occupancy Chart</span>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Hotel Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">General Settings</h4>
                      <p className="text-sm text-slate-600">Hotel information and policies</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Pricing Rules</h4>
                      <p className="text-sm text-slate-600">Manage room rates and discounts</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Notifications</h4>
                      <p className="text-sm text-slate-600">Configure email and SMS alerts</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">User Management</h4>
                      <p className="text-sm text-slate-600">Manage admin users and permissions</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    System Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">New booking received</p>
                        <p className="text-sm text-blue-700">Ocean View Suite - John Doe</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">New</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">Payment confirmed</p>
                        <p className="text-sm text-green-700">Booking #booking-1 - $897</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div>
                        <p className="font-medium text-amber-900">Check-in reminder</p>
                        <p className="text-sm text-amber-700">3 guests checking in today</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">Reminder</Badge>
                    </div>
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
