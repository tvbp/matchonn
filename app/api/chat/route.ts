import { NextRequest, NextResponse } from "next/server";
import { getAdvisorReply, ChatTurn } from "@/lib/chat";
import { NeedsInput, Quote } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    turns?: ChatTurn[];
    needs?: NeedsInput;
    quotes?: Quote[];
  };

  if (!body.turns?.length) {
    return NextResponse.json({ error: "turns is required" }, { status: 400 });
  }

  try {
    const reply = await getAdvisorReply(body.turns, {
      needs: body.needs,
      quotes: body.quotes,
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
