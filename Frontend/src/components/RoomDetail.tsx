import { useState } from "react";
import { type Room } from "../services/roomApi";
import "../css/RoomDetail.css";
import NewAndUpdateRoom from "../components/NewAndUpdateRoom";

interface RoomDetailProps {
  room: Room;
  onClose: () => void;
}

function RoomDetail({ room, onClose }: RoomDetailProps) {
  const [editRoom, setEditRoom] = useState(false);

  function getStatusText(status: string) {
    switch (status.toLowerCase()) {
      case "available":
        return "Trống";

      case "occupied":
        return "Đang ở";

      case "reserved":
        return "Đã đặt";

      case "cleaning":
        return "Đang dọn";

      case "maintenance":
        return "Bảo trì";

      default:
        return status;
    }
  }

  return (
    <>
      {" "}
      <div className="room-detail-overlay">
        {" "}
        <div className="room-detail">
          <div className="room-detail-header">
            <div>
              <h2>Phòng {room.roomNumber}</h2>

              <p>Thông tin chi tiết phòng</p>
            </div>

            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="room-detail-content">
            <div className="detail-item">
              <span>Số phòng</span>

              <strong>{room.roomNumber}</strong>
            </div>

            <div className="detail-item">
              <span>Tầng</span>

              <strong>{room.floor}</strong>
            </div>

            <div className="detail-item">
              <span>Loại phòng</span>

              <strong>
                {room.roomTypeId === 1
                  ? "Phòng đơn"
                  : room.roomTypeId === 2
                    ? "Phòng đôi"
                    : "Không xác định"}
              </strong>
            </div>

            <div className="detail-item">
              <span>Trạng thái</span>

              <span className={`status ${room.status.toLowerCase()}`}>
                {getStatusText(room.status)}
              </span>
            </div>

            <div className="detail-item description">
              <span>Mô tả</span>

              <p>{room.description || "Chưa có mô tả"}</p>
            </div>
          </div>

          <div className="room-detail-footer">
            <button className="secondary-button" onClick={onClose}>
              Đóng
            </button>

            <button
              className="primary-button"
              onClick={() => setEditRoom(true)}
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
      {editRoom && (
        <NewAndUpdateRoom
          room={room}
          setVisible={(visible) => {
            setEditRoom(visible);
          }}
          onSaved={() => {
            setEditRoom(false);
            onClose();
          }}
        />
      )}
    </>
  );
}

export default RoomDetail;
