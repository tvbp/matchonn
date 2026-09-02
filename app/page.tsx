import Link from "next/link";

const PERSONAL_PRODUCTS = [
  {
    key: "term",
    href: "/advisor?product=term",
    title: "Term Life",
    blurb: "Protect your family's income for a fraction of its value. Real numbers from HDFC Life, ICICI Prudential, LIC, and Max Life.",
    cta: "Compare",
  },
  {
    key: "health",
    href: "/advisor?product=health",
    title: "Health Insurance",
    blurb: "Cover hospital costs before they become a financial setback. Family floater plans from four leading insurers.",
    cta: "Compare",
  },
  {
    key: "invest",
    href: "/invest",
    title: "Investment-Linked",
    blurb: "Insurance and market-linked growth in one plan — we walk you through the risks before showing any numbers.",
    cta: "See how it works",
  },
];

const BUSINESS_PRODUCTS = [
  {
    key: "group-medical",
    href: "/business",
    title: "Group Medical",
    blurb: "Give your team real health cover, sorted in one conversation — one form, quotes from our full insurer panel.",
    cta: "Get a quote",
  },
  {
    key: "marine-fire",
    href: "/marine-fire",
    title: "Fire & Marine",
    blurb: "Protect property, stock, and cargo — quoted properly, with surveys included where insurers require them.",
    cta: "Get a quote",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="flex items-center justify-between px-16 py-6">
        <span className="text-xl font-bold text-stone-900">Matchonn</span>
        <nav className="flex items-center gap-9">
          <a href="#personal" className="text-sm font-medium text-stone-600 hover:text-stone-900">
            For you
          </a>
          <a href="#business" className="text-sm font-medium text-stone-600 hover:text-stone-900">
            For your business
          </a>
          <Link
            href="/advisor"
            className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Get matched
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-[740px] px-16 pb-24 pt-24">
        <div className="mb-6 text-xs font-semibold uppercase tracking-wide text-stone-500">
          AI-assisted comparison, human-closed always
        </div>
        <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight text-stone-900">
          The clear-headed way to buy insurance.
        </h1>
        <p className="mb-9 max-w-xl text-lg leading-relaxed text-stone-600">
          AI-assisted comparison across term, health, and investment-linked plans — backed by licensed
          advisors for the moments that matter.
        </p>
        <div className="flex items-center gap-7">
          <Link
            href="/advisor"
            className="rounded-lg bg-brand-600 px-7 py-4 text-[15px] font-semibold text-white hover:bg-brand-700"
          >
            Get matched
          </Link>
          <a href="#business" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-stone-900 hover:text-brand-600">
            I&apos;m insuring a business <span>&#8594;</span>
          </a>
        </div>
      </section>

      <section className="mx-16 mb-24 grid grid-cols-1 gap-10 rounded-2xl border border-stone-200 bg-white p-11 shadow-[0_1px_2px_rgba(60,50,30,0.04)] sm:grid-cols-3">
        <div>
          <div className="mb-1.5 text-[15px] font-semibold text-stone-900">Every sale closed by a human</div>
          <div className="text-sm leading-relaxed text-stone-600">
            The AI only handles comparison and research — a licensed advisor completes every purchase, as
            IRDAI requires.
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[15px] font-semibold text-stone-900">Every major insurer, one place</div>
          <div className="text-sm leading-relaxed text-stone-600">
            Compare term, health, and investment-linked plans side by side instead of chasing separate
            quotes.
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[15px] font-semibold text-stone-900">You set the pace</div>
          <div className="text-sm leading-relaxed text-stone-600">
            No outbound calls until you ask for one. Chat with the AI advisor for as long as you need first.
          </div>
        </div>
      </section>

      <section id="personal" className="scroll-mt-20 px-16 pb-6">
        <h2 className="mb-2 text-[28px] font-semibold tracking-tight text-stone-900">For you</h2>
        <p className="mb-7 text-[15px] text-stone-600">Personal cover, compared instantly.</p>
        <div className="grid gap-5 sm:grid-cols-3">
          {PERSONAL_PRODUCTS.map((p) => (
            <div
              key={p.key}
              className="rounded-xl border border-stone-200 bg-white p-7 shadow-[0_1px_2px_rgba(60,50,30,0.04)]"
            >
              <div className="mb-2.5 text-base font-semibold text-stone-900">{p.title}</div>
              <p className="mb-4 text-sm leading-relaxed text-stone-600">{p.blurb}</p>
              <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                {p.cta} <span>&#8594;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="business" className="scroll-mt-20 px-16 pb-24 pt-20">
        <h2 className="mb-2 text-[28px] font-semibold tracking-tight text-stone-900">For your business</h2>
        <p className="mb-7 text-[15px] text-stone-600">
          Tell us the details once — a specialist runs it as an RFQ across our insurer panel.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {BUSINESS_PRODUCTS.map((p) => (
            <div
              key={p.key}
              className="rounded-xl border border-stone-200 bg-white p-7 shadow-[0_1px_2px_rgba(60,50,30,0.04)]"
            >
              <div className="mb-2.5 text-base font-semibold text-stone-900">{p.title}</div>
              <p className="mb-4 text-sm leading-relaxed text-stone-600">{p.blurb}</p>
              <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                {p.cta} <span>&#8594;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 px-16 py-14">
        <div className="mb-9 flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <div className="mb-2.5 text-lg font-bold text-stone-900">Matchonn</div>
            <div className="text-sm leading-relaxed text-stone-600">
              AI-assisted insurance comparison, closed by licensed advisors — for individuals and businesses
              across India.
            </div>
          </div>
          <div className="flex gap-16">
            <div>
              <div className="mb-3 text-[13px] font-semibold text-stone-900">For you</div>
              <div className="flex flex-col gap-2 text-sm text-stone-600">
                <Link href="/advisor?product=term" className="hover:text-brand-600">
                  Term Life
                </Link>
                <Link href="/advisor?product=health" className="hover:text-brand-600">
                  Health
                </Link>
                <Link href="/invest" className="hover:text-brand-600">
                  Investment-Linked
                </Link>
              </div>
            </div>
            <div>
              <div className="mb-3 text-[13px] font-semibold text-stone-900">For business</div>
              <div className="flex flex-col gap-2 text-sm text-stone-600">
                <Link href="/business" className="hover:text-brand-600">
                  Group Medical
                </Link>
                <Link href="/marine-fire" className="hover:text-brand-600">
                  Fire &amp; Marine
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-200 pt-5 text-xs leading-relaxed text-stone-500">
          Matchonn is a licensed insurance distribution business (corporate agency / POSP network) in India.
          Premiums and projected values shown are indicative estimates for comparison only, not a final
          quote — actual premium depends on medical underwriting and insurer terms. Insurance is the subject
          matter of solicitation. ULIPs (investment-linked plans) are different from traditional insurance
          products and are subject to market risk; projected values are illustrative, not guaranteed, and
          depend on fund performance.
        </div>
      </footer>
    </main>
  );
}
