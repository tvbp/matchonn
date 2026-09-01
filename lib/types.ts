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

export type InvestmentRiskAppetite = "conservative" | "balanced" | "aggressive";

export interface InvestmentNeedsInput {
  age: number;
  annualPremium: number; // ₹, not lakh — ULIP premiums are usually well under ₹1L/year
  horizonYears: number; // >= 5, enforced by the 5-year IRDAI lock-in on ULIPs
  riskAppetite: InvestmentRiskAppetite;
}

export interface InvestmentPlan {
  id: string;
  insurer: string;
  planName: string;
  minEntryAge: number;
  maxEntryAge: number;
  lockInYears: number;
  premiumAllocationChargeYear1Pct: number;
  renewalAllocationChargePct: number;
  annualFundManagementChargePct: number;
  claimSettlementRatio: number;
  fundCategory: InvestmentRiskAppetite;
  highlights: string[];
}

/**
 * Two projections at IRDAI's mandated illustration assumptions (4%/8% p.a.
 * gross investment return) — neither is a promise, both are simplified
 * (flat annual charges, no mortality table, no NAV volatility). See
 * lib/investmentEngine.ts for the calculation and its caveats.
 */
export interface InvestmentIllustration {
  plan: InvestmentPlan;
  annualPremium: number;
  horizonYears: number;
  totalPremiumsPaid: number;
  projectedValueAt4Pct: number;
  projectedValueAt8Pct: number;
}

export type CommercialLineType = "fire" | "marine";

export interface FireEnquiry {
  propertyType: string; // e.g. "Factory / Industrial", "Warehouse", "Office / Retail", "Other"
  constructionType: "RCC" | "Other";
  sumInsuredBuildingLakh: number;
  sumInsuredStockMachineryLakh: number;
  hasFireSafetySystems: boolean;
  claimsInLast3Years: boolean;
}

export interface MarineEnquiry {
  cargoType: string; // e.g. "General merchandise", "Machinery", "Electronics", "Perishables", "Other"
  transitMode: "Sea" | "Air" | "Road" | "Rail" | "Multimodal";
  tradeType: "Domestic" | "Import" | "Export" | "Import & Export";
  annualShipmentValueLakh: number;
  singleLargestConsignmentLakh: number;
}

/**
 * Marine and fire are commercial/property lines — pricing depends on
 * underwriting detail (construction, occupancy, cargo/transit risk) and
 * often a physical survey for larger sums insured, so like group medical
 * this is an RFQ enquiry an advisor runs, not a self-serve instant quote.
 */
export interface CommercialEnquiry {
  lineType: CommercialLineType;
  companyName: string;
  industry: string;
  cityTier: 1 | 2 | 3;
  currentlyInsured: boolean;
  currentInsurer?: string;
  renewalMonth?: string;
  contactDesignation: string;
  fire?: FireEnquiry;
  marine?: MarineEnquiry;
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
  investmentNeeds?: InvestmentNeedsInput;
  suitabilityAcknowledged?: boolean;
  commercialEnquiry?: CommercialEnquiry;
  interestedIn: string[];
  waitlistProducts?: string[];
  consentGiven: boolean;
  advisorSummary?: string;
  source: string;
}
