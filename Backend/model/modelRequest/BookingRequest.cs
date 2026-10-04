namespace Project.Backend.Models;

public class BookingRequest
{
    public string CustomerName { get; set; } = string.Empty;

    public string CustomerPhone { get; set; } = string.Empty;

    public string BookingType { get; set; } = string.Empty;

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public int NumberOfGuests { get; set; }

    public string Status { get; set; } = "Pending";

    public decimal TotalAmount { get; set; }

    public string? Note { get; set; }

    public List<BookingRoomRequest> Rooms { get; set; } = new();
}