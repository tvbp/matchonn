import Link from "next/link";
import GroupEnquiryFlow from "@/components/GroupEnquiryFlow";

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link href="/" className="text-lg font-bold text-brand-700">
            Matchonn
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Group health insurance for your team</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            Tell us about your company once — a specialist runs it as an RFQ across our insurer panel and comes
            back with real quotes, since group pricing depends on your team&apos;s composition and claims
            history, not a one-size rate card.
          </p>
        </div>
        <GroupEnquiryFlow />
      </div>
    </main>
  );
}
