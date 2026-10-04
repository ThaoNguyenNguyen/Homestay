interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  status: string;
}

interface RoomCardProps {
  room: Room;
}

function RoomCard({ room }: RoomCardProps) {
  return (
    <div className={`room-card ${room.status}`}>
      <div className="room-number">
        {room.roomNumber}
      </div>

      <div className="room-type">
        {room.roomType}
      </div>

      <div className="room-status">
        {room.status}
      </div>
    </div>
  );
}

export default RoomCard;