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

/**
 * Group medical is a B2B, advisor-led enquiry rather than a self-serve
 * quote — actual pricing depends on group composition and claims history,
 * so insurers quote it via RFQ, not an instant rate card like retail term
 * or health. This captures what an advisor needs to run that RFQ.
 */
export interface GroupMedicalEnquiry {
  companyName: string;
  industry: string;
  employeeCount: number;
  cityTier: 1 | 2 | 3;
  currentlyInsured: boolean;
  currentInsurer?: string;
  desiredSumInsuredLakh: number;
  renewalMonth?: string; // e.g. "2026-04", from an <input type="month">
  contactDesignation: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  needs?: NeedsInput;
  selectedPlanId?: string;
  groupMedicalEnquiry?: GroupMedicalEnquiry;
  interestedIn: string[];
  waitlistProducts?: string[]; // e.g. "investment", "marine-fire"
  consentGiven: boolean;
  advisorSummary?: string;
  source: string;
}
