"use client";

import { useState } from "react";

const LABELS: Record<string, string> = {
  "group-medical": "Group Medical (for employers)",
  investment: "Investment-linked plans (ULIP / endowment)",
  "marine-fire": "Marine & Fire (commercial)",
};

export default function WaitlistForm({ product }: { product: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");

  const label = LABELS[product] ?? product;

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">You&apos;re on the list!</p>
        <p className="mt-2 text-sm text-slate-600">
          We&apos;ll reach out on WhatsApp/phone once {label} is live on Matchonn.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("saving");
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            city: "",
            interestedIn: [],
            waitlistProducts: [product],
            consentGiven: true,
            source: "waitlist",
          }),
        });
        setStatus("done");
      }}
    >
      <h3 className="font-semibold text-slate-900">{label} — coming soon</h3>
      <p className="text-sm text-slate-600">Leave your details and we&apos;ll notify you when it&apos;s ready.</p>
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
        <label className="block text-sm font-medium text-slate-700">Phone</label>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {status === "saving" ? "Saving..." : "Notify me"}
      </button>
    </form>
  );
}
