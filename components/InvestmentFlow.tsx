"use client";

import { useState } from "react";
import InvestmentNeedsForm from "./InvestmentNeedsForm";
import SuitabilityGate from "./SuitabilityGate";
import InvestmentIllustrationList from "./InvestmentIllustrationList";
import ChatWidget from "./ChatWidget";
import LeadForm, { LeadFormValues } from "./LeadForm";
import HandoffDone from "./HandoffDone";
import Stepper from "./Stepper";
import { getAdvisorWhatsappLink } from "@/lib/whatsapp";
import { generateIllustrations, describeIllustrationsForAdvisor } from "@/lib/investmentEngine";
import { InvestmentIllustration, InvestmentNeedsInput } from "@/lib/types";

type Step = "needs" | "gate" | "illustrations" | "lead" | "done";

const STEPS: { key: Step; label: string }[] = [
  { key: "needs", label: "Your goals" },
  { key: "gate", label: "Understand the risks" },
  { key: "illustrations", label: "Compare & ask AI" },
  { key: "lead", label: "Talk to advisor" },
];

const INVESTMENT_CONSENT_TEXT =
  "I consent to Matchonn and its licensed advisors contacting me about this investment-linked plan via phone, WhatsApp, or email. I understand the risk factors I acknowledged above, that projections shown are not guaranteed, and that fund selection and final suitability will be assessed by a licensed advisor, not the AI.";

export default function InvestmentFlow() {
  const [step, setStep] = useState<Step>("needs");
  const [needs, setNeeds] = useState<InvestmentNeedsInput | null>(null);
  const [illustrations, setIllustrations] = useState<InvestmentIllustration[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [advisorNumber, setAdvisorNumber] = useState<string | null>(null);

  function handleNeedsSubmit(input: InvestmentNeedsInput) {
    setNeeds(input);
    setStep("gate");
  }

  function handleAcknowledge() {
    if (!needs) return;
    setIllustrations(generateIllustrations(needs));
    setStep("illustrations");
  }

  async function handleLeadSubmit(values: LeadFormValues) {
    if (!needs) return;
    setSubmitting(true);
    const selected = illustrations.find((i) => i.plan.id === selectedPlanId);
    const summary = selected
      ? `Interested in ${selected.plan.insurer} ${selected.plan.planName} (investment-linked), ₹${needs.annualPremium.toLocaleString("en-IN")}/yr over ${needs.horizonYears}y`
      : `Comparing investment-linked plans, ₹${needs.annualPremium.toLocaleString("en-IN")}/yr over ${needs.horizonYears}y`;

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        investmentNeeds: needs,
        selectedPlanId,
        suitabilityAcknowledged: true,
        interestedIn: ["investment"],
        advisorSummary: summary,
        source: "invest-flow",
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

      {step === "needs" && <InvestmentNeedsForm onSubmit={handleNeedsSubmit} />}

      {step === "gate" && <SuitabilityGate onAcknowledge={handleAcknowledge} />}

      {step === "illustrations" && needs && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <InvestmentIllustrationList
              illustrations={illustrations}
              selectedPlanId={selectedPlanId}
              onSelect={setSelectedPlanId}
            />
            <ChatWidget
              product="investment"
              summary={describeIllustrationsForAdvisor(needs, illustrations)}
              greeting="Hi! I'm the Matchonn AI advisor. I can explain lock-in, charges, and how these illustrations work — for fund choice and whether this suits you, we'll bring in a licensed advisor."
            />
          </div>
          <button
            onClick={() => setStep("lead")}
            className="w-full rounded-lg bg-accent-500 py-3 text-sm font-semibold text-white hover:bg-accent-600"
          >
            {selectedPlanId ? "Talk to an advisor about this plan" : "Talk to an advisor"}
          </button>
        </div>
      )}

      {step === "lead" && (
        <LeadForm
          onSubmit={handleLeadSubmit}
          submitting={submitting}
          heading="Almost done — a licensed advisor will assess suitability and fund choice with you"
          consentText={INVESTMENT_CONSENT_TEXT}
          submitLabel="Connect me with an advisor"
        />
      )}

      {step === "done" && whatsappLink && advisorNumber && (
        <HandoffDone
          whatsappLink={whatsappLink}
          advisorNumber={advisorNumber}
          description="Continue the conversation with a licensed advisor on WhatsApp — they'll assess suitability, help you choose funds, and take you through the actual purchase."
        />
      )}
    </div>
  );
}
