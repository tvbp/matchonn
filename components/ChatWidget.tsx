"use client";

import { useState } from "react";
import { NeedsInput, Quote } from "@/lib/types";

interface Turn {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget({ needs, quotes }: { needs: NeedsInput; quotes: Quote[] }) {
  const [turns, setTurns] = useState<Turn[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Matchonn AI advisor. Ask me anything about these plans — cover amount, claim settlement ratio, waiting periods — and I'll help you make sense of it before you talk to a licensed advisor.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const nextTurns: Turn[] = [...turns, { role: "user", content: input.trim() }];
    setTurns(nextTurns);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turns: nextTurns, needs, quotes }),
      });
      const data = await res.json();
      setTurns([...nextTurns, { role: "assistant", content: data.reply ?? data.error }]);
    } catch {
      setTurns([
        ...nextTurns,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[420px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {turns.map((t, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${
              t.role === "assistant"
                ? "bg-slate-100 text-slate-800"
                : "ml-auto bg-brand-600 text-white"
            }`}
          >
            {t.content}
          </div>
        ))}
        {loading && <div className="text-xs text-slate-400">Advisor is typing...</div>}
      </div>
      <div className="flex gap-2 border-t border-slate-200 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about cover, premium, claims..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          onClick={send}
          disabled={loading}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
