import { useEffect, useMemo, useState } from "react";
import {
  createBooking,
  updateBooking,
  type Booking,
} from "../services/bookingApi";
import { getRooms, type Room } from "../services/roomApi";
import "../css/NewAndUpdateBooking.css";
import {
  getActivePricingRules,
  type PricingRule,
  type PricingType,
} from "../services/pricingRuleApi";

interface NewAndUpdateBookingProps {
  booking?: Booking | null;
  setVisible: (value: boolean) => void;
  onSaved: () => void;
}

function NewAndUpdateBooking({
  booking,
  setVisible,
  onSaved,
}: NewAndUpdateBookingProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);

  const [bookingCode, setBookingCode] = useState(booking?.bookingCode ?? "");

  const [customerName, setCustomerName] = useState(booking?.customerName ?? "");

  const [customerPhone, setCustomerPhone] = useState(
    booking?.customerPhone ?? "",
  );

  const [bookingType, setBookingType] = useState(
    booking?.bookingType ?? "Overnight",
  );

  const [checkInDate, setCheckInDate] = useState(
    booking?.checkInDate ? booking.checkInDate.substring(0, 16) : "",
  );

  const [checkOutDate, setCheckOutDate] = useState(
    booking?.checkOutDate ? booking.checkOutDate.substring(0, 16) : "",
  );

  const [numberOfGuests, setNumberOfGuests] = useState(
    booking?.numberOfGuests?.toString() ?? "1",
  );

  const [status, setStatus] = useState(booking?.status ?? "Pending");

  const [note, setNote] = useState(booking?.note ?? "");

  const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>(
    booking?.bookingRooms?.map((item) => item.roomId) ?? [],
  );

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      const data = await getRooms();

      setRooms(data);
    } catch (error) {
      console.error("Lỗi tải danh sách phòng:", error);
    }
  }
  useEffect(() => {
    loadPricingRules();
  }, [bookingType]);

  async function loadPricingRules() {
    try {
      const data = await getActivePricingRules(bookingType as PricingType);

      setPricingRules(data);
    } catch (error) {
      console.error("Lỗi lấy bảng giá:", error);
      setPricingRules([]);
    }
  }
  const quantity = useMemo(() => {
    if (!checkInDate || !checkOutDate) {
      return 0;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const diff = checkOut.getTime() - checkIn.getTime();

    if (diff <= 0) {
      return 0;
    }

    const hours = diff / (1000 * 60 * 60);

    if (bookingType === "HOURLY") {
      return Math.ceil(hours);
    }

    if (bookingType === "OVERNIGHT") {
      return Math.ceil(hours / 24);
    }

    if (bookingType === "DAILY") {
      return Math.ceil(hours / 24);
    }

    return 0;
  }, [checkInDate, checkOutDate, bookingType]);

  function handleRoomChange(roomId: number) {
    setSelectedRoomIds((current) => {
      if (current.includes(roomId)) {
        return current.filter((id) => id !== roomId);
      }

      return [...current, roomId];
    });
  }

  const numberOfNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) {
      return 0;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const difference = checkOut.getTime() - checkIn.getTime();

    const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  }, [checkInDate, checkOutDate]);

  const selectedRooms = rooms.filter((room) =>
    selectedRoomIds.includes(room.id),
  );

  const totalAmount = useMemo(() => {
    return selectedRooms.reduce((total, room) => {
      const rule = pricingRules.find((x) => {
        console.log("CHECK:", {
          pricingRoomTypeId: x.roomTypeId,
          roomTypeId: room.roomTypeId,
          pricingType: x.pricingType,
          bookingType: bookingType,
        });

        return (
          Number(x.roomTypeId) === Number(room.roomTypeId) &&
          String(x.pricingType).toUpperCase() ===
            String(bookingType).toUpperCase()
        );
      });
      console.log("bookingType =", bookingType);
      console.log("pricingRules =", pricingRules);
      console.log("room =", room);

      const price = rule?.price ?? 0;

      return total + price * numberOfNights;
    }, 0);
  }, [selectedRooms, pricingRules, bookingType, numberOfNights]);
  function formatMoney(value: number) {
    return value.toLocaleString("vi-VN") + " đ";
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!bookingCode.trim()) {
      alert("Vui lòng nhập mã booking");
      return;
    }

    if (!customerName.trim()) {
      alert("Vui lòng nhập tên khách hàng");
      return;
    }

    if (!customerPhone.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (!checkInDate) {
      alert("Vui lòng chọn ngày nhận phòng");
      return;
    }

    if (!checkOutDate) {
      alert("Vui lòng chọn ngày trả phòng");
      return;
    }

    if (numberOfNights <= 0) {
      alert("Ngày trả phòng phải sau ngày nhận phòng");
      return;
    }

    if (selectedRoomIds.length === 0) {
      alert("Vui lòng chọn ít nhất một phòng");
      return;
    }

    const data: Booking = {
      id: booking?.id ?? 0,

      bookingCode: bookingCode.trim(),

      customerName: customerName.trim(),

      customerPhone: customerPhone.trim(),

      bookingType,

      checkInDate,

      checkOutDate,

      numberOfGuests: Number(numberOfGuests),

      status,

      totalAmount,

      note: note.trim(),

      bookingRooms: selectedRooms.map((room) => {
        const oldRoom = booking?.bookingRooms?.find(
          (item) => item.roomId === room.id,
        );
        const price = oldRoom?.price ?? 0;

        return {
          id: oldRoom?.id ?? 0,

          bookingId: booking?.id ?? 0,

          roomId: room.id,

          pricingRuleId: oldRoom?.id ?? null,
          price: price,
          quantity: quantity,

          note: oldRoom?.note ?? null,

          createdAt: oldRoom?.createdAt ?? "",
        };
      }),
    };

    try {
      setSaving(true);

      if (booking) {
        await updateBooking(booking.id, data);
      } else {
        await createBooking(data);
      }

      onSaved();

      setVisible(false);
    } catch (error) {
      console.error(error);

      alert(booking ? "Không thể cập nhật booking" : "Không thể tạo booking");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <div className="booking-form-header">
          <div>
            <h2>{booking ? "Chỉnh sửa booking" : "Đặt phòng"}</h2>

            <p>
              {booking
                ? "Cập nhật thông tin đặt phòng"
                : "Nhập thông tin đặt phòng cho khách"}
            </p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={() => setVisible(false)}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="booking-form-grid">
            <div className="form-group">
              <label>Mã booking</label>

              <input
                type="text"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                placeholder="Ví dụ: BK001"
              />
            </div>

            <div className="form-group">
              <label>Tên khách hàng</label>

              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập tên khách hàng"
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>

              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="form-group">
              <label>Số khách</label>

              <input
                type="number"
                min="1"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Loại đặt phòng</label>

              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
              >
                <option value="Overnight">Qua đêm</option>

                <option value="DayUse">Theo ngày</option>
              </select>
            </div>

            <div className="form-group">
              <label>Trạng thái</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Chờ xác nhận</option>

                <option value="Confirmed">Đã xác nhận</option>

                <option value="CheckedIn">Đã nhận phòng</option>

                <option value="CheckedOut">Đã trả phòng</option>

                <option value="Cancelled">Đã hủy</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ngày nhận phòng</label>

              <input
                type="datetime-local"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Ngày trả phòng</label>

              <input
                type="datetime-local"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Chọn phòng</label>

            <div className="booking-room-list">
              {rooms.map((room) => {
                const selected = selectedRoomIds.includes(room.id);

                const unavailable = room.status.toLowerCase() !== "available";

                return (
                  <label
                    key={room.id}
                    className={`booking-room-item ${
                      selected ? "selected" : ""
                    } ${unavailable ? "unavailable" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={unavailable}
                      onChange={() => handleRoomChange(room.id)}
                    />

                    <div>
                      <strong>Phòng {room.roomNumber}</strong>

                      <span>Tầng {room.floor}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="booking-summary">
            <div>
              <span>Số phòng</span>

              <strong>{selectedRoomIds.length}</strong>
            </div>

            <div>
              <span>Số đêm</span>

              <strong>{numberOfNights}</strong>
            </div>

            <div>
              <span>Tổng tiền</span>

              <strong>{formatMoney(totalAmount)}</strong>
            </div>
          </div>

          <div className="form-group">
            <label>Ghi chú</label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú cho booking..."
              rows={4}
            />
          </div>

          <div className="booking-form-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setVisible(false)}
            >
              Hủy
            </button>

            <button type="submit" className="primary-button" disabled={saving}>
              {saving
                ? "Đang lưu..."
                : booking
                  ? "Lưu thay đổi"
                  : "Xác nhận đặt phòng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAndUpdateBooking;
