
namespace Project.Backend.Models;

public class Booking
{
    public int Id { get; set; }

    public string BookingCode { get; set; } = string.Empty;

    // Thông tin khách tại thời điểm đặt phòng
    public string CustomerName { get; set; } = string.Empty;

    public string CustomerPhone { get; set; } = string.Empty;

    // Loại đặt phòng: Hourly / Overnight / Daily
    public string BookingType { get; set; } = string.Empty;

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public int NumberOfGuests { get; set; }

    // Pending / Confirmed / CheckedIn / CheckedOut / Cancelled
    public string Status { get; set; } = "Pending";

    public decimal TotalAmount { get; set; }

    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public List<BookingRoom> BookingRooms { get; set; } = new();
}
