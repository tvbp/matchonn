import FlowHeader from "@/components/FlowHeader";
import AdvisorFlow from "@/components/AdvisorFlow";
import { ProductType } from "@/lib/types";

export default function AdvisorPage({
  searchParams,
}: {
  searchParams: { product?: string };
}) {
  const product: ProductType = searchParams.product === "health" ? "health" : "term";

  return (
    <main className="min-h-screen bg-slate-50">
      <FlowHeader />

      <div className="mx-auto max-w-3xl px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Let&apos;s find the right cover for you</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
          Answer a few quick questions and we&apos;ll match you against real plans from top insurers in
          seconds — no phone number required until you ask for one.
        </p>
      </div>

      <AdvisorFlow initialProduct={product} />
    </main>
  );
}
