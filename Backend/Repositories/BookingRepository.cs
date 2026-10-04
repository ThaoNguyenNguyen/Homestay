using Dapper;
using Project.Backend.Data;
using Project.Backend.Models;
using Project.Backend.Sql;

namespace Project.Backend.Repositories;

public class BookingRepository
{
    private readonly ConnectDb _db;

    public BookingRepository(ConnectDb db)
    {
        _db = db;
    }

    public async Task<List<Booking>> GetAllBookingsAsync()
    {
        using var connection = _db.GetConnection();

        var result = await connection.QueryAsync<Booking>(
            BookingSql.GetAllBookings
        );

        return result.ToList();
    }

    public async Task<Booking?> GetBookingByIdAsync(int bookingId)
    {
        using var connection = _db.GetConnection();

        var booking = await connection.QueryFirstOrDefaultAsync<Booking>(
            BookingSql.GetBookingById,
            new
            {
                BookingId = bookingId
            }
        );

        if (booking == null)
        {
            return null;
        }

        var bookingRooms = await connection.QueryAsync<BookingRoom>(
            BookingSql.GetBookingRooms,
            new
            {
                BookingId = bookingId
            }
        );

        booking.BookingRooms = bookingRooms.ToList();

        return booking;
    }

    public async Task<bool> CreateBookingAsync(Booking booking)
    {
        using var connection = _db.GetConnection();

        await connection.OpenAsync();

        using var transaction = connection.BeginTransaction();

        try
        {
            var bookingId = await connection.ExecuteScalarAsync<int>(
                BookingSql.CreateBooking,
                booking,
                transaction
            );

            if (bookingId <= 0)
            {
                transaction.Rollback();

                return false;
            }

            foreach (var room in booking.BookingRooms)
            {
                room.BookingId = bookingId;

                await connection.ExecuteAsync(
                    BookingSql.CreateBookingRoom,
                    room,
                    transaction
                );
            }

            transaction.Commit();

            return true;
        }
        catch (Exception)
        {
            transaction.Rollback();

            throw;
        }
    }

    public async Task<bool> UpdateBookingAsync(
        int bookingId,
        Booking booking)
    {
        using var connection = _db.GetConnection();

        await connection.OpenAsync();

        using var transaction = connection.BeginTransaction();

        try
        {
            var result = await connection.ExecuteAsync(
                BookingSql.UpdateBooking,
                new
                {
                    BookingId = bookingId,
                    booking.BookingCode,
                    booking.CustomerName,
                    booking.CustomerPhone,
                    booking.BookingType,
                    booking.CheckInDate,
                    booking.CheckOutDate,
                    booking.NumberOfGuests,
                    booking.Status,
                    booking.TotalAmount,
                    booking.Note
                },
                transaction
            );

            if (result <= 0)
            {
                transaction.Rollback();

                return false;
            }

            await connection.ExecuteAsync(
                BookingSql.DeleteBookingRooms,
                new
                {
                    BookingId = bookingId
                },
                transaction
            );

            foreach (var room in booking.BookingRooms)
            {
                room.BookingId = bookingId;

                await connection.ExecuteAsync(
                    BookingSql.CreateBookingRoom,
                    room,
                    transaction
                );
            }

            transaction.Commit();

            return true;
        }
        catch (Exception)
        {
            transaction.Rollback();

            throw;
        }
    }

    public async Task<bool> DeleteBookingAsync(int bookingId)
    {
        using var connection = _db.GetConnection();

        await connection.OpenAsync();

        using var transaction = connection.BeginTransaction();

        try
        {
            await connection.ExecuteAsync(
                BookingSql.DeleteBookingRooms,
                new
                {
                    BookingId = bookingId
                },
                transaction
            );

            var result = await connection.ExecuteAsync(
                BookingSql.DeleteBooking,
                new
                {
                    BookingId = bookingId
                },
                transaction
            );

            if (result <= 0)
            {
                transaction.Rollback();

                return false;
            }

            transaction.Commit();

            return true;
        }
        catch
        {
            transaction.Rollback();

            throw;
        }
    }
}