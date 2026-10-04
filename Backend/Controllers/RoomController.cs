using Microsoft.AspNetCore.Mvc;
using Project.Backend.Models;
using Project.Backend.Services;

namespace Project.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomController : ControllerBase
{
    private readonly RoomService _roomService;

    public RoomController(RoomService roomService)
    {
        _roomService = roomService;
    }

    [HttpGet("GetAllRooms")]
    public async Task<IActionResult> GetAllRooms()
    {
        var result = await _roomService.GetAllRoomsAsync();
        return Ok(result);
    }

    [HttpPost("CreateRoom")]
    public async Task<IActionResult> CreateRoom([FromBody] RoomRequest request)
    {
        var result = await _roomService.CreateRoomAsync(request);
        if (!result)
        {
            return BadRequest("Thêm phòng thất bại");
        }

        return Ok(new
        {
            success = true,
            message = "Thêm phòng thành công"
        });
    }
    [HttpPut("UpdateRoom")]
    public async Task<IActionResult> UpdateRoom(int roomId, [FromBody] RoomRequest request)
    {
        if (roomId <= 0)
        {
            return BadRequest(new
            {
                success = false,
                message = "Cập nhật phòng thất bại"
            });
        }

        var result = await _roomService.UpdateRoomAsync(
            roomId,
            request
        );

        if (!result)
        {
            return BadRequest(new
            {
                success = false,
                message = "Cập nhật phòng thất bại"
            });
        }

        return Ok(new
        {
            success = true,
            message = "Cập nhật phòng thành công"
        });
    }


}