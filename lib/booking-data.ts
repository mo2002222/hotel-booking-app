export interface Booking {
  id: string
  roomId: number
  roomName: string
  userId: string
  userName: string
  userEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalNights: number
  pricePerNight: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  createdAt: string
  specialRequests?: string
}

export interface BookingFormData {
  checkIn: string
  checkOut: string
  guests: number
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

// Mock bookings storage
const mockBookings: Booking[] = [
  {
    id: "booking-1",
    roomId: 1,
    roomName: "Ocean View Suite",
    userId: "2",
    userName: "John Doe",
    userEmail: "guest@example.com",
    checkIn: "2024-12-15",
    checkOut: "2024-12-18",
    guests: 2,
    totalNights: 3,
    pricePerNight: 299,
    totalPrice: 897,
    status: "confirmed",
    createdAt: "2024-12-01T10:00:00Z",
    specialRequests: "Late check-in requested",
  },
]

export const addBooking = (booking: Booking) => {
  mockBookings.push(booking)
}

export const getBookingsByUser = (userId: string): Booking[] => {
  return mockBookings.filter((booking) => booking.userId === userId)
}

export const getAllBookings = (): Booking[] => {
  return mockBookings
}

export const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
  const booking = mockBookings.find((b) => b.id === bookingId)
  if (booking) {
    booking.status = status
  }
}
