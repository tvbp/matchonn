import Anthropic from "@anthropic-ai/sdk";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export type ChatProduct = "term" | "health" | "investment";

const BASE_SYSTEM_PROMPT = `You are the Matchonn AI insurance advisor for customers in India.

Your job: ask short clarifying questions to understand the customer's need,
explain how to think about the product in plain language, and help them
compare the options already shown to them.

Hard rules (India IRDAI compliance — do not break these):
- You are an AI assistant, not a licensed insurance agent. Never claim to be
  human, never claim to be a licensed advisor.
- Never finalize a sale, never collect payment, never promise a specific
  claim will be paid — claims depend on full underwriting and policy terms.
- Do not claim any plan is the "best" in absolute terms; present trade-offs
  and let the customer decide.
- Always close by offering to connect the customer to a licensed human
  advisor (POSP) for the actual purchase and final advice — you can pre-fill
  what you learned for that handoff, but the sale itself must go through a
  licensed human.
- Keep answers short (3-6 sentences), friendly, and in plain English (or the
  customer's language if they switch).`;

const PRODUCT_RULES: Record<ChatProduct, string> = {
  term: `This conversation is about term life insurance. Talk about sum assured
sizing, claim settlement ratio, and rider options. Do not guarantee any
claim will be paid.`,
  health: `This conversation is about health insurance. Talk about sum insured
sizing, claim settlement ratio, network hospitals, and waiting periods. Do
not guarantee any claim will be paid.`,
  investment: `This conversation is about an investment-linked insurance plan (ULIP).
This is higher-risk territory — mis-selling these is the most common reason
distributors lose their IRDAI license, so follow these strictly:
- NEVER recommend a specific fund, fund allocation, or asset mix. Fund
  selection is a suitability decision for the customer and the licensed
  advisor, not you.
- NEVER state or imply a specific return is likely, guaranteed, or safe. The
  4%/8% figures shown are IRDAI-mandated illustration assumptions, not
  predictions — always describe them that way, never round them off as "you
  could expect ~6%" or similar.
- NEVER compare this plan's returns against mutual funds, FDs, stocks, or
  other investment products in a way that recommends one over another —
  that is investment advice, which is outside both your role and IRDAI's
  remit (it needs separate SEBI registration).
- Always mention the mandatory 5-year lock-in and that allocation/fund
  management charges reduce the invested amount when relevant.
- Push harder than usual toward the human advisor for anything about
  suitability, fund choice, or "should I buy this" — say you can't advise
  on that.`,
};

function buildSystemPrompt(product?: ChatProduct, summary?: string): string {
  const parts = [BASE_SYSTEM_PROMPT];
  if (product) parts.push(PRODUCT_RULES[product]);
  if (summary) parts.push(summary);
  return parts.join("\n\n");
}

function fallbackReply(turns: ChatTurn[], product?: ChatProduct): string {
  const lastUser = [...turns].reverse().find((t) => t.role === "user")?.content ?? "";
  const text = lastUser.toLowerCase();

  if (!product) {
    return "I'm the Matchonn AI advisor. To get started, could you tell me what you're looking for and a bit about yourself?";
  }
  if (product === "investment") {
    if (text.includes("guarantee") || text.includes("return") || text.includes("fund")) {
      return "I can't recommend specific funds or promise a return — the 4%/8% figures shown are IRDAI-mandated illustration assumptions, not predictions, and actual returns depend on market performance and the funds you choose. A licensed advisor can walk you through fund options and suitability.";
    }
    if (text.includes("lock") || text.includes("withdraw")) {
      return "ULIPs have a mandatory 5-year lock-in set by IRDAI — you can't withdraw before that (barring specific exceptions). A licensed advisor can explain partial withdrawal rules after lock-in for the plan you're considering.";
    }
    return "Good question — I'm running in offline/demo mode right now (no AI backend configured), so I can only answer a few common questions directly. For anything about suitability or fund choice, let's get you to a licensed advisor.";
  }
  if (text.includes("claim") || text.includes("settlement")) {
    return "Claim settlement ratio (CSR) is the % of claims an insurer paid out last year — higher is generally better, but always check it alongside network hospitals and waiting periods, not in isolation. I can connect you with a licensed advisor to walk through the fine print before you decide.";
  }
  if (text.includes("cover") || text.includes("sum assured") || text.includes("sum insured")) {
    return product === "term"
      ? "A common starting point is 15-20x your annual income in term cover, adjusted for existing loans and dependents — the quotes above already use that as a baseline. A licensed advisor can help fine-tune it to your situation."
      : "For health cover, family size and city (metro hospital costs run higher) matter most — the quotes above are sized on that basis. Happy to connect you with a licensed advisor to sanity-check the number.";
  }
  return "Good question — I'm running in offline/demo mode right now (no AI backend configured), so I can only answer a few common questions directly. For anything specific to your situation, let's get you to a licensed advisor who can give proper advice.";
}

export async function getAdvisorReply(
  turns: ChatTurn[],
  context?: { product?: ChatProduct; summary?: string }
): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return fallbackReply(turns, context?.product);
  }

  const client = new Anthropic();

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-opus-5",
    max_tokens: 1024,
    system: buildSystemPrompt(context?.product, context?.summary),
    output_config: { effort: "medium" },
    messages: turns.map((t) => ({ role: t.role, content: t.content })),
  });

  const textBlock = response.content.find(
    (b): b is Anthropic.TextBlock => b.type === "text"
  );
  return textBlock?.text ?? "Sorry, I couldn't generate a response — please try again.";
}
