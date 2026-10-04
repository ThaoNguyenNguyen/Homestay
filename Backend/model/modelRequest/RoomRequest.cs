namespace Project.Backend.Models;

public class RoomRequest
{

    public string RoomNumber { get; set; } = string.Empty;

    public int RoomTypeId { get; set; }

    public int Floor { get; set; }

    public string Status { get; set; } = "Available";

    public string? Description { get; set; }

}
