"use client";

import { InvestmentIllustration } from "@/lib/types";

export default function InvestmentIllustrationList({
  illustrations,
  selectedPlanId,
  onSelect,
}: {
  illustrations: InvestmentIllustration[];
  selectedPlanId?: string;
  onSelect: (planId: string) => void;
}) {
  if (illustrations.length === 0) {
    return (
      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
        No plans matched your age in our current panel. Please talk to an advisor directly.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
        ULIPs are subject to market risk. The 4%/8% figures below are IRDAI-mandated illustration
        assumptions, not promised or likely returns — actual maturity value depends on market performance,
        fund choice, and is not guaranteed. This is a simplified estimate (flat charges, no fund-level
        volatility) for comparison only.
      </p>
      {illustrations.map((i, idx) => (
        <button
          key={i.plan.id}
          type="button"
          onClick={() => onSelect(i.plan.id)}
          className={`relative block w-full rounded-2xl border p-5 text-left transition ${
            selectedPlanId === i.plan.id
              ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
              : "border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm"
          }`}
        >
          {selectedPlanId === i.plan.id && (
            <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
          <div className="flex items-center justify-between gap-4">
            <div>
              {idx === 0 && (
                <span className="mb-1.5 inline-block whitespace-nowrap rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  Matches your risk profile
                </span>
              )}
              <p className="font-semibold text-slate-900">
                {i.plan.insurer} — {i.plan.planName}
              </p>
              <p className="text-sm text-slate-500">
                Lock-in: {i.plan.lockInYears} years · Fund management charge: {i.plan.annualFundManagementChargePct}%/yr
                · Allocation charge (yr 1): {i.plan.premiumAllocationChargeYear1Pct}%
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-slate-500">Total invested (₹{i.totalPremiumsPaid.toLocaleString("en-IN")})</p>
              <p className="text-sm font-bold text-brand-700">
                ₹{i.projectedValueAt4Pct.toLocaleString("en-IN")} – ₹{i.projectedValueAt8Pct.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-slate-400">projected @ 4%–8% (not guaranteed)</p>
            </div>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {i.plan.highlights.map((h) => (
              <li key={h} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {h}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}
