import { INVESTMENT_PLANS } from "./investmentPlans";
import { InvestmentIllustration, InvestmentNeedsInput, InvestmentPlan } from "./types";

/** Illustrative flat mortality + admin charge — real ULIPs price this by
 * age/sum-at-risk via a mortality table, which is out of scope for an
 * indicative MVP illustration. */
const OTHER_CHARGES_PCT = 0.3;

/**
 * Future value of `horizonYears` annual premiums, net of allocation and
 * fund management charges, compounding at `grossRatePct`. Simplified on
 * purpose: no NAV volatility/sequence-of-returns risk, no mortality table,
 * no partial withdrawals — real returns will differ, sometimes a lot.
 */
function projectedValue(
  plan: InvestmentPlan,
  annualPremium: number,
  horizonYears: number,
  grossRatePct: number
): number {
  const netRate = (grossRatePct - plan.annualFundManagementChargePct) / 100;
  let total = 0;
  for (let year = 1; year <= horizonYears; year++) {
    const allocationChargePct =
      year === 1 ? plan.premiumAllocationChargeYear1Pct : plan.renewalAllocationChargePct;
    const netInvested = annualPremium * (1 - allocationChargePct / 100) * (1 - OTHER_CHARGES_PCT / 100);
    const yearsToGrow = horizonYears - year + 1;
    total += netInvested * Math.pow(1 + netRate, yearsToGrow);
  }
  return Math.round(total);
}

export function getEligibleInvestmentPlans(age: number): InvestmentPlan[] {
  return INVESTMENT_PLANS.filter((p) => age >= p.minEntryAge && age <= p.maxEntryAge);
}

export function generateIllustrations(input: InvestmentNeedsInput): InvestmentIllustration[] {
  const illustrations: InvestmentIllustration[] = getEligibleInvestmentPlans(input.age).map((plan) => ({
    plan,
    annualPremium: input.annualPremium,
    horizonYears: input.horizonYears,
    totalPremiumsPaid: input.annualPremium * input.horizonYears,
    projectedValueAt4Pct: projectedValue(plan, input.annualPremium, input.horizonYears, 4),
    projectedValueAt8Pct: projectedValue(plan, input.annualPremium, input.horizonYears, 8),
  }));

  // Plans matching the customer's stated risk appetite first, then by the
  // conservative (4%) projection so we're not sorting on the rosier number.
  return illustrations.sort((a, b) => {
    const aMatch = a.plan.fundCategory === input.riskAppetite ? 0 : 1;
    const bMatch = b.plan.fundCategory === input.riskAppetite ? 0 : 1;
    if (aMatch !== bMatch) return aMatch - bMatch;
    return b.projectedValueAt4Pct - a.projectedValueAt4Pct;
  });
}

/** One-paragraph summary handed to the AI advisor chat as context. */
export function describeIllustrationsForAdvisor(
  input: InvestmentNeedsInput,
  illustrations: InvestmentIllustration[]
): string {
  const lines = [
    `Customer context — investment-linked plan enquiry, age ${input.age}, annual premium ₹${input.annualPremium.toLocaleString("en-IN")}, horizon ${input.horizonYears} years, stated risk appetite: ${input.riskAppetite}.`,
  ];
  if (illustrations.length) {
    lines.push(
      "Shown illustrations (4%/8% IRDAI-mandated assumed gross return, not guaranteed): " +
        illustrations
          .slice(0, 4)
          .map(
            (i) =>
              `${i.plan.insurer} ${i.plan.planName} (lock-in ${i.plan.lockInYears}y, projected ₹${i.projectedValueAt4Pct.toLocaleString("en-IN")}–₹${i.projectedValueAt8Pct.toLocaleString("en-IN")} vs ₹${i.totalPremiumsPaid.toLocaleString("en-IN")} paid in)`
          )
          .join("; ")
    );
  }
  return lines.join("\n");
}
