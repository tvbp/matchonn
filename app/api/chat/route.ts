import { NextRequest, NextResponse } from "next/server";
import { getAdvisorReply, ChatTurn, ChatProduct } from "@/lib/chat";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    turns?: ChatTurn[];
    product?: ChatProduct;
    summary?: string;
  };

  if (!body.turns?.length) {
    return NextResponse.json({ error: "turns is required" }, { status: 400 });
  }

  try {
    const reply = await getAdvisorReply(body.turns, {
      product: body.product,
      summary: body.summary,
    });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("advisor chat error", err);
    return NextResponse.json(
      { error: "The advisor is temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }
}
