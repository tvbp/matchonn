"use client";

import { useState } from "react";
import NeedsForm from "./NeedsForm";
import QuoteList from "./QuoteList";
import ChatWidget from "./ChatWidget";
import LeadForm, { LeadFormValues } from "./LeadForm";
import { NeedsInput, ProductType, Quote } from "@/lib/types";

type Step = "needs" | "quotes" | "lead" | "done";

/** "919876543210" -> "+91 98765 43210" (falls back to a "+" prefix for
 * unrecognized lengths, e.g. non-Indian numbers). */
function formatPhoneDisplay(number: string): string {
  if (number.length === 12 && number.startsWith("91")) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}

const STEPS: { key: Step; label: string }[] = [
  { key: "needs", label: "Your needs" },
  { key: "quotes", label: "Compare & ask AI" },
  { key: "lead", label: "Talk to advisor" },
];

export default function AdvisorFlow({ initialProduct }: { initialProduct: ProductType }) {
  const [step, setStep] = useState<Step>("needs");
  const [needs, setNeeds] = useState<NeedsInput | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [advisorNumber, setAdvisorNumber] = useState<string | null>(null);

  async function handleNeedsSubmit(input: NeedsInput) {
    setNeeds(input);
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    setQuotes(data.quotes ?? []);
    setStep("quotes");
  }

  async function handleLeadSubmit(values: LeadFormValues) {
    if (!needs) return;
    setSubmitting(true);
    const selectedPlan = quotes.find((q) => q.plan.id === selectedPlanId);
    const summary = selectedPlan
      ? `Interested in ${selectedPlan.plan.insurer} ${selectedPlan.plan.planName} (${needs.productType}), ~₹${selectedPlan.estimatedMonthlyPremium}/mo`
      : `Comparing ${needs.productType} insurance plans`;

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        needs,
        selectedPlanId,
        interestedIn: [needs.productType],
        advisorSummary: summary,
        source: "advisor-flow",
      }),
    });
    setSubmitting(false);
    if (res.ok) {
      const number = process.env.NEXT_PUBLIC_ADVISOR_WHATSAPP_NUMBER || "910000000000";
      const message = encodeURIComponent(
        `Hi, I'm ${values.name}. ${summary}. Please help me with the next steps.`
      );
      setWhatsappLink(`https://wa.me/${number}?text=${message}`);
      setAdvisorNumber(number);
      setStep("done");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <ol className="mb-8 flex justify-between text-xs font-medium text-slate-400">
        {STEPS.map((s, i) => (
          <li
            key={s.key}
            className={
              step === s.key || STEPS.findIndex((x) => x.key === step) > i
                ? "text-brand-600"
                : ""
            }
          >
            {i + 1}. {s.label}
          </li>
        ))}
      </ol>

      {step === "needs" && <NeedsForm initialProduct={initialProduct} onSubmit={handleNeedsSubmit} />}

      {step === "quotes" && needs && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <QuoteList quotes={quotes} selectedPlanId={selectedPlanId} onSelect={setSelectedPlanId} />
            <ChatWidget needs={needs} quotes={quotes} />
          </div>
          <button
            onClick={() => setStep("lead")}
            className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {selectedPlanId ? "Talk to an advisor about this plan" : "Talk to an advisor"}
          </button>
        </div>
      )}

      {step === "lead" && <LeadForm onSubmit={handleLeadSubmit} submitting={submitting} />}

      {step === "done" && whatsappLink && advisorNumber && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">You&apos;re all set!</p>
          <p className="mt-2 text-sm text-slate-600">
            Continue the conversation with a licensed advisor on WhatsApp — they&apos;ll confirm details and take you through the actual purchase.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              Continue on WhatsApp
            </a>
            <a
              href={`tel:+${advisorNumber}`}
              className="inline-block rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Call instead
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            WhatsApp link not opening? Message or call us directly at{" "}
            <span className="font-medium text-slate-700">{formatPhoneDisplay(advisorNumber)}</span>. We also
            have your details already — an advisor may reach out to you first.
          </p>
        </div>
      )}
    </div>
  );
}
