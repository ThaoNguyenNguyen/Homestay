import { useEffect, useState } from "react";
import { getBookings, type Booking } from "../services/bookingApi";
import "../css/Bookings.css";
import NewAndUpdateBooking from "../components/NewAndUpdateBooking";

function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  // Mở / đóng form booking
  const [bookingForm, setBookingForm] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const data = await getBookings();

      setBookings(data);
    } catch (error) {
      console.error("Lỗi tải booking:", error);
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      booking.bookingCode.toLowerCase().includes(keyword) ||
      booking.customerName.toLowerCase().includes(keyword) ||
      booking.customerPhone.toLowerCase().includes(keyword);

    const matchStatus =
      status === "ALL" || booking.status.toLowerCase() === status.toLowerCase();

    return matchSearch && matchStatus;
  });

  function getStatusText(value: string) {
    switch (value.toLowerCase()) {
      case "pending":
        return "Chờ xác nhận";

      case "confirmed":
        return "Đã xác nhận";

      case "checkedin":
        return "Đã nhận phòng";

      case "checkedout":
        return "Đã trả phòng";

      case "cancelled":
        return "Đã hủy";

      default:
        return value;
    }
  }

  function formatDate(value: string) {
    if (!value) {
      return "";
    }

    return new Date(value).toLocaleDateString("vi-VN");
  }

  function formatMoney(value: number) {
    return value.toLocaleString("vi-VN") + " đ";
  }

  // =========================
  // MỞ FORM THÊM BOOKING
  // =========================

  function handleAddBooking() {
    setBookingForm(true);
  }

  // =========================
  // SAU KHI LƯU BOOKING
  // =========================

  function handleBookingSaved() {
    setBookingForm(false);

    loadBookings();
  }

  return (
    <div className="bookings-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="bookings-header">
        <div>
          <h1>Đặt phòng</h1>

          <p>Quản lý các đặt phòng của khách sạn</p>
        </div>

        <button className="add-booking-button" onClick={handleAddBooking}>
          + Đặt phòng
        </button>
      </div>

      {/* =========================
          FILTER
      ========================= */}

      <div className="booking-filters">
        <button
          className={`booking-filter-button ${
            status === "ALL" ? "active" : ""
          }`}
          onClick={() => setStatus("ALL")}
        >
          Tất cả ({bookings.length})
        </button>

        <button
          className={`booking-filter-button ${
            status === "Pending" ? "active" : ""
          }`}
          onClick={() => setStatus("Pending")}
        >
          Chờ xác nhận
        </button>

        <button
          className={`booking-filter-button ${
            status === "Confirmed" ? "active" : ""
          }`}
          onClick={() => setStatus("Confirmed")}
        >
          Đã xác nhận
        </button>

        <button
          className={`booking-filter-button ${
            status === "CheckedIn" ? "active" : ""
          }`}
          onClick={() => setStatus("CheckedIn")}
        >
          Đang ở
        </button>

        <button
          className={`booking-filter-button ${
            status === "CheckedOut" ? "active" : ""
          }`}
          onClick={() => setStatus("CheckedOut")}
        >
          Đã trả phòng
        </button>

        <button
          className={`booking-filter-button ${
            status === "Cancelled" ? "active" : ""
          }`}
          onClick={() => setStatus("Cancelled")}
        >
          Đã hủy
        </button>

        <input
          className="booking-search"
          type="text"
          placeholder="Tìm mã booking, tên hoặc SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* =========================
          BOOKING LIST
      ========================= */}

      <div className="booking-list">
        {filteredBookings.map((booking) => (
          <div className="booking-card" key={booking.id}>
            {/* HEADER */}

            <div className="booking-card-header">
              <div>
                <h2>{booking.bookingCode}</h2>

                <p>{booking.customerName}</p>
              </div>

              <span
                className={`booking-status ${booking.status.toLowerCase()}`}
              >
                {getStatusText(booking.status)}
              </span>
            </div>

            {/* INFO */}

            <div className="booking-card-info">
              <div>
                <span>Số điện thoại</span>

                <strong>{booking.customerPhone}</strong>
              </div>

              <div>
                <span>Nhận phòng</span>

                <strong>{formatDate(booking.checkInDate)}</strong>
              </div>

              <div>
                <span>Trả phòng</span>

                <strong>{formatDate(booking.checkOutDate)}</strong>
              </div>

              <div>
                <span>Số khách</span>

                <strong>{booking.numberOfGuests}</strong>
              </div>

              <div>
                <span>Số phòng</span>

                <strong>{booking.bookingRooms.length}</strong>
              </div>

              <div>
                <span>Tổng tiền</span>

                <strong>{formatMoney(booking.totalAmount)}</strong>
              </div>
            </div>

            {/* FOOTER */}

            <div className="booking-card-footer">
              <button className="secondary-button">Chi tiết</button>

              <button className="primary-button">Chỉnh sửa</button>
            </div>
          </div>
        ))}
      </div>

      {/* =========================
          EMPTY
      ========================= */}

      {filteredBookings.length === 0 && (
        <div className="empty-booking">Không tìm thấy booking</div>
      )}

      {/* =========================
          CREATE BOOKING FORM
      ========================= */}

      {bookingForm && (
        <NewAndUpdateBooking
          booking={null}
          setVisible={(visible) => {
            setBookingForm(visible);
          }}
          onSaved={handleBookingSaved}
        />
      )}
    </div>
  );
}

export default Bookings;
