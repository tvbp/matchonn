"use client";

import { useState } from "react";
import { CommercialEnquiry, CommercialLineType } from "@/lib/types";

export interface CommercialEnquiryValues extends CommercialEnquiry {
  contactName: string;
  phone: string;
  email: string;
  city: string;
  consentGiven: boolean;
}

const INDUSTRIES = [
  "Manufacturing",
  "Warehousing / Logistics",
  "Trading / Import-Export",
  "Retail / E-commerce",
  "IT / Software",
  "Other",
];

const PROPERTY_TYPES = ["Factory / Industrial", "Warehouse", "Office / Retail", "Other"];
const CARGO_TYPES = ["General merchandise", "Machinery", "Electronics", "Perishables", "Other"];

export default function CommercialEnquiryForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: CommercialEnquiryValues) => void;
  submitting: boolean;
}) {
  const [lineType, setLineType] = useState<CommercialLineType>("fire");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [cityTier, setCityTier] = useState<1 | 2 | 3>(1);
  const [currentlyInsured, setCurrentlyInsured] = useState(false);
  const [currentInsurer, setCurrentInsurer] = useState("");
  const [renewalMonth, setRenewalMonth] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactDesignation, setContactDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  // Fire fields
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [constructionType, setConstructionType] = useState<"RCC" | "Other">("RCC");
  const [sumInsuredBuildingLakh, setSumInsuredBuildingLakh] = useState(100);
  const [sumInsuredStockMachineryLakh, setSumInsuredStockMachineryLakh] = useState(50);
  const [hasFireSafetySystems, setHasFireSafetySystems] = useState(false);
  const [claimsInLast3Years, setClaimsInLast3Years] = useState(false);

  // Marine fields
  const [cargoType, setCargoType] = useState(CARGO_TYPES[0]);
  const [transitMode, setTransitMode] = useState<"Sea" | "Air" | "Road" | "Rail" | "Multimodal">("Sea");
  const [tradeType, setTradeType] = useState<"Domestic" | "Import" | "Export" | "Import & Export">("Export");
  const [annualShipmentValueLakh, setAnnualShipmentValueLakh] = useState(500);
  const [singleLargestConsignmentLakh, setSingleLargestConsignmentLakh] = useState(50);

  return (
    <form
      className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          lineType,
          companyName,
          industry,
          cityTier,
          currentlyInsured,
          currentInsurer: currentlyInsured ? currentInsurer : undefined,
          renewalMonth: renewalMonth || undefined,
          contactDesignation,
          fire:
            lineType === "fire"
              ? {
                  propertyType,
                  constructionType,
                  sumInsuredBuildingLakh,
                  sumInsuredStockMachineryLakh,
                  hasFireSafetySystems,
                  claimsInLast3Years,
                }
              : undefined,
          marine:
            lineType === "marine"
              ? { cargoType, transitMode, tradeType, annualShipmentValueLakh, singleLargestConsignmentLakh }
              : undefined,
          contactName,
          phone,
          email,
          city,
          consentGiven,
        });
      }}
    >
      <div>
        <label className="block text-sm font-medium text-slate-700">What do you need covered?</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {(["fire", "marine"] as CommercialLineType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setLineType(t)}
              className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
                lineType === t
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {t === "fire" ? "Fire & Property" : "Marine (Cargo / Transit)"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">About your company</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Company name</label>
            <input
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">City ({lineType === "fire" ? "property location" : "HQ"})</label>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">City tier</label>
            <select
              value={cityTier}
              onChange={(e) => setCityTier(Number(e.target.value) as 1 | 2 | 3)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value={1}>Metro</option>
              <option value={2}>Tier 2 city</option>
              <option value={3}>Tier 3 / rural</option>
            </select>
          </div>
        </div>
      </div>

      {lineType === "fire" ? (
        <div>
          <h3 className="font-semibold text-slate-900">Property details</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Property type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                {PROPERTY_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Construction type</label>
              <select
                value={constructionType}
                onChange={(e) => setConstructionType(e.target.value as "RCC" | "Other")}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="RCC">RCC (reinforced concrete)</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Sum insured — building (₹ lakh)</label>
              <input
                required
                type="number"
                min={1}
                value={sumInsuredBuildingLakh}
                onChange={(e) => setSumInsuredBuildingLakh(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Sum insured — stock & machinery (₹ lakh)</label>
              <input
                required
                type="number"
                min={0}
                value={sumInsuredStockMachineryLakh}
                onChange={(e) => setSumInsuredStockMachineryLakh(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={hasFireSafetySystems}
              onChange={(e) => setHasFireSafetySystems(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            We have fire safety systems installed (sprinklers, hydrants, etc.)
          </label>
          <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={claimsInLast3Years}
              onChange={(e) => setClaimsInLast3Years(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            We&apos;ve had a fire/property claim in the last 3 years
          </label>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-slate-900">Cargo & transit details</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Cargo type</label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                {CARGO_TYPES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Mode of transit</label>
              <select
                value={transitMode}
                onChange={(e) => setTransitMode(e.target.value as typeof transitMode)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="Sea">Sea</option>
                <option value="Air">Air</option>
                <option value="Road">Road</option>
                <option value="Rail">Rail</option>
                <option value="Multimodal">Multimodal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Trade type</label>
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value as typeof tradeType)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="Domestic">Domestic</option>
                <option value="Import">Import</option>
                <option value="Export">Export</option>
                <option value="Import & Export">Import &amp; Export</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Estimated annual shipment value (₹ lakh)</label>
              <input
                required
                type="number"
                min={1}
                value={annualShipmentValueLakh}
                onChange={(e) => setAnnualShipmentValueLakh(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Single largest consignment value (₹ lakh)</label>
              <input
                required
                type="number"
                min={1}
                value={singleLargestConsignmentLakh}
                onChange={(e) => setSingleLargestConsignmentLakh(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-slate-900">Current policy</h3>
        <div className="mt-3">
          <label className="block text-sm font-medium text-slate-700">Current policy renewal month (if any)</label>
          <input
            type="month"
            value={renewalMonth}
            onChange={(e) => setRenewalMonth(e.target.value)}
            className="mt-1 w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={currentlyInsured}
            onChange={(e) => setCurrentlyInsured(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          We already have a {lineType === "fire" ? "fire/property" : "marine"} policy
        </label>
        {currentlyInsured && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-slate-700">Current insurer</label>
            <input
              value={currentInsurer}
              onChange={(e) => setCurrentInsurer(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">Contact details</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Your name</label>
            <input
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Designation</label>
            <input
              required
              placeholder="e.g. Finance Manager, Founder"
              value={contactDesignation}
              onChange={(e) => setContactDesignation(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Phone (WhatsApp)</label>
            <input
              required
              type="tel"
              pattern="[0-9+ ]{10,15}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Work email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        </div>
      </div>

      <label className="flex items-start gap-2 text-xs text-slate-600">
        <input
          required
          type="checkbox"
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300"
        />
        I consent to Matchonn and its licensed advisors contacting our company about commercial insurance via
        phone, WhatsApp, or email, and understand that quotes are obtained from insurers on request (not
        instant, and may require a physical survey) and any final advice and sale will be provided by a
        licensed advisor.
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Request commercial insurance quotes"}
      </button>
    </form>
  );
}
