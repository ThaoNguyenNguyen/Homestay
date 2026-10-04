namespace Project.Backend.Sql
{
    public static class RoomSql
    {
        public const string GetAll = """
            SELECT
                id,
                roomNumber,
                roomTypeId,
                floor,
                status,
                description
            FROM rooms
            ORDER BY roomNumber;
            """;

        public const string GetById = """
            SELECT
                id,
                roomNumber,
                roomTypeId,
                floor,
                status,
                description
            FROM rooms
            WHERE id = @Id;
            """;

        public const string GetByStatus = """
            SELECT
                id,
                roomNumber,
                roomTypeId,
                floor,
                status,
                description
            FROM rooms
            WHERE status = @Status
            ORDER BY roomNumber;
            """;

        public static string Create = @"
            INSERT INTO Rooms
            (
                RoomNumber,
                RoomTypeId,
                Floor,
                Status,
                Description
            )
            VALUES
            (
                @RoomNumber,
                @RoomTypeId,
                @Floor,
                @Status,
                @Description
            );
        ";
        public static string Update = @"
            UPDATE Rooms
            SET
                RoomNumber = @RoomNumber,
                RoomTypeId = @RoomTypeId,
                Floor = @Floor,
                Status = @Status,
                Description = @Description
            WHERE Id = @Id;
        ";
    }
}