export interface Room {
id: number;
roomNumber: string;
roomTypeId: number;
floor: number;
status: string;
description?: string;
}

export interface RoomRequest {
roomNumber: string;
roomTypeId: number;
floor: number;
status: string;
description?: string;
}

export async function getRooms(): Promise<Room[]> {
const response = await fetch(
"http://localhost:5000/api/Room/GetAllRooms"
);


if (!response.ok) {
    throw new Error("Không thể lấy danh sách phòng");
}

return response.json();


}

export async function createRoom(
data: RoomRequest
): Promise<Room> {
const response = await fetch(
"http://localhost:5000/api/Room",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}
);


if (!response.ok) {
    throw new Error("Không thể thêm phòng");
}

return response.json();


}

export async function updateRoom(
id: number,
data: RoomRequest
): Promise<Room> {
const response = await fetch(
`http://localhost:5000/api/Room/UpdateRoom?roomId=${id}`,
{
method: "PUT",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}
);

if (!response.ok) {
    throw new Error("Không thể cập nhật phòng");
}

return response.json();


}
