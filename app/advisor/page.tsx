import Link from "next/link";
import AdvisorFlow from "@/components/AdvisorFlow";
import WaitlistForm from "@/components/WaitlistForm";
import { ProductType } from "@/lib/types";

export default function AdvisorPage({
  searchParams,
}: {
  searchParams: { product?: string; waitlist?: string };
}) {
  const product: ProductType = searchParams.product === "health" ? "health" : "term";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link href="/" className="text-lg font-bold text-brand-700">
            Matchonn
          </Link>
        </div>
      </header>

      {searchParams.waitlist ? (
        <div className="mx-auto max-w-md px-6 py-16">
          <WaitlistForm product={searchParams.waitlist} />
        </div>
      ) : (
        <AdvisorFlow initialProduct={product} />
      )}
    </main>
  );
}
