"use client";

import { useState } from "react";
import NeedsForm from "./NeedsForm";
import QuoteList from "./QuoteList";
import ChatWidget from "./ChatWidget";
import LeadForm, { LeadFormValues } from "./LeadForm";
import HandoffDone from "./HandoffDone";
import Stepper from "./Stepper";
import { getAdvisorWhatsappLink } from "@/lib/whatsapp";
import { describeQuotesForAdvisor } from "@/lib/quoteEngine";
import { NeedsInput, ProductType, Quote } from "@/lib/types";

type Step = "needs" | "quotes" | "lead" | "done";

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
      const { whatsappLink: link, advisorNumber: number } = getAdvisorWhatsappLink(
        `Hi, I'm ${values.name}. ${summary}. Please help me with the next steps.`
      );
      setWhatsappLink(link);
      setAdvisorNumber(number);
      setStep("done");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Stepper steps={STEPS} currentKey={step} />

      {step === "needs" && <NeedsForm initialProduct={initialProduct} onSubmit={handleNeedsSubmit} />}

      {step === "quotes" && needs && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <QuoteList quotes={quotes} selectedPlanId={selectedPlanId} onSelect={setSelectedPlanId} />
            <ChatWidget product={needs.productType} summary={describeQuotesForAdvisor(needs, quotes)} />
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
        <HandoffDone
          whatsappLink={whatsappLink}
          advisorNumber={advisorNumber}
          description="Continue the conversation with a licensed advisor on WhatsApp — they'll confirm details and take you through the actual purchase."
        />
      )}
    </div>
  );
}
