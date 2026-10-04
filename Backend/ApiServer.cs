using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Project.Backend.Data;
using Project.Backend.Repositories;
using Project.Backend.Services;

namespace Project.Backend;

public class ApiServer
{
    private WebApplication? _app;

    public async Task StartAsync()
    {
        var builder = WebApplication.CreateBuilder();

        builder.WebHost.UseUrls("http://localhost:5000");

        builder.Services.AddControllers();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("Frontend", policy =>
            {
                policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        builder.Services.AddSingleton<ConnectDb>();
        builder.Services.AddScoped<RoomRepository>();
        builder.Services.AddScoped<RoomService>();
        builder.Services.AddScoped<BookingRepository>();
        builder.Services.AddScoped<BookingService>();

        _app = builder.Build();

        _app.UseCors("Frontend");

        _app.MapControllers();

        await _app.StartAsync();
    }

    public async Task StopAsync()
    {
        if (_app != null)
        {
            await _app.StopAsync();
            await _app.DisposeAsync();
        }
    }
}