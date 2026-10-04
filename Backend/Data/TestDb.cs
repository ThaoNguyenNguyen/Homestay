using System;
using System.Threading.Tasks;

namespace Project.Backend.Data
{
    public class TestDb
    {
        public async Task<bool> TestConnection()
        {
            var db = new ConnectDb();

            try
            {
                using var connection = db.GetConnection();

                await connection.OpenAsync();

                Console.WriteLine("MySQL connection successful!");

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"MySQL connection failed: {ex.Message}");

                return false;
            }
        }
    }
}