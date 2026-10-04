using System;
using System.IO;
using System.Windows;

namespace Project;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        Loaded += MainWindow_Loaded;
    }

    private async void MainWindow_Loaded(
        object sender,
        RoutedEventArgs e)
    {
        await WebView.EnsureCoreWebView2Async();

        string frontendPath = Path.Combine(
            AppContext.BaseDirectory,
            "Frontend",
            "dist"
        );

        if (!Directory.Exists(frontendPath))
        {
            MessageBox.Show(
                $"Không tìm thấy Frontend/dist:\n{frontendPath}",
                "Lỗi",
                MessageBoxButton.OK,
                MessageBoxImage.Error
            );

            return;
        }

        WebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
            "app.local",
            frontendPath,
            Microsoft.Web.WebView2.Core
                .CoreWebView2HostResourceAccessKind.Allow
        );

        WebView.Source = new Uri(
            "https://app.local/index.html"
        );
    }
}