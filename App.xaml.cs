using System.Windows;
using Project.Backend;

namespace Project;

public partial class App : Application
{
    private ApiServer? _apiServer;

    protected override async void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        try
        {
            // Khởi động API
            _apiServer = new ApiServer();
            await _apiServer.StartAsync();

            // Mở giao diện WPF
            var mainWindow = new MainWindow();
            MainWindow = mainWindow;
            mainWindow.Show();
        }
        catch (Exception ex)
        {
            MessageBox.Show(
                $"Không thể khởi động ứng dụng:\n\n{ex}",
                "Lỗi",
                MessageBoxButton.OK,
                MessageBoxImage.Error
            );

            Shutdown();
        }
    }

    protected override async void OnExit(ExitEventArgs e)
    {
        if (_apiServer != null)
        {
            await _apiServer.StopAsync();
        }

        base.OnExit(e);
    }
}