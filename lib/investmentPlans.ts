import { InvestmentPlan } from "./types";

/**
 * Illustrative ULIP plan/charge data for the MVP illustration engine — see
 * the caveat in lib/plans.ts: not live insurer rates, no insurer API
 * integration yet. Charge structures are approximations of the modern
 * "zero/low allocation charge" online ULIP norm, plus one traditional-style
 * plan for contrast.
 */
export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: "invest-hdfc-click2wealth",
    insurer: "HDFC Life",
    planName: "Click 2 Wealth",
    minEntryAge: 18,
    maxEntryAge: 65,
    lockInYears: 5,
    premiumAllocationChargeYear1Pct: 0,
    renewalAllocationChargePct: 0,
    annualFundManagementChargePct: 1.35,
    claimSettlementRatio: 99.4,
    fundCategory: "aggressive",
    highlights: ["Zero allocation charge", "Multiple equity-heavy fund options", "Loyalty additions from year 6"],
  },
  {
    id: "invest-icici-signature",
    insurer: "ICICI Prudential",
    planName: "Signature",
    minEntryAge: 18,
    maxEntryAge: 65,
    lockInYears: 5,
    premiumAllocationChargeYear1Pct: 0,
    renewalAllocationChargePct: 0,
    annualFundManagementChargePct: 1.35,
    claimSettlementRatio: 99.2,
    fundCategory: "balanced",
    highlights: ["Wealth boosters from year 6", "Free unlimited fund switches", "Flexible premium payment term"],
  },
  {
    id: "invest-sbi-ewealth",
    insurer: "SBI Life",
    planName: "eWealth Insurance",
    minEntryAge: 18,
    maxEntryAge: 65,
    lockInYears: 5,
    premiumAllocationChargeYear1Pct: 0,
    renewalAllocationChargePct: 0,
    annualFundManagementChargePct: 1.35,
    claimSettlementRatio: 97.8,
    fundCategory: "conservative",
    highlights: ["Low-cost online-only plan", "Choice of debt-leaning funds", "No allocation charge"],
  },
  {
    id: "invest-maxlife-online-savings",
    insurer: "Max Life",
    planName: "Online Savings Plan",
    minEntryAge: 18,
    maxEntryAge: 60,
    lockInYears: 5,
    premiumAllocationChargeYear1Pct: 4,
    renewalAllocationChargePct: 2,
    annualFundManagementChargePct: 1.35,
    claimSettlementRatio: 99.5,
    fundCategory: "balanced",
    highlights: ["Guaranteed additions option", "Partial withdrawal after lock-in", "Multiple portfolio strategy funds"],
  },
];
