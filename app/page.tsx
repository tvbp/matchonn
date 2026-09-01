import Link from "next/link";

const LIVE_PRODUCTS = [
  {
    key: "term",
    title: "Term Life Insurance",
    blurb: "High cover, low premium protection for your family — compare plans from HDFC Life, ICICI Prudential, LIC, and Max Life.",
  },
  {
    key: "health",
    title: "Health Insurance",
    blurb: "Individual and family floater plans from Star Health, HDFC ERGO, Niva Bupa, and Care Health.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-brand-700">Matchonn</span>
          <Link
            href="/advisor"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Get matched
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Insurance advice that starts with an AI, and ends with a licensed human.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Answer a few questions, get an instant comparison across top Indian
          insurers, chat with our AI advisor to understand your options — then
          talk to a licensed advisor to actually buy, on WhatsApp.
        </p>
        <div className="mt-10">
          <Link
            href="/advisor"
            className="inline-block rounded-lg bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-700"
          >
            Start free comparison
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Takes about 2 minutes. No spam calls — you choose when to talk to an advisor.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-center text-2xl font-bold text-slate-900">Compare plans today</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {LIVE_PRODUCTS.map((p) => (
            <Link
              key={p.key}
              href={`/advisor?product=${p.key}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.blurb}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
                Compare now →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/business"
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6 shadow-sm transition hover:border-brand-400 hover:shadow-md sm:flex-row sm:items-center"
        >
          <div>
            <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              For employers
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Group Medical Insurance for your team</h3>
            <p className="mt-1 text-sm text-slate-600">
              Tell us about your company once — a specialist runs it as an RFQ across our insurer panel and
              gets back to you with real quotes.
            </p>
          </div>
          <span className="whitespace-nowrap text-sm font-semibold text-brand-600">Get a quote for your team →</span>
        </Link>

        <Link
          href="/invest"
          className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md sm:flex-row sm:items-center"
        >
          <div>
            <span className="rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white">
              Market-linked · Read the risks first
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Investment-linked plans (ULIPs)</h3>
            <p className="mt-1 text-sm text-slate-600">
              Insurance-cum-investment with a mandatory 5-year lock-in. Not a fixed-return product — we walk
              you through the risks before showing any numbers.
            </p>
          </div>
          <span className="whitespace-nowrap text-sm font-semibold text-amber-700">See how it works →</span>
        </Link>

        <Link
          href="/marine-fire"
          className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6 shadow-sm transition hover:border-brand-400 hover:shadow-md sm:flex-row sm:items-center"
        >
          <div>
            <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              For businesses
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Fire & Marine Insurance</h3>
            <p className="mt-1 text-sm text-slate-600">
              Property, stock, and cargo cover for your business — tell us the details once and a specialist
              runs it as an RFQ across our insurer panel.
            </p>
          </div>
          <span className="whitespace-nowrap text-sm font-semibold text-brand-600">Get a quote →</span>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 rounded-2xl bg-white p-8 shadow-sm sm:grid-cols-3">
          <div>
            <p className="text-3xl font-extrabold text-brand-600">AI + Human</p>
            <p className="mt-1 text-sm text-slate-600">
              AI handles research and comparison; a licensed advisor handles the actual sale and advice, as IRDAI requires.
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-brand-600">Multi-insurer</p>
            <p className="mt-1 text-sm text-slate-600">
              Compare across several leading insurers in one place instead of calling each one separately.
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-brand-600">No pressure</p>
            <p className="mt-1 text-sm text-slate-600">
              Chat with the AI advisor at your pace. You decide if and when to talk to a human.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-slate-500">
          <p>
            Matchonn is a licensed insurance distribution business (corporate
            agency/POSP network) in India. Premiums shown are indicative
            estimates for comparison only, not a final quote — actual premium
            depends on medical underwriting and insurer terms. Insurance is
            the subject matter of solicitation. IRDAI registration details
            will be published here once issued. ULIPs (investment-linked
            plans) are different from traditional insurance products and are
            subject to market risk — projected values shown are illustrative,
            not guaranteed, and depend on fund performance.
          </p>
        </div>
      </footer>
    </main>
  );
}
