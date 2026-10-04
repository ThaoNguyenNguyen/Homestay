namespace Project.Backend.Models;

public class PricingRule
{
    public int Id { get; set; }

    public int RoomTypeId { get; set; }

    public string PricingType { get; set; } = string.Empty;

    public int Duration { get; set; }

    public decimal Price { get; set; }

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? EndTime { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime EffectiveFrom { get; set; }

    public DateTime? EffectiveTo { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }
}