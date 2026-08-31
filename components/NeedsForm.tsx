"use client";

import { useState } from "react";
import { NeedsInput, ProductType } from "@/lib/types";

export default function NeedsForm({
  initialProduct,
  onSubmit,
}: {
  initialProduct: ProductType;
  onSubmit: (input: NeedsInput) => void;
}) {
  const [productType, setProductType] = useState<ProductType>(initialProduct);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<NeedsInput["gender"]>("male");
  const [tobaccoUser, setTobaccoUser] = useState(false);
  const [cityTier, setCityTier] = useState<1 | 2 | 3>(1);
  const [annualIncomeLakh, setAnnualIncomeLakh] = useState(8);
  const [familySize, setFamilySize] = useState(3);

  return (
    <form
      className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          productType,
          age,
          gender,
          tobaccoUser,
          cityTier,
          annualIncomeLakh,
          familySize,
        });
      }}
    >
      <div>
        <label className="block text-sm font-medium text-slate-700">What are you looking for?</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {(["term", "health"] as ProductType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setProductType(t)}
              className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
                productType === t
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {t === "term" ? "Term Life Insurance" : "Health Insurance"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Age</label>
          <input
            type="number"
            min={18}
            max={70}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as NeedsInput["gender"])}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Which city do you live in?</label>
        <select
          value={cityTier}
          onChange={(e) => setCityTier(Number(e.target.value) as 1 | 2 | 3)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value={1}>Metro (Mumbai, Delhi, Bangalore, ...)</option>
          <option value={2}>Tier 2 city</option>
          <option value={3}>Tier 3 / rural</option>
        </select>
      </div>

      {productType === "term" ? (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-700">Annual income (₹ lakh)</label>
            <input
              type="number"
              min={1}
              value={annualIncomeLakh}
              onChange={(e) => setAnnualIncomeLakh(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={tobaccoUser}
              onChange={(e) => setTobaccoUser(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            I use tobacco products
          </label>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-slate-700">Family members to cover</label>
          <input
            type="number"
            min={1}
            max={8}
            value={familySize}
            onChange={(e) => setFamilySize(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Compare plans
      </button>
    </form>
  );
}
