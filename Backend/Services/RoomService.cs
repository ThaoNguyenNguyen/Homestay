using Project.Backend.Repositories;
using Project.Backend.Models;

namespace Project.Backend.Services
{
    public class RoomService
    {
        private readonly RoomRepository _roomRepository;

        public RoomService(RoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<List<Room>> GetAllRoomsAsync()
        {
            return await _roomRepository.GetAllAsync();
        }

        public async Task<Room?> GetRoomByIdAsync(int id)
        {
            return await _roomRepository.GetByIdAsync(id);
        }

        public async Task<List<Room>> GetRoomsByStatusAsync(string status)
        {
            return await _roomRepository.GetByStatusAsync(status);
        }

        public async Task<bool> CreateRoomAsync(RoomRequest request)
        {
            return await _roomRepository.CreateAsync(request);
        }
        public async Task<bool> UpdateRoomAsync(int roomId, RoomRequest request)
        {
            return await _roomRepository.UpdateAsync(roomId, request);
        }


    }
}