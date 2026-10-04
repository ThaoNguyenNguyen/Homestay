namespace Project.Backend.Models;

public class BookingRoomRequest
{
    public int RoomId { get; set; }

    public int? PricingRuleId { get; set; }

    public decimal Price { get; set; }

    public decimal Quantity { get; set; }

    public string? Note { get; set; }
}