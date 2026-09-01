"use client";

import { useState } from "react";
import CommercialEnquiryForm, { CommercialEnquiryValues } from "./CommercialEnquiryForm";
import HandoffDone from "./HandoffDone";
import { getAdvisorWhatsappLink } from "@/lib/whatsapp";

function buildSummary(enquiry: Omit<CommercialEnquiryValues, "contactName" | "phone" | "email" | "city" | "consentGiven">): string {
  if (enquiry.lineType === "fire" && enquiry.fire) {
    return `Fire & property enquiry: ${enquiry.companyName} (${enquiry.industry}), ${enquiry.fire.propertyType}, sum insured ~₹${enquiry.fire.sumInsuredBuildingLakh + enquiry.fire.sumInsuredStockMachineryLakh}L (building + stock/machinery)`;
  }
  if (enquiry.lineType === "marine" && enquiry.marine) {
    return `Marine cargo enquiry: ${enquiry.companyName} (${enquiry.industry}), ${enquiry.marine.tradeType} via ${enquiry.marine.transitMode}, ~₹${enquiry.marine.annualShipmentValueLakh}L annual shipment value`;
  }
  return `Commercial (${enquiry.lineType}) insurance enquiry: ${enquiry.companyName}`;
}

export default function CommercialEnquiryFlow() {
  const [submitting, setSubmitting] = useState(false);
  const [handoff, setHandoff] = useState<{ whatsappLink: string; advisorNumber: string } | null>(null);

  async function handleSubmit(values: CommercialEnquiryValues) {
    setSubmitting(true);
    const { contactName, phone, email, city, consentGiven, ...enquiry } = values;
    const summary = buildSummary(enquiry);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contactName,
        phone,
        email,
        city,
        consentGiven,
        commercialEnquiry: enquiry,
        interestedIn: [enquiry.lineType === "fire" ? "fire" : "marine"],
        advisorSummary: summary,
        source: "commercial-enquiry",
      }),
    });
    setSubmitting(false);
    if (res.ok) {
      setHandoff(
        getAdvisorWhatsappLink(
          `Hi, I'm ${contactName} from ${enquiry.companyName}. ${summary}. Please help us with the next steps.`
        )
      );
    }
  }

  if (handoff) {
    return (
      <HandoffDone
        whatsappLink={handoff.whatsappLink}
        advisorNumber={handoff.advisorNumber}
        heading="Thanks — we're on it!"
        description="A commercial insurance specialist will review this and get back to you with quotes from our insurer panel — larger sums insured may need a quick survey/inspection first. Feel free to reach out on WhatsApp in the meantime."
      />
    );
  }

  return <CommercialEnquiryForm onSubmit={handleSubmit} submitting={submitting} />;
}
