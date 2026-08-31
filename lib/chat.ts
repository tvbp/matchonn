import Anthropic from "@anthropic-ai/sdk";
import { NeedsInput, Quote } from "./types";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the Matchonn AI insurance advisor for customers in India.

Your job: ask short clarifying questions to understand the customer's insurance
need (term life or health insurance), explain how to think about cover amount
and plan features in plain language, and help them compare the plans already
shown to them.

Hard rules (India IRDAI compliance — do not break these):
- You are an AI assistant, not a licensed insurance agent. Never claim to be
  human, never claim to be a licensed advisor.
- Never finalize a sale, never collect payment, never promise a specific
  claim will be paid — claims depend on full underwriting and policy terms.
- Do not guarantee investment returns or "best" plan in absolute terms;
  present trade-offs (premium, claim settlement ratio, network hospitals,
  waiting periods) and let the customer decide.
- Always close by offering to connect the customer to a licensed human
  advisor (POSP) for the actual purchase and final advice — you can pre-fill
  what you learned for that handoff, but the sale itself must go through a
  licensed human.
- Keep answers short (3-6 sentences), friendly, and in plain English (or the
  customer's language if they switch).`;

function buildContextBlock(needs?: NeedsInput, quotes?: Quote[]): string {
  if (!needs) return "";
  const lines = [
    `Customer context — product: ${needs.productType}, age: ${needs.age}, city tier: ${needs.cityTier}, tobacco user: ${needs.tobaccoUser}.`,
  ];
  if (quotes?.length) {
    lines.push(
      "Shown quotes: " +
        quotes
          .slice(0, 4)
          .map(
            (q) =>
              `${q.plan.insurer} ${q.plan.planName} (cover ₹${q.recommendedCoverLakh}L, ~₹${q.estimatedMonthlyPremium}/mo, CSR ${q.plan.claimSettlementRatio}%)`
          )
          .join("; ")
    );
  }
  return lines.join("\n");
}

function fallbackReply(turns: ChatTurn[], needs?: NeedsInput): string {
  const lastUser = [...turns].reverse().find((t) => t.role === "user")?.content ?? "";
  const text = lastUser.toLowerCase();

  if (!needs) {
    return "I'm the Matchonn AI advisor. To get started, could you tell me whether you're looking at term life insurance or health insurance, and your age?";
  }
  if (text.includes("claim") || text.includes("settlement")) {
    return "Claim settlement ratio (CSR) is the % of claims an insurer paid out last year — higher is generally better, but always check it alongside network hospitals and waiting periods, not in isolation. I can connect you with a licensed advisor to walk through the fine print before you decide.";
  }
  if (text.includes("cover") || text.includes("sum assured") || text.includes("sum insured")) {
    return needs.productType === "term"
      ? "A common starting point is 15-20x your annual income in term cover, adjusted for existing loans and dependents — the quotes above already use that as a baseline. A licensed advisor can help fine-tune it to your situation."
      : "For health cover, family size and city (metro hospital costs run higher) matter most — the quotes above are sized on that basis. Happy to connect you with a licensed advisor to sanity-check the number.";
  }
  return "Good question — I'm running in offline/demo mode right now (no AI backend configured), so I can only answer a few common questions directly. For anything specific to your situation, let's get you to a licensed advisor who can give proper advice.";
}

export async function getAdvisorReply(
  turns: ChatTurn[],
  context?: { needs?: NeedsInput; quotes?: Quote[] }
): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return fallbackReply(turns, context?.needs);
  }

  const client = new Anthropic();
  const contextBlock = buildContextBlock(context?.needs, context?.quotes);

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-opus-5",
    max_tokens: 1024,
    system: contextBlock ? `${SYSTEM_PROMPT}\n\n${contextBlock}` : SYSTEM_PROMPT,
    output_config: { effort: "medium" },
    messages: turns.map((t) => ({ role: t.role, content: t.content })),
  });

  const textBlock = response.content.find(
    (b): b is Anthropic.TextBlock => b.type === "text"
  );
  return textBlock?.text ?? "Sorry, I couldn't generate a response — please try again.";
}
