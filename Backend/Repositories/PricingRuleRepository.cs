using Dapper;
using Project.Backend.Data;
using Project.Backend.Models;
using Project.Backend.Sql;

namespace Project.Backend.Repositories;

public class PricingRuleRepository
{
    private readonly ConnectDb _db;

    public PricingRuleRepository(ConnectDb db)
    {
        _db = db;
    }

    public async Task<List<PricingRule>>
    GetActiveAsync(
        string pricingType)
    {
        using var connection =
            _db.GetConnection();

        var result =
            await connection.QueryAsync<PricingRule>(
                PricingRuleSql.GetActivePricingRule,
                new
                {
                    PricingType = pricingType
                }
            );

        return result.ToList();
    }
}