import FlowHeader from "@/components/FlowHeader";
import InvestmentFlow from "@/components/InvestmentFlow";

export default function InvestPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <FlowHeader />

      <div className="mx-auto max-w-3xl px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Investment-linked insurance plans (ULIPs)</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
          Insurance and market-linked growth in one plan, with a mandatory 5-year lock-in. Not a
          fixed-return product — please read the risk acknowledgement below before we show any numbers.
        </p>
      </div>

      <InvestmentFlow />
    </main>
  );
}
