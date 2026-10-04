using Dapper;
using Project.Backend.Data;
using Project.Backend.Models;
using Project.Backend.Sql;

namespace Project.Backend.Repositories
{
    public class RoomRepository
    {
        private readonly ConnectDb _db;

        public RoomRepository(ConnectDb db)
        {
            _db = db;
        }

        public async Task<List<Room>> GetAllAsync()
        {
            using var connection = _db.GetConnection();

            var result = await connection.QueryAsync<Room>(
                RoomSql.GetAll
            );

            return result.ToList();
        }

        public async Task<Room?> GetByIdAsync(int id)
        {
            using var connection = _db.GetConnection();

            return await connection.QueryFirstOrDefaultAsync<Room>(
                RoomSql.GetById,
                new { Id = id }
            );
        }

        public async Task<List<Room>> GetByStatusAsync(string status)
        {
            using var connection = _db.GetConnection();

            var result = await connection.QueryAsync<Room>(
                RoomSql.GetByStatus,
                new { Status = status }
            );

            return result.ToList();
        }


        public async Task<bool> CreateAsync(RoomRequest request)
        {

            using var connection = _db.GetConnection();
            var result = await connection.ExecuteAsync(
                RoomSql.Create,
                request
            );

            return result > 0;

        }

        public async Task<bool> UpdateAsync(int id, RoomRequest request)
        {
            using var connection = _db.GetConnection();

            var result = await connection.ExecuteAsync(
                RoomSql.Update,
                new
                {
                    Id = id,
                    request.RoomNumber,
                    request.RoomTypeId,
                    request.Floor,
                    request.Status,
                    request.Description
                }
            );

            return result > 0;
        }

    }
}