export interface BookingRoom {
  id: number;
  bookingId: number;
  roomId: number;
  pricingRuleId?: number | null;
  price: number;
  quantity: number;
  note?: string | null;
  createdAt?: string;
}

export interface Booking {
  id: number;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  bookingType: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  status: string;
  totalAmount: number;
  note?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  bookingRooms: BookingRoom[];
}

export async function getBookings(): Promise<Booking[]> {
  const response = await fetch(
    "http://localhost:5000/api/Booking/GetAllBookings",
  );

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách booking");
  }

  return response.json();
}

export async function getBookingById(
  bookingId: number,
): Promise<Booking> {
  const response = await fetch(
    `http://localhost:5000/api/Booking/GetBookingById?bookingId=${bookingId}`,
  );

  if (!response.ok) {
    throw new Error("Không thể lấy thông tin booking");
  }

  return response.json();
}

export async function createBooking(
  booking: Omit<Booking, "id" | "createdAt" | "updatedAt">,
): Promise<void> {
  const response = await fetch(
    "http://localhost:5000/api/Booking/CreateBooking",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    },
  );

  if (!response.ok) {
    throw new Error("Không thể tạo booking");
  }
}

export async function updateBooking(
  bookingId: number,
  booking: Booking,
): Promise<void> {
  const response = await fetch(
    `http://localhost:5000/api/Booking/UpdateBooking?bookingId=${bookingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    },
  );

  if (!response.ok) {
    throw new Error("Không thể cập nhật booking");
  }
}

export async function deleteBooking(
  bookingId: number,
): Promise<void> {
  const response = await fetch(
    `http://localhost:5000/api/Booking/DeleteBooking?bookingId=${bookingId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Không thể xóa booking");
  }
}