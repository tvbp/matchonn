"use client";

import { useState } from "react";

const ACKNOWLEDGEMENTS = [
  "This is a market-linked insurance plan (ULIP), not a fixed-return investment or a mutual fund.",
  "There is a mandatory 5-year lock-in — I cannot withdraw my money before that (barring specific exceptions).",
  "Returns are not guaranteed. The 4%/8% figures I'll see are IRDAI-mandated illustration assumptions, not promises — actual returns depend on market performance and the funds I choose.",
  "Allocation, fund management, and other charges will be deducted from my premium before it's invested.",
];

export default function SuitabilityGate({ onAcknowledge }: { onAcknowledge: () => void }) {
  const [checked, setChecked] = useState<boolean[]>(ACKNOWLEDGEMENTS.map(() => false));
  const allChecked = checked.every(Boolean);

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h3 className="font-semibold text-slate-900">Before we show you any numbers</h3>
      <p className="mt-1 text-sm text-slate-600">
        Investment-linked plans carry market risk and are one of the most common sources of insurance
        mis-selling complaints in India. Please confirm you understand the following:
      </p>
      <ul className="mt-4 space-y-3">
        {ACKNOWLEDGEMENTS.map((text, i) => (
          <li key={i}>
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={(e) =>
                  setChecked((prev) => prev.map((v, idx) => (idx === i ? e.target.checked : v)))
                }
                className="mt-0.5 h-4 w-4 rounded border-slate-300"
              />
              {text}
            </label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!allChecked}
        onClick={onAcknowledge}
        className="mt-5 w-full rounded-lg bg-accent-500 py-3 text-sm font-semibold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        I understand — show me illustrations
      </button>
    </div>
  );
}
