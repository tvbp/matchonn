# Matchonn

Phase 1 MVP of an AI-assisted, human-closed insurance distribution app for
India:
- **Consumer (term life / health):** needs-analysis → multi-insurer quote
  comparison → AI advisor chat → lead capture → WhatsApp handoff to a
  licensed advisor.
- **Group medical (B2B, `/business`):** a company enquiry form → lead capture
  → WhatsApp handoff to a specialist who runs it as an RFQ across the
  insurer panel — no instant quote, since group pricing depends on group
  composition and claims history.
- **Investment-linked plans (`/invest`):** goals → a mandatory risk
  acknowledgement gate → illustrative maturity projections (IRDAI's 4%/8%
  convention) → AI chat (tightly scoped — no fund advice) → lead capture →
  WhatsApp handoff to a licensed advisor for suitability and fund selection.
- **Marine & Fire (B2B, `/marine-fire`):** a company enquiry form (choose
  fire/property or marine/cargo, each with its own fields) → lead capture →
  WhatsApp handoff to a specialist — no instant quote, since commercial
  property/cargo risk is underwriting-heavy and larger sums insured often
  need a physical survey.

See the business plan this app implements for the licensing path, commission
economics, and the human → AI-assisted → AI-led roadmap this MVP is Phase 1
of.

## Design system

"Warm Trust" — a fintech-serious direction chosen from three mocked-up
options (see the design canvas process below), not a color swap on top of
the earlier indigo/coral pass.

- **Colors** (`tailwind.config.ts`): a single sage-green `brand` scale
  (anchored on `#3F5D46`) used for both links and primary CTAs — Warm Trust
  deliberately doesn't split these into two colors the way the earlier,
  rejected pass did. Neutrals are Tailwind's built-in `stone` scale (warm
  gray) instead of `slate` (cool gray), everywhere.
- **Type**: Source Serif 4 for headings (`font-heading`, wired to `h1`-`h4`
  globally in `app/globals.css` — no per-component class needed), Work Sans
  for body text, both loaded via `next/font/google` in `app/layout.tsx`.
- **No icons.** The landing page and cards use plain text + a subtle
  border/shadow, not icon badges — dropped entirely after the first
  (rejected) pass's icon-heavy cards read as generic rather than premium.
- **Shared UI**: `components/Stepper.tsx` (progress steps), `components/
  FlowHeader.tsx` (the back-to-home header every flow page uses),
  `components/HandoffDone.tsx` (WhatsApp/call completion screen) — reused
  across every flow instead of each page rolling its own.
- **Process**: this direction was chosen from a 3-option mockup (Claude
  Design canvas: Minimal/Stripe-like, Warm Trust/Mercury-like, Bold
  Type/Ramp-like) reviewed and picked before any app code changed, rather
  than iterating blind on Tailwind classes — the first design pass on this
  app was done that way and didn't land.

## Why it's built this way

- **AI never closes the sale.** Under current IRDAI rules, only a licensed
  human (POSP/agent) can solicit and sell/advise on a policy. The app's AI
  chat (`lib/chat.ts`) is scoped to needs-analysis and plan comparison, and
  every flow ends with a handoff to a human advisor on WhatsApp
  (`components/AdvisorFlow.tsx`) rather than a checkout.
- **Quotes are illustrative, not live.** There's no insurer/aggregator API
  integration yet — `lib/plans.ts` and `lib/quoteEngine.ts` are a
  config-driven mock rate table clearly labeled as indicative in the UI. Swap
  these two files for a real insurer/aggregator feed (or a POSP-enablement
  platform's API) once that partnership is in place; nothing else in the app
  needs to change since the rest of the app only depends on the `Quote`/
  `InsurerPlan` shape in `lib/types.ts`.
- **Lead storage is a JSON file** (`lib/db.ts`, `data/leads.json`), fine for
  a single-instance pilot. Move to Postgres (or your CRM of choice) once you
  run more than one app instance or need concurrent-write safety — only
  `lib/db.ts` needs to change.
- **Group medical has no instant quote step, on purpose.** Unlike term/health,
  group premiums depend on employee composition and claims history, which
  insurers only quote via an actual RFQ — so `/business`
  (`components/GroupEnquiryForm.tsx`) collects structured requirements
  (headcount, industry, desired cover, current insurer/renewal date) and
  hands straight to a specialist rather than pretending to price it
  instantly.
- **Investment-linked plans get a mandatory risk acknowledgement gate before
  any numbers are shown.** Per the business plan: mis-selling ULIPs is the
  most common reason distributors lose their IRDAI license. `/invest`
  (`components/SuitabilityGate.tsx`) requires four explicit checkboxes
  (market-linked not fixed-return, 5-year lock-in, no guaranteed return,
  charges reduce the invested amount) before `components/InvestmentFlow.tsx`
  will show illustrations, and the acknowledgement is recorded on the lead
  (`suitabilityAcknowledged`) as part of the audit trail. The AI chat's
  system prompt (`lib/chat.ts`) has a stricter rule set for this product:
  never recommend a specific fund or allocation, never imply a return is
  likely, never compare against mutual funds/FDs/stocks (that's investment
  advice, which needs separate SEBI registration, not just an IRDAI one) —
  fund selection and final suitability are pushed to the licensed advisor.
  Illustrations use IRDAI's mandated 4%/8% assumed-return convention, net of
  a simplified charge model (`lib/investmentEngine.ts`) — no NAV volatility,
  no mortality table, clearly labeled as indicative.
- **Marine & fire has no instant quote either, for a different reason than
  group medical.** Commercial property (fire) pricing depends on
  construction, occupancy, and fire safety measures, and cargo (marine)
  pricing depends on transit mode, route, and cargo type — both are
  underwriting-heavy, and larger fire sums insured typically need a
  physical survey before an insurer will quote at all. `/marine-fire`
  (`components/CommercialEnquiryForm.tsx`) lets the customer pick fire or
  marine and shows the relevant fields, then hands straight to a specialist
  like the group medical flow does.
- **Admin dashboard auth** (`/admin`) is a single shared password
  (`ADMIN_PASSWORD`) behind an httpOnly cookie — enough for one or two people
  reviewing leads early on. Replace with real per-user auth before handing
  dashboard access to a larger team.
- **WhatsApp handoff is a plain `wa.me` click-to-chat link, not a WhatsApp
  Business API integration.** No BSP (Gupshup/Interakt/Wati/AiSensy) or Meta
  Cloud API account is needed for this — a human advisor just replies from
  their own WhatsApp Business app, which is the right amount of automation
  for the human-in-the-loop Phase 1. A `tel:` call fallback and the plain
  phone number are also shown in case `wa.me` is blocked (some in-app
  browsers do this). Revisit this only when Phase 2/3 needs automated/AI-sent
  messages or template messages outside the 24-hour customer-initiated
  window — that's when a real WhatsApp Business API provider earns its cost.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in values, see below
npm run dev
```

Open http://localhost:3000. The advisor flow works immediately with mock
quotes and a rule-based AI advisor fallback; the leads dashboard is at
`/admin`.

### Environment variables (`.env.local`)

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | No | Enables the real AI advisor chat (Claude). Without it, the advisor falls back to a small set of deterministic answers — the rest of the app is unaffected. |
| `ANTHROPIC_MODEL` | No | Overrides the advisor's model (default `claude-opus-5`). |
| `ADMIN_PASSWORD` | Yes, to use `/admin` | Password for the leads dashboard. |
| `NEXT_PUBLIC_ADVISOR_WHATSAPP_NUMBER` | Yes, for real handoffs | WhatsApp number (country code, no `+`) the "Continue on WhatsApp" button links to. |

## Deploying

Leads are stored in a JSON file on disk (`lib/db.ts` → `data/leads.json`),
which needs a host with a **persistent, long-running filesystem** — not a
pure serverless platform like default Vercel, whose functions get an
ephemeral filesystem per invocation and would silently lose leads. This app
is set up for **Railway** (`railway.json` pins the Nixpacks builder and
start command):

1. railway.app → sign in with GitHub → New Project → Deploy from GitHub repo
   → select this repo and branch.
2. Service Settings → Volumes → add a volume mounted at `/app/data` (this is
   where `process.cwd()/data` resolves inside the container). Without this
   step leads still work, but don't survive a redeploy/restart.
3. Service Variables → set `ADMIN_PASSWORD` and
   `NEXT_PUBLIC_ADVISOR_WHATSAPP_NUMBER` at minimum (see the table above for
   the rest). Deploy.
4. Sanity check: submit one test lead, confirm it shows in `/admin`, restart
   the service from the Railway dashboard, and confirm the lead is *still
   there* — that's the real proof the volume is persisting.

A custom domain can be attached later under Settings → Networking with no
code changes; Railway gives a working `*.up.railway.app` URL immediately.

If you outgrow single-instance file storage (multiple app instances, need
for concurrent-write safety), swap `lib/db.ts` for a real database — nothing
else in the app depends on how leads are stored.

## Project structure

```
app/
  page.tsx                 Landing page
  advisor/page.tsx          The needs → quotes → chat → lead flow (consumer)
  business/page.tsx          The group medical enquiry flow (B2B)
  invest/page.tsx             The investment-linked (ULIP) flow
  marine-fire/page.tsx        The fire/property + marine cargo enquiry flow (B2B)
  admin/page.tsx             Leads dashboard (password-gated)
  api/quotes/route.ts       Computes indicative quotes (lib/quoteEngine.ts)
  api/chat/route.ts          AI advisor chat (lib/chat.ts)
  api/leads/route.ts         Saves a lead, any flow (lib/db.ts)
  api/admin/login/route.ts   Admin cookie auth
components/                UI for each flow (advisor, group enquiry, invest,
                             commercial enquiry, admin); HandoffDone.tsx is the
                             shared WhatsApp/call step, ChatWidget.tsx is the
                             shared AI chat UI
lib/
  types.ts                  Shared domain types (NeedsInput, InsurerPlan, Quote,
                              GroupMedicalEnquiry, InvestmentNeedsInput/Plan/
                              Illustration, CommercialEnquiry/Fire/Marine, Lead)
  plans.ts                   Mock term/health insurer data — replace with a
                              real feed later
  quoteEngine.ts              Term/health cover recommendation + premium + ranking
  investmentPlans.ts           Mock ULIP plan/charge data
  investmentEngine.ts          4%/8% illustration calculation (see caveats inline)
  chat.ts                     AI advisor (Claude) + offline fallback, with
                               per-product rule sets (term/health/investment)
  whatsapp.ts                  Builds the wa.me handoff link
  db.ts                       JSON file-backed lead store
  adminAuth.ts                 Admin cookie token logic
```

## What's intentionally not built yet

- Real insurer/aggregator API integration (quotes/illustrations are
  illustrative, not live rates)
- Payment / policy issuance (out of scope — a licensed advisor closes off-app)
- Automated renewal reminders / cross-sell (Phase 2)
- Multi-language advisor conversation (Phase 3)

All five product lines from the Phase 1 sequencing (term, health, group
medical, investment-linked, marine & fire) now have a flow — the remaining
gaps above are cross-cutting infrastructure (Phase 2/3), not missing
product lines.
