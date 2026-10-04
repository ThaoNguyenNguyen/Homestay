using Microsoft.AspNetCore.Mvc;
using Project.Backend.Models;
using Project.Backend.Services;

namespace Project.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PricingRuleController : ControllerBase
{
    private readonly PricingRuleService _pricingRuleService;

    public PricingRuleController(PricingRuleService pricingRuleService)
    {
        _pricingRuleService = pricingRuleService;
    }

    [HttpGet("GetActivePricingRules")]
    public async Task<IActionResult> GetActivePricingRules(
    string pricingType)
    {
        var result =
            await _pricingRuleService
                .GetActivePricingRulesAsync(
                    pricingType
                );

        return Ok(result);
    }



}