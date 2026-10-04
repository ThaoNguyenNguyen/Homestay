namespace Project.Backend.Models;

public class Room
{
    public int Id { get; set; }

    public string RoomNumber { get; set; } = "";

    public int RoomTypeId { get; set; }

    public int Floor { get; set; }

    public string Status { get; set; } = "";

    public string? Description { get; set; }
}