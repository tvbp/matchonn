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
      {quotes.map((q, i) => (
        <button
          key={q.plan.id}
          type="button"
          onClick={() => onSelect(q.plan.id)}
          className={`relative block w-full rounded-2xl border p-5 text-left transition ${
            selectedPlanId === q.plan.id
              ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
              : "border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm"
          }`}
        >
          {selectedPlanId === q.plan.id && (
            <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
          <div className="flex items-center justify-between gap-4">
            <div>
              {i === 0 && (
                <span className="mb-1.5 inline-block whitespace-nowrap rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  Best match
                </span>
              )}
              <p className="font-semibold text-slate-900">
                {q.plan.insurer} — {q.plan.planName}
              </p>
              <p className="text-sm text-slate-500">
                Cover: ₹{q.recommendedCoverLakh} lakh · Claim settlement ratio: {q.plan.claimSettlementRatio}%
                {q.plan.networkHospitals ? ` · ${q.plan.networkHospitals.toLocaleString("en-IN")} network hospitals` : ""}
              </p>
            </div>
            <div className="shrink-0 text-right">
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
