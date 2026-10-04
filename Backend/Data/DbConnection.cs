using MySql.Data.MySqlClient;

namespace Project.Backend.Data
{
    public class ConnectDb
    {
        private readonly string connectionString =
            "Server=localhost;Port=3306;Database=homestay_db;User ID=root;Password=170402;";

        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(connectionString);
        }
    }
}