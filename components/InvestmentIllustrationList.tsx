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
      {illustrations.map((i) => (
        <button
          key={i.plan.id}
          type="button"
          onClick={() => onSelect(i.plan.id)}
          className={`block w-full rounded-2xl border p-5 text-left transition ${
            selectedPlanId === i.plan.id
              ? "border-brand-600 bg-brand-50"
              : "border-slate-200 bg-white hover:border-brand-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">
                {i.plan.insurer} — {i.plan.planName}
              </p>
              <p className="text-sm text-slate-500">
                Lock-in: {i.plan.lockInYears} years · Fund management charge: {i.plan.annualFundManagementChargePct}%/yr
                · Allocation charge (yr 1): {i.plan.premiumAllocationChargeYear1Pct}%
              </p>
            </div>
            <div className="text-right">
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
