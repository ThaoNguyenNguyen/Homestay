// services/pricingRuleApi.ts

export type PricingType =
  | "HOURLY"
  | "OVERNIGHT"
  | "DAILY";

export interface PricingRule {
  id: number;
  roomTypeId: number;
  pricingType: PricingType;
  duration: number;
  price: number;
  startTime?: string | null;
  endTime?: string | null;
  status: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  description?: string | null;
  createdAt: string;
}

export async function getActivePricingRules(
  pricingType: PricingType
): Promise<PricingRule[]> {
  const response = await fetch(
    `http://localhost:5000/api/PricingRule/GetActivePricingRules?pricingType=${pricingType}`
  );

  if (!response.ok) {
    throw new Error("Không thể lấy bảng giá");
  }

  return response.json();
}