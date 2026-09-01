"use client";

import { useState } from "react";
import GroupEnquiryForm, { GroupEnquiryValues } from "./GroupEnquiryForm";
import HandoffDone from "./HandoffDone";
import { getAdvisorWhatsappLink } from "@/lib/whatsapp";

export default function GroupEnquiryFlow() {
  const [submitting, setSubmitting] = useState(false);
  const [handoff, setHandoff] = useState<{ whatsappLink: string; advisorNumber: string } | null>(null);

  async function handleSubmit(values: GroupEnquiryValues) {
    setSubmitting(true);
    const { contactName, phone, email, city, consentGiven, ...enquiry } = values;
    const summary = `Group medical enquiry: ${enquiry.companyName} (${enquiry.industry}, ${enquiry.employeeCount} employees), ~₹${enquiry.desiredSumInsuredLakh}L sum insured per employee`;

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contactName,
        phone,
        email,
        city,
        consentGiven,
        groupMedicalEnquiry: enquiry,
        interestedIn: ["group-medical"],
        advisorSummary: summary,
        source: "business-enquiry",
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
        description="A group insurance specialist will review this and get back to you with quotes from our insurer panel, usually within one business day. Feel free to reach out on WhatsApp in the meantime."
      />
    );
  }

  return <GroupEnquiryForm onSubmit={handleSubmit} submitting={submitting} />;
}
