import Link from "next/link";
import InvestmentFlow from "@/components/InvestmentFlow";

export default function InvestPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link href="/" className="text-lg font-bold text-brand-700">
            Matchonn
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Investment-linked insurance plans (ULIPs)</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
          Insurance-cum-investment plans with a mandatory 5-year lock-in and market-linked returns. Not a
          fixed-return product — please read the risk acknowledgement below before comparing plans.
        </p>
      </div>

      <InvestmentFlow />
    </main>
  );
}
