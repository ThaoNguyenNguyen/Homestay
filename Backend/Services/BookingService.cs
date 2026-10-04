using Project.Backend.Models;
using Project.Backend.Repositories;

namespace Project.Backend.Services;

public class BookingService
{
    private readonly BookingRepository _bookingRepository;

    public BookingService(BookingRepository bookingRepository)
    {
        _bookingRepository = bookingRepository;
    }

    public async Task<List<Booking>> GetAllBookingsAsync()
    {
        return await _bookingRepository.GetAllBookingsAsync();
    }

    public async Task<Booking?> GetBookingByIdAsync(int bookingId)
    {
        return await _bookingRepository.GetBookingByIdAsync(bookingId);
    }

    public async Task<bool> CreateBookingAsync(Booking booking)
    {
        return await _bookingRepository.CreateBookingAsync(booking);
    }

    public async Task<bool> UpdateBookingAsync(
        int bookingId,
        Booking booking)
    {
        return await _bookingRepository.UpdateBookingAsync(
            bookingId,
            booking
        );
    }

    public async Task<bool> DeleteBookingAsync(int bookingId)
    {
        return await _bookingRepository.DeleteBookingAsync(bookingId);
    }
}