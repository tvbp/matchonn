"use client";

import { Quote } from "@/lib/types";

export default function QuoteList({
  quotes,
  selectedPlanId,
  onSelect,
}: {
  quotes: Quote[];
  selectedPlanId?: string;
  onSelect: (planId: string) => void;
}) {
  if (quotes.length === 0) {
    return (
      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
        No plans matched your age/product combination in our current panel. Please talk to an advisor directly.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Indicative estimates for comparison only — not a final quote. Actual premium depends on medical underwriting and insurer terms.
      </p>
      {quotes.map((q) => (
        <button
          key={q.plan.id}
          type="button"
          onClick={() => onSelect(q.plan.id)}
          className={`block w-full rounded-2xl border p-5 text-left transition ${
            selectedPlanId === q.plan.id
              ? "border-brand-600 bg-brand-50"
              : "border-slate-200 bg-white hover:border-brand-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">
                {q.plan.insurer} — {q.plan.planName}
              </p>
              <p className="text-sm text-slate-500">
                Cover: ₹{q.recommendedCoverLakh} lakh · Claim settlement ratio: {q.plan.claimSettlementRatio}%
                {q.plan.networkHospitals ? ` · ${q.plan.networkHospitals.toLocaleString("en-IN")} network hospitals` : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-brand-700">₹{q.estimatedMonthlyPremium.toLocaleString("en-IN")}/mo</p>
              <p className="text-xs text-slate-500">₹{q.estimatedAnnualPremium.toLocaleString("en-IN")}/yr</p>
            </div>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {q.plan.highlights.map((h) => (
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
