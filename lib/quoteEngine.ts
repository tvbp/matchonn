import { PLANS } from "./plans";
import { InsurerPlan, NeedsInput, Quote } from "./types";

/** Illustrative age-band multiplier vs. the age-30 base rate. Rough shape of
 * real mortality/morbidity curves, not actual insurer pricing. */
function ageMultiplier(age: number, type: NeedsInput["productType"]): number {
  const bands =
    type === "term"
      ? [
          { max: 25, mult: 0.75 },
          { max: 30, mult: 1.0 },
          { max: 35, mult: 1.35 },
          { max: 40, mult: 1.9 },
          { max: 45, mult: 2.7 },
          { max: 50, mult: 4.0 },
          { max: 55, mult: 5.8 },
          { max: 60, mult: 8.5 },
          { max: 200, mult: 12.5 },
        ]
      : [
          { max: 25, mult: 0.7 },
          { max: 30, mult: 1.0 },
          { max: 35, mult: 1.15 },
          { max: 40, mult: 1.35 },
          { max: 45, mult: 1.6 },
          { max: 50, mult: 2.0 },
          { max: 55, mult: 2.5 },
          { max: 60, mult: 3.2 },
          { max: 200, mult: 4.2 },
        ];
  return bands.find((b) => age <= b.max)?.mult ?? bands[bands.length - 1].mult;
}

function recommendTermCoverLakh(input: NeedsInput): number {
  const income = input.annualIncomeLakh ?? 6;
  const existing = input.existingCoverLakh ?? 0;
  const recommended = Math.round(income * 15 - existing);
  return Math.max(25, recommended);
}

function recommendHealthCoverLakh(input: NeedsInput): number {
  const familySize = input.familySize ?? 1;
  const cityFactor = input.cityTier === 1 ? 1.5 : input.cityTier === 2 ? 1.2 : 1;
  const base = 5 + familySize * 2;
  return Math.round(base * cityFactor);
}

export function getEligiblePlans(input: NeedsInput): InsurerPlan[] {
  return PLANS.filter(
    (p) => p.type === input.productType && input.age >= p.minEntryAge && input.age <= p.maxEntryAge
  );
}

export function generateQuotes(input: NeedsInput): Quote[] {
  const coverLakh =
    input.productType === "term" ? recommendTermCoverLakh(input) : recommendHealthCoverLakh(input);
  const mult = ageMultiplier(input.age, input.productType);
  const tobaccoLoad = input.tobaccoUser && input.productType === "term" ? 1.4 : 1;

  const quotes: Quote[] = getEligiblePlans(input).map((plan) => {
    const annual = Math.round(plan.baseRatePerLakh * coverLakh * mult * tobaccoLoad);
    return {
      plan,
      recommendedCoverLakh: coverLakh,
      estimatedAnnualPremium: annual,
      estimatedMonthlyPremium: Math.round(annual / 12),
    };
  });

  // Rank by a blend of price and claim settlement ratio so the cheapest
  // low-CSR plan doesn't always win top spot.
  return quotes.sort((a, b) => {
    const scoreA = a.estimatedAnnualPremium / (a.plan.claimSettlementRatio / 100);
    const scoreB = b.estimatedAnnualPremium / (b.plan.claimSettlementRatio / 100);
    return scoreA - scoreB;
  });
}
