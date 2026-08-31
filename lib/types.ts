export type ProductType = "term" | "health";

export interface NeedsInput {
  productType: ProductType;
  age: number;
  gender: "male" | "female" | "other";
  tobaccoUser: boolean;
  cityTier: 1 | 2 | 3;
  annualIncomeLakh?: number; // used for term sum-assured recommendation
  familySize?: number; // used for health floater sizing
  existingCoverLakh?: number;
  monthlyBudget?: number;
}

export interface InsurerPlan {
  id: string;
  insurer: string;
  planName: string;
  type: ProductType;
  minEntryAge: number;
  maxEntryAge: number;
  claimSettlementRatio: number; // percent, illustrative, insurer-published figure
  highlights: string[];
  /** Illustrative annual premium per lakh of sum assured/insured at age 30, non-tobacco. */
  baseRatePerLakh: number;
  networkHospitals?: number; // health only
}

export interface Quote {
  plan: InsurerPlan;
  recommendedCoverLakh: number;
  estimatedAnnualPremium: number;
  estimatedMonthlyPremium: number;
}

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  needs: NeedsInput;
  selectedPlanId?: string;
  interestedIn: ProductType[];
  waitlistProducts?: string[]; // e.g. "group-medical", "investment", "marine-fire"
  consentGiven: boolean;
  advisorSummary?: string;
  source: string;
}
