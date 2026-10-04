import { useEffect, useState } from "react";
import { getRooms } from "../services/roomApi";
import type { Room } from "../services/roomApi";
import "../css/Rooms.css";
import RoomDetail from "../components/RoomDetail";
import NewAndUpdateRoom from "../components/NewAndUpdateRoom";

function Rooms() {
  const [listRoom, setListRoom] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [createRoomForm, setCreateRoomForm] = useState<boolean>(false);
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      const data = await getRooms();
      setListRoom(data);
    } catch (error) {
      console.error("Lỗi tải phòng:", error);
    }
  }

  const filteredRooms = listRoom.filter((room) => {
    const matchSearch = room.roomNumber
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      status === "ALL" || room.status.toLowerCase() === status.toLowerCase();

    return matchSearch && matchStatus;
  });

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
    <div className="rooms-page">
      <div className="rooms-header">
        <div></div>

        <button
          className="add-room-button"
          onClick={() => {
            setRoom(null);
            setCreateRoomForm(true);
          }}
        >
          + Thêm phòng
        </button>
      </div>

      <div className="room-filters">
        <button
          className={`room-filter-button ${status === "ALL" ? "active" : ""}`}
          onClick={() => setStatus("ALL")}
        >
          Tất cả ({listRoom.length})
        </button>

        <button
          className={`room-filter-button ${
            status === "Available" ? "active" : ""
          }`}
          onClick={() => setStatus("Available")}
        >
          Trống
        </button>

        <button
          className={`room-filter-button ${
            status === "Occupied" ? "active" : ""
          }`}
          onClick={() => setStatus("Occupied")}
        >
          Đang ở
        </button>

        <button
          className={`room-filter-button ${
            status === "Reserved" ? "active" : ""
          }`}
          onClick={() => setStatus("Reserved")}
        >
          Đã đặt
        </button>

        <button
          className={`room-filter-button ${
            status === "Cleaning" ? "active" : ""
          }`}
          onClick={() => setStatus("Cleaning")}
        >
          Đang dọn
        </button>

        <button
          className={`room-filter-button ${
            status === "Maintenance" ? "active" : ""
          }`}
          onClick={() => setStatus("Maintenance")}
        >
          Bảo trì
        </button>

        <input
          className="room-search"
          type="text"
          placeholder="Tìm số phòng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="room-grid">
        {filteredRooms.map((room) => (
          <div className="room-card" key={room.id}>
            <div className="room-card-top">
              <h2>{room.roomNumber}</h2>

              <span className={`status ${room.status.toLowerCase()}`}>
                {getStatusText(room.status)}
              </span>
            </div>

            <div className="room-card-info">
              <p>
                <strong>Tầng:</strong> {room.floor}
              </p>

              <p>
                <strong>Loại phòng:</strong> {room.roomTypeId}
              </p>

              {room.description && (
                <p>
                  <strong>Mô tả:</strong> {room.description}
                </p>
              )}
            </div>

            <button
              className="detail-button"
              onClick={() => setSelectedRoom(room)}
            >
              Chi tiết
            </button>
          </div>
        ))}
      </div>
      {selectedRoom && (
        <RoomDetail
          room={selectedRoom}
          onClose={() => {
            setSelectedRoom(null);
            loadRooms();
          }}
        />
      )}
      {createRoomForm && (
        <NewAndUpdateRoom
          room={room}
          setVisible={() => {
            setCreateRoomForm(false);
          }}
          onSaved={loadRooms}
        />
      )}
    </div>
  );
}

export default Rooms;
