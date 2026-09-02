import FlowHeader from "@/components/FlowHeader";
import CommercialEnquiryFlow from "@/components/CommercialEnquiryFlow";

export default function MarineFirePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <FlowHeader />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-stone-900">Fire &amp; Marine cover for your business</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-stone-600">
            Tell us about your property or cargo once — a specialist runs it as an RFQ across our insurer
            panel. Larger sums insured often need a quick survey/inspection, so this isn&apos;t an instant
            online quote.
          </p>
        </div>
        <CommercialEnquiryFlow />
      </div>
    </main>
  );
}
