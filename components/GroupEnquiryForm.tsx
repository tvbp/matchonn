"use client";

import { useState } from "react";
import { GroupMedicalEnquiry } from "@/lib/types";

export interface GroupEnquiryValues extends GroupMedicalEnquiry {
  contactName: string;
  phone: string;
  email: string;
  city: string;
  consentGiven: boolean;
}

const INDUSTRIES = [
  "IT / Software",
  "Manufacturing",
  "Retail / E-commerce",
  "Healthcare",
  "Financial Services",
  "Professional Services",
  "Other",
];

export default function GroupEnquiryForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: GroupEnquiryValues) => void;
  submitting: boolean;
}) {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [employeeCount, setEmployeeCount] = useState(20);
  const [cityTier, setCityTier] = useState<1 | 2 | 3>(1);
  const [currentlyInsured, setCurrentlyInsured] = useState(false);
  const [currentInsurer, setCurrentInsurer] = useState("");
  const [desiredSumInsuredLakh, setDesiredSumInsuredLakh] = useState(3);
  const [renewalMonth, setRenewalMonth] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactDesignation, setContactDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  return (
    <form
      className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          companyName,
          industry,
          employeeCount,
          cityTier,
          currentlyInsured,
          currentInsurer: currentlyInsured ? currentInsurer : undefined,
          desiredSumInsuredLakh,
          renewalMonth: renewalMonth || undefined,
          contactDesignation,
          contactName,
          phone,
          email,
          city,
          consentGiven,
        });
      }}
    >
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
            <label className="block text-sm font-medium text-slate-700">Number of employees to cover</label>
            <input
              required
              type="number"
              min={5}
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            <p className="mt-1 text-xs text-slate-500">Most insurers need a minimum group size of ~7 employees.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">City (HQ)</label>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">Cover requirements</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Desired sum insured per employee (₹ lakh)</label>
            <input
              required
              type="number"
              min={1}
              value={desiredSumInsuredLakh}
              onChange={(e) => setDesiredSumInsuredLakh(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Current policy renewal month (if any)</label>
            <input
              type="month"
              value={renewalMonth}
              onChange={(e) => setRenewalMonth(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={currentlyInsured}
            onChange={(e) => setCurrentlyInsured(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          We already have a group health policy
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
              placeholder="e.g. HR Manager, Founder"
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
        I consent to Matchonn and its licensed advisors contacting our company about group insurance via phone,
        WhatsApp, or email, and understand that quotes are obtained from insurers on request (not instant) and
        any final advice and sale will be provided by a licensed advisor.
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Request group insurance quotes"}
      </button>
    </form>
  );
}
