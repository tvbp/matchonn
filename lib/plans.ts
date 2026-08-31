import { InsurerPlan } from "./types";

/**
 * Illustrative plan/rate data for the MVP quote engine.
 *
 * These are NOT live insurer rates — Matchonn has no insurer/aggregator API
 * integration yet (see README). Rates are indicative approximations of
 * publicly published starting premiums, used only to demonstrate the
 * comparison UX. Swap `lib/quoteEngine.ts` + this file for a real
 * insurer/aggregator feed before quoting real customers.
 */
export const PLANS: InsurerPlan[] = [
  // --- Term life ---
  {
    id: "term-hdfc-click2protect",
    insurer: "HDFC Life",
    planName: "Click 2 Protect Super",
    type: "term",
    minEntryAge: 18,
    maxEntryAge: 65,
    claimSettlementRatio: 99.4,
    baseRatePerLakh: 55,
    highlights: ["Cover till age 85", "Return of premium option", "Terminal illness benefit"],
  },
  {
    id: "term-icici-ismart",
    insurer: "ICICI Prudential",
    planName: "iProtect Smart",
    type: "term",
    minEntryAge: 18,
    maxEntryAge: 60,
    claimSettlementRatio: 99.2,
    baseRatePerLakh: 58,
    highlights: ["Covers 34 critical illnesses", "Accidental death benefit", "Special rates for non-tobacco users"],
  },
  {
    id: "term-lic-tech-term",
    insurer: "LIC",
    planName: "Tech Term",
    type: "term",
    minEntryAge: 18,
    maxEntryAge: 65,
    claimSettlementRatio: 98.6,
    baseRatePerLakh: 62,
    highlights: ["India's largest insurer", "Two sum assured bands", "Level/increasing cover options"],
  },
  {
    id: "term-maxlife-smart-secure",
    insurer: "Max Life",
    planName: "Smart Secure Plus",
    type: "term",
    minEntryAge: 18,
    maxEntryAge: 65,
    claimSettlementRatio: 99.5,
    baseRatePerLakh: 54,
    highlights: ["Whole life cover option", "Premium break benefit", "Job loss cover rider"],
  },

  // --- Health (family floater) ---
  {
    id: "health-star-family",
    insurer: "Star Health",
    planName: "Family Health Optima",
    type: "health",
    minEntryAge: 18,
    maxEntryAge: 65,
    claimSettlementRatio: 91.5,
    baseRatePerLakh: 950,
    networkHospitals: 14000,
    highlights: ["Automatic sum insured restore", "No sub-limits on room rent", "Free health checkups"],
  },
  {
    id: "health-hdfc-optima-secure",
    insurer: "HDFC ERGO",
    planName: "Optima Secure",
    type: "health",
    minEntryAge: 18,
    maxEntryAge: 65,
    claimSettlementRatio: 96.8,
    baseRatePerLakh: 880,
    networkHospitals: 13000,
    highlights: ["Unlimited sum insured recharge", "Air ambulance cover", "Global cover add-on"],
  },
  {
    id: "health-niva-bupa-reassure",
    insurer: "Niva Bupa",
    planName: "ReAssure 2.0",
    type: "health",
    minEntryAge: 18,
    maxEntryAge: 65,
    claimSettlementRatio: 94.2,
    baseRatePerLakh: 900,
    networkHospitals: 10000,
    highlights: ["Unlimited restore, unlimited times", "No room rent capping", "Booster+ benefit"],
  },
  {
    id: "health-care-supreme",
    insurer: "Care Health",
    planName: "Care Supreme",
    type: "health",
    minEntryAge: 18,
    maxEntryAge: 65,
    claimSettlementRatio: 91.0,
    baseRatePerLakh: 830,
    networkHospitals: 8900,
    highlights: ["140% cumulative bonus in 5 years", "Air ambulance", "Annual health checkup"],
  },
];
