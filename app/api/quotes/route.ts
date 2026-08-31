import { NextRequest, NextResponse } from "next/server";
import { generateQuotes } from "@/lib/quoteEngine";
import { NeedsInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<NeedsInput>;

  if (!body.productType || !body.age || !body.cityTier) {
    return NextResponse.json(
      { error: "productType, age, and cityTier are required" },
      { status: 400 }
    );
  }

  const input: NeedsInput = {
    productType: body.productType,
    age: Number(body.age),
    gender: body.gender ?? "other",
    tobaccoUser: Boolean(body.tobaccoUser),
    cityTier: body.cityTier,
    annualIncomeLakh: body.annualIncomeLakh ? Number(body.annualIncomeLakh) : undefined,
    familySize: body.familySize ? Number(body.familySize) : undefined,
    existingCoverLakh: body.existingCoverLakh ? Number(body.existingCoverLakh) : undefined,
    monthlyBudget: body.monthlyBudget ? Number(body.monthlyBudget) : undefined,
  };

  const quotes = generateQuotes(input);
  return NextResponse.json({ quotes, input });
}
