import { useEffect, useState } from "react";
import { getRooms, type Room } from "../services/roomApi";

function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      setLoading(true);
      setError("");

      const data = await getRooms();

      setRooms(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Không thể lấy danh sách phòng",
      );
    } finally {
      setLoading(false);
    }
  }

  const empty = rooms.filter((room) => room.status === "empty").length;

  const occupied = rooms.filter((room) => room.status === "occupied").length;

  const booked = rooms.filter((room) => room.status === "booked").length;

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Đang tải...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h2>Lỗi</h2>

        <p>{error}</p>

        <button onClick={loadRooms}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat-card">
          <span>Tổng phòng</span>
          <strong>{rooms.length}</strong>
        </div>

        <div className="stat-card">
          <span>Phòng trống</span>
          <strong>{empty}</strong>
        </div>

        <div className="stat-card">
          <span>Đang ở</span>
          <strong>{occupied}</strong>
        </div>

        <div className="stat-card">
          <span>Đã đặt</span>
          <strong>{booked}</strong>
        </div>
      </div>

      <section className="rooms-section">
        <div className="section-title">
          <h2>Tình trạng phòng</h2>
        </div>

        <div className="room-grid">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-number">{room.roomNumber}</div>

              {/* <div className="room-floor">
                Tầng {room.floor}
              </div> */}

              <div className="room-status">{room.status}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
