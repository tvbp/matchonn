import Link from "next/link";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12l1.8 1.8L14.8 10" />
    </svg>
  );
}

function HeartPulseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.1 19.6l-7.2-7.1a4.4 4.4 0 010-6.3 4.5 4.5 0 016.4 0l.8.8.8-.8a4.5 4.5 0 016.4 0 4.4 4.4 0 010 6.3l-7.2 7.1z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 12h2.5l1.5-2.5 2 4 1.5-2.5h3" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 6l3-2 3 2" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V5a1 1 0 011-1h6a1 1 0 011 1v16M4 21h16M14 21v-8a1 1 0 011-1h4a1 1 0 011 1v8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h1M7.5 11h1M7.5 14.5h1M17.5 14.5h1M17.5 17.5h1" />
    </svg>
  );
}

function AnchorFlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13M9 21h6M12 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13a7 7 0 0014 0M5 13H3M21 13h-2" />
    </svg>
  );
}

const PERSONAL_PRODUCTS = [
  {
    key: "term",
    href: "/advisor?product=term",
    icon: ShieldIcon,
    title: "Term Life",
    blurb: "Big cover for a small premium. Compare real numbers from HDFC Life, ICICI Prudential, LIC, and Max Life.",
    cta: "Compare term plans",
  },
  {
    key: "health",
    href: "/advisor?product=health",
    icon: HeartPulseIcon,
    title: "Health Insurance",
    blurb: "One hospital bill shouldn't undo years of saving. Individual and family plans from four leading insurers.",
    cta: "Compare health plans",
  },
  {
    key: "invest",
    href: "/invest",
    icon: ChartIcon,
    title: "Investment-Linked",
    blurb: "Insurance and market-linked growth in one plan. We walk you through the risks before the numbers.",
    cta: "See how it works",
    badge: "Market-linked",
  },
];

const BUSINESS_PRODUCTS = [
  {
    key: "group-medical",
    href: "/business",
    icon: BuildingIcon,
    title: "Group Medical",
    blurb: "Give your team real health cover without the back-and-forth. One form, quotes from our full insurer panel.",
    cta: "Get a quote for your team",
  },
  {
    key: "marine-fire",
    href: "/marine-fire",
    icon: AnchorFlameIcon,
    title: "Fire & Marine",
    blurb: "Protect your property, stock, and cargo. A specialist scopes it properly — surveys included where needed.",
    cta: "Get a quote for your business",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-heading text-xl font-extrabold tracking-tight text-slate-900">
            Matchonn
          </span>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
            <a href="#personal" className="hover:text-slate-900">
              For you
            </a>
            <a href="#business" className="hover:text-slate-900">
              For your business
            </a>
          </nav>
          <Link
            href="/advisor"
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-accent-500/30 hover:bg-accent-600"
          >
            Get matched
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(79,70,229,0.10), transparent), radial-gradient(40% 35% at 85% 15%, rgba(250,90,46,0.08), transparent)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
            AI-assisted comparison · Human-closed, always
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
            Insurance, sorted — without the sales pressure.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Compare real plans from India&apos;s top insurers in minutes, get straight answers from an AI
            advisor, and talk to a licensed expert only when you&apos;re ready — on WhatsApp, on your terms.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/advisor"
              className="inline-block rounded-lg bg-accent-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
            >
              Find my plan →
            </Link>
            <a
              href="#business"
              className="inline-block rounded-lg border border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 hover:border-slate-400"
            >
              I&apos;m insuring a business
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Takes about 2 minutes. Zero spam calls — you decide when to talk to an advisor.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-bold">Real advisors, not a bot pretending to be one</p>
            <p className="mt-2 text-sm text-slate-300">
              Every purchase is closed by a licensed advisor, as IRDAI requires — the AI only handles research
              and comparison.
            </p>
          </div>
          <div>
            <p className="font-heading text-lg font-bold">One place, every insurer</p>
            <p className="mt-2 text-sm text-slate-300">
              Compare across leading insurers side by side, instead of chasing separate quotes from each one.
            </p>
          </div>
          <div>
            <p className="font-heading text-lg font-bold">You set the pace</p>
            <p className="mt-2 text-sm text-slate-300">
              No outbound calls until you ask for one. Chat with the AI advisor for as long as you need first.
            </p>
          </div>
        </div>
      </section>

      <section id="personal" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">For you</h2>
          <p className="mt-2 text-slate-600">Personal cover, compared instantly.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {PERSONAL_PRODUCTS.map((p) => (
            <Link
              key={p.key}
              href={p.href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <p.icon />
                </span>
                {p.badge && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                    {p.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{p.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                {p.cta}
                <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="business" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900">For your business</h2>
            <p className="mt-2 text-slate-600">
              Tell us the details once — a specialist runs it as an RFQ across our insurer panel.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {BUSINESS_PRODUCTS.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                  <p.icon />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{p.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  {p.cta}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div>
              <span className="font-heading text-lg font-extrabold text-slate-900">Matchonn</span>
              <p className="mt-2 max-w-xs text-sm text-slate-600">
                AI-assisted insurance comparison, closed by licensed advisors — for individuals and
                businesses across India.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm sm:flex sm:gap-12">
              <div>
                <p className="font-semibold text-slate-900">For you</p>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li>
                    <Link href="/advisor?product=term" className="hover:text-brand-600">
                      Term Life
                    </Link>
                  </li>
                  <li>
                    <Link href="/advisor?product=health" className="hover:text-brand-600">
                      Health
                    </Link>
                  </li>
                  <li>
                    <Link href="/invest" className="hover:text-brand-600">
                      Investment-Linked
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900">For business</p>
                <ul className="mt-3 space-y-2 text-slate-600">
                  <li>
                    <Link href="/business" className="hover:text-brand-600">
                      Group Medical
                    </Link>
                  </li>
                  <li>
                    <Link href="/marine-fire" className="hover:text-brand-600">
                      Fire &amp; Marine
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500">
            Matchonn is a licensed insurance distribution business (corporate agency/POSP network) in India.
            Premiums and projections shown are indicative estimates for comparison only, not a final quote —
            actual premium depends on medical underwriting and insurer terms. Insurance is the subject matter
            of solicitation. IRDAI registration details will be published here once issued. ULIPs
            (investment-linked plans) are different from traditional insurance products and are subject to
            market risk — projected values shown are illustrative, not guaranteed, and depend on fund
            performance.
          </div>
        </div>
      </footer>
    </main>
  );
}
