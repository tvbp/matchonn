import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/db";
import { Lead } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Lead>;

  if (!body.name || !body.phone || !body.consentGiven) {
    return NextResponse.json(
      { error: "name, phone, and consent are required" },
      { status: 400 }
    );
  }

  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: body.name,
    phone: body.phone,
    email: body.email,
    city: body.city ?? "",
    needs: body.needs as Lead["needs"],
    selectedPlanId: body.selectedPlanId,
    interestedIn: body.interestedIn ?? [],
    waitlistProducts: body.waitlistProducts ?? [],
    consentGiven: true,
    advisorSummary: body.advisorSummary,
    source: body.source ?? "web",
  };

  await saveLead(lead);

  return NextResponse.json({ ok: true, leadId: lead.id });
}
