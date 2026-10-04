namespace Project.Backend.Models;

public class BookingRoom
{
    public int Id { get; set; }

    public int BookingId { get; set; }

    public int RoomId { get; set; }

    public int? PricingRuleId { get; set; }

    public decimal Price { get; set; }

    public decimal Quantity { get; set; }

    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; }
}