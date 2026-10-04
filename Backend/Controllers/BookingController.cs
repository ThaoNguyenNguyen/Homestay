using Microsoft.AspNetCore.Mvc;
using Project.Backend.Models;
using Project.Backend.Services;

namespace Project.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly BookingService _bookingService;

    public BookingController(BookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpGet("GetAllBookings")]
    public async Task<IActionResult> GetAllBookings()
    {
        var result = await _bookingService.GetAllBookingsAsync();

        return Ok(result);
    }

    [HttpGet("GetBookingById")]
    public async Task<IActionResult> GetBookingById(int bookingId)
    {
        if (bookingId <= 0)
        {
            return BadRequest(new
            {
                success = false,
                message = "Booking ID không hợp lệ"
            });
        }

        var result = await _bookingService.GetBookingByIdAsync(bookingId);

        if (result == null)
        {
            return NotFound(new
            {
                success = false,
                message = "Không tìm thấy booking"
            });
        }

        return Ok(result);
    }

    [HttpPost("CreateBooking")]
    public async Task<IActionResult> CreateBooking(
        [FromBody] Booking booking)
    {
        var result = await _bookingService.CreateBookingAsync(booking);

        if (!result)
        {
            return BadRequest(new
            {
                success = false,
                message = "Đặt phòng thất bại"
            });
        }

        return Ok(new
        {
            success = true,
            message = "Đặt phòng thành công"
        });
    }

    [HttpPut("UpdateBooking")]
    public async Task<IActionResult> UpdateBooking(
        int bookingId,
        [FromBody] Booking booking)
    {
        if (bookingId <= 0)
        {
            return BadRequest(new
            {
                success = false,
                message = "Booking ID không hợp lệ"
            });
        }

        var result = await _bookingService.UpdateBookingAsync(
            bookingId,
            booking
        );

        if (!result)
        {
            return BadRequest(new
            {
                success = false,
                message = "Cập nhật booking thất bại"
            });
        }

        return Ok(new
        {
            success = true,
            message = "Cập nhật booking thành công"
        });
    }

    [HttpDelete("DeleteBooking")]
    public async Task<IActionResult> DeleteBooking(int bookingId)
    {
        if (bookingId <= 0)
        {
            return BadRequest(new
            {
                success = false,
                message = "Booking ID không hợp lệ"
            });
        }

        var result = await _bookingService.DeleteBookingAsync(bookingId);

        if (!result)
        {
            return BadRequest(new
            {
                success = false,
                message = "Xóa booking thất bại"
            });
        }

        return Ok(new
        {
            success = true,
            message = "Xóa booking thành công"
        });
    }
}