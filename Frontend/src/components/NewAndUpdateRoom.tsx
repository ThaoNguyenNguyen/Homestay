import { useState } from "react";
import {
  createRoom,
  updateRoom,
  type Room,
  type RoomRequest,
} from "../services/roomApi";
import "../css/NewAndUpdateRoom.css";

interface NewAndUpdateRoomProps {
  room?: Room | null;
  setVisible: (value: boolean) => void;
  onSaved: () => void;
}

function NewAndUpdateRoom({
  room,
  setVisible,
  onSaved,
}: NewAndUpdateRoomProps) {
  const [roomNumber, setRoomNumber] = useState(room?.roomNumber ?? "");

  const [roomTypeId, setRoomTypeId] = useState(
    room?.roomTypeId?.toString() ?? "",
  );

  const [floor, setFloor] = useState(room?.floor?.toString() ?? "");

  const [status, setStatus] = useState(room?.status ?? "Available");

  const [description, setDescription] = useState(room?.description ?? "");

  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!roomNumber.trim()) {
      alert("Vui lòng nhập số phòng");
      return;
    }

    if (!roomTypeId) {
      alert("Vui lòng nhập loại phòng");
      return;
    }

    if (!floor) {
      alert("Vui lòng nhập tầng");
      return;
    }

    const data: RoomRequest = {
      roomNumber: roomNumber.trim(),
      roomTypeId: Number(roomTypeId),
      floor: Number(floor),
      status,
      description: description.trim(),
    };

    try {
      setSaving(true);

      if (room) {
        await updateRoom(room.id, data);
      } else {
        await createRoom(data);
      }

      onSaved();
      setVisible(false);
    } catch (error) {
      console.error("Lỗi lưu phòng:", error);

      alert(room ? "Không thể cập nhật phòng" : "Không thể thêm phòng");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="room-form-overlay">
      {" "}
      <div className="room-form">
        <div className="room-form-header">
          <div>
            <h2>{room ? "Chỉnh sửa phòng" : "Thêm phòng"}</h2>

            <p>
              {room ? "Cập nhật thông tin phòng" : "Nhập thông tin phòng mới"}
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
          <div className="form-group">
            <label>Số phòng</label>

            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Ví dụ: 101"
            />
          </div>

          <div className="form-group">
            <label>Loại phòng</label>

            <select
              value={roomTypeId}
              onChange={(e) => setRoomTypeId(e.target.value)}
            >
              <option value="">-- Chọn loại phòng --</option>

              <option value="1">Phòng đơn</option>

              <option value="2">Phòng đôi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tầng</label>

            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              placeholder="Ví dụ: 1"
            />
          </div>

          <div className="form-group">
            <label>Trạng thái</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Available">Trống</option>

              <option value="Occupied">Đang ở</option>

              <option value="Reserved">Đã đặt</option>

              <option value="Cleaning">Đang dọn</option>

              <option value="Maintenance">Bảo trì</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mô tả</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả phòng..."
              rows={4}
            />
          </div>

          <div className="room-form-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setVisible(false)}
            >
              Hủy
            </button>

            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? "Đang lưu..." : room ? "Lưu thay đổi" : "Thêm phòng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAndUpdateRoom;
