"use client";

import { useState } from "react";

export interface LeadFormValues {
  name: string;
  phone: string;
  email?: string;
  city: string;
  consentGiven: boolean;
}

export default function LeadForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: LeadFormValues) => void;
  submitting: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  return (
    <form
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, phone, email: email || undefined, city, consentGiven });
      }}
    >
      <h3 className="font-semibold text-slate-900">Almost done — where should your advisor reach you?</h3>
      <div>
        <label className="block text-sm font-medium text-slate-700">Full name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label className="block text-sm font-medium text-slate-700">Email (optional)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">City</label>
        <input
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-slate-600">
        <input
          required
          type="checkbox"
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300"
        />
        I consent to Matchonn and its licensed advisors contacting me about insurance products via phone, WhatsApp, or email, and understand that any final advice and sale will be provided by a licensed advisor, not the AI.
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Connect me with an advisor"}
      </button>
    </form>
  );
}
