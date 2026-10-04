namespace Project.Backend.Sql;

public static class PricingRuleSql
{
    public const string GetActivePricingRule = @"
        SELECT
            id,
            roomTypeId,
            pricingType,
            duration,
            price,
            startTime,
            endTime,
            status,
            effectiveFrom,
            effectiveTo,
            description,
            createdAt
        FROM pricing_rules
        WHERE roomTypeId = @RoomTypeId
          AND pricingType = @PricingType
          AND status = 'ACTIVE'
          AND effectiveFrom <= CURDATE()
          AND (
                effectiveTo IS NULL
                OR effectiveTo >= CURDATE()
              )
        ORDER BY effectiveFrom DESC
        LIMIT 1;
    ";
}