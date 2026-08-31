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

const COMING_SOON = [
  { key: "group-medical", title: "Group Medical (for employers)" },
  { key: "investment", title: "Investment-linked plans (ULIP / endowment)" },
  { key: "marine-fire", title: "Marine & Fire (commercial)" },
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

        <h3 className="mt-14 text-center text-lg font-semibold text-slate-700">
          Coming soon — join the waitlist
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {COMING_SOON.map((p) => (
            <Link
              key={p.key}
              href={`/advisor?waitlist=${p.key}`}
              className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm font-medium text-slate-600 hover:border-brand-300 hover:text-brand-700"
            >
              {p.title}
            </Link>
          ))}
        </div>
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
            will be published here once issued.
          </p>
        </div>
      </footer>
    </main>
  );
}
