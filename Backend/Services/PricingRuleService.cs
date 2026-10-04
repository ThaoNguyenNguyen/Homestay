using Project.Backend.Models;
using Project.Backend.Repositories;

namespace Project.Backend.Services;

public class PricingRuleService
{
    private readonly PricingRuleRepository _pricingRuleRepository;

    public PricingRuleService(PricingRuleRepository pricingRuleRepository)
    {
        _pricingRuleRepository = pricingRuleRepository;
    }

    public async Task<List<PricingRule>>
    GetActivePricingRulesAsync(
        string pricingType)
    {
        return await _pricingRuleRepository
            .GetActiveAsync(pricingType);
    }



}