namespace Project.Backend.Sql;

public static class BookingSql
{
    public const string GetAllBookings = """
        SELECT
            id AS Id,
            bookingCode AS BookingCode,
            customerName AS CustomerName,
            customerPhone AS CustomerPhone,
            bookingType AS BookingType,
            checkInDate AS CheckInDate,
            checkOutDate AS CheckOutDate,
            numberOfGuests AS NumberOfGuests,
            status AS Status,
            totalAmount AS TotalAmount,
            note AS Note,
            createdAt AS CreatedAt,
            updatedAt AS UpdatedAt
        FROM bookings
        ORDER BY createdAt DESC;
        """;


    public const string GetBookingById = """
        SELECT
            id AS Id,
            bookingCode AS BookingCode,
            customerName AS CustomerName,
            customerPhone AS CustomerPhone,
            bookingType AS BookingType,
            checkInDate AS CheckInDate,
            checkOutDate AS CheckOutDate,
            numberOfGuests AS NumberOfGuests,
            status AS Status,
            totalAmount AS TotalAmount,
            note AS Note,
            createdAt AS CreatedAt,
            updatedAt AS UpdatedAt
        FROM bookings
        WHERE id = @BookingId;
        """;


    public const string GetBookingRooms = """
        SELECT
            id AS Id,
            bookingId AS BookingId,
            roomId AS RoomId,
            pricingRuleId AS PricingRuleId,
            price AS Price,
            quantity AS Quantity,
            note AS Note,
            createdAt AS CreatedAt
        FROM booking_rooms
        WHERE bookingId = @BookingId;
        """;


    public const string CreateBooking = """
        INSERT INTO bookings
        (
            bookingCode,
            customerName,
            customerPhone,
            bookingType,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            status,
            totalAmount,
            note,
            createdAt
        )
        VALUES
        (
            @BookingCode,
            @CustomerName,
            @CustomerPhone,
            @BookingType,
            @CheckInDate,
            @CheckOutDate,
            @NumberOfGuests,
            @Status,
            @TotalAmount,
            @Note,
            NOW()
        );

        SELECT LAST_INSERT_ID();
        """;


    public const string CreateBookingRoom = """
        INSERT INTO booking_rooms
        (
            bookingId,
            roomId,
            pricingRuleId,
            price,
            quantity,
            note,
            createdAt
        )
        VALUES
        (
            @BookingId,
            @RoomId,
            @PricingRuleId,
            @Price,
            @Quantity,
            @Note,
            NOW()
        );
        """;


    public const string UpdateBooking = """
        UPDATE bookings
        SET
            bookingCode = @BookingCode,
            customerName = @CustomerName,
            customerPhone = @CustomerPhone,
            bookingType = @BookingType,
            checkInDate = @CheckInDate,
            checkOutDate = @CheckOutDate,
            numberOfGuests = @NumberOfGuests,
            status = @Status,
            totalAmount = @TotalAmount,
            note = @Note,
            updatedAt = NOW()
        WHERE id = @BookingId;
        """;


    public const string DeleteBookingRooms = """
        DELETE FROM booking_rooms
        WHERE bookingId = @BookingId;
        """;


    public const string DeleteBooking = """
        DELETE FROM bookings
        WHERE id = @BookingId;
        """;

}