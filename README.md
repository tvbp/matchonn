# Matchonn

Phase 1 MVP of an AI-assisted, human-closed insurance distribution app for
India: needs-analysis → multi-insurer quote comparison → AI advisor chat →
lead capture → WhatsApp handoff to a licensed advisor.

See the business plan this app implements for the licensing path, commission
economics, and the human → AI-assisted → AI-led roadmap this MVP is Phase 1
of.

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
- **Admin dashboard auth** (`/admin`) is a single shared password
  (`ADMIN_PASSWORD`) behind an httpOnly cookie — enough for one or two people
  reviewing leads early on. Replace with real per-user auth before handing
  dashboard access to a larger team.

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

## Project structure

```
app/
  page.tsx                 Landing page
  advisor/page.tsx          The needs → quotes → chat → lead flow
  admin/page.tsx             Leads dashboard (password-gated)
  api/quotes/route.ts       Computes indicative quotes (lib/quoteEngine.ts)
  api/chat/route.ts          AI advisor chat (lib/chat.ts)
  api/leads/route.ts         Saves a lead (lib/db.ts)
  api/admin/login/route.ts   Admin cookie auth
components/                UI for each step of the advisor flow
lib/
  types.ts                  Shared domain types (NeedsInput, InsurerPlan, Quote, Lead)
  plans.ts                   Mock insurer/plan data — replace with a real feed later
  quoteEngine.ts              Cover recommendation + premium estimate + ranking
  chat.ts                     AI advisor (Claude) + offline fallback
  db.ts                       JSON file-backed lead store
  adminAuth.ts                 Admin cookie token logic
```

## What's intentionally not built yet

- Real insurer/aggregator API integration (quotes are illustrative)
- Payment / policy issuance (out of scope — a licensed advisor closes off-app)
- Group medical, investment-linked (ULIP/endowment), and marine & fire lines
  — the landing page collects waitlist interest for these but the advisor
  flow only covers term life and health, per the Phase 1 product sequencing
- Automated renewal reminders / cross-sell (Phase 2)
- Multi-language advisor conversation (Phase 3)
