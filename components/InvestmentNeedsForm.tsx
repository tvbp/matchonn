"use client";

import { useState } from "react";
import { InvestmentNeedsInput, InvestmentRiskAppetite } from "@/lib/types";

const RISK_OPTIONS: { value: InvestmentRiskAppetite; label: string; hint: string }[] = [
  { value: "conservative", label: "Conservative", hint: "Prefer stability, okay with lower upside" },
  { value: "balanced", label: "Balanced", hint: "Mix of stability and growth" },
  { value: "aggressive", label: "Growth-focused", hint: "Comfortable with more ups and downs" },
];

export default function InvestmentNeedsForm({
  onSubmit,
}: {
  onSubmit: (input: InvestmentNeedsInput) => void;
}) {
  const [age, setAge] = useState(30);
  const [annualPremium, setAnnualPremium] = useState(100000);
  const [horizonYears, setHorizonYears] = useState(10);
  const [riskAppetite, setRiskAppetite] = useState<InvestmentRiskAppetite>("balanced");

  return (
    <form
      className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ age, annualPremium, horizonYears, riskAppetite });
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Age</label>
          <input
            type="number"
            min={18}
            max={65}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Annual premium you want to invest (₹)</label>
          <input
            type="number"
            min={24000}
            step={1000}
            value={annualPremium}
            onChange={(e) => setAnnualPremium(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Investment horizon (years) — minimum 5, the mandatory ULIP lock-in
        </label>
        <input
          type="number"
          min={5}
          max={30}
          value={horizonYears}
          onChange={(e) => setHorizonYears(Math.max(5, Number(e.target.value)))}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">How do you feel about market ups and downs?</label>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {RISK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setRiskAppetite(opt.value)}
              className={`rounded-lg border px-3 py-3 text-left text-sm ${
                riskAppetite === opt.value
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="block font-semibold">{opt.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{opt.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Continue
      </button>
    </form>
  );
}
