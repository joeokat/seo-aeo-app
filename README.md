# Signal — AEO/GEO visibility SaaS (Next.js starter)

A Next.js 14 (App Router) + Tailwind starter for the AEO tool: checks how a
site ranks in search engines and AI assistants, scores it, and suggests fixes.

This is a rebuild of the same app previously built in Nuxt/Vue — same
features, same data model, same scan logic — after dependency issues on
Windows made the Nuxt version not worth chasing further.

## What's real vs mocked

- **Pages, components, layout, data model, API routes** — real.
- **The scan pipeline (`/api/scan`) is real code, not a stub.** It calls
  Google search (via SerpAPI) and all 4 AI engines (OpenAI, Anthropic,
  Gemini, Perplexity) with the site's tracked prompts, detects mentions,
  and recomputes the visibility score. **If a key is missing or a call
  fails, that one check falls back to a clearly-labeled simulated result**
  instead of crashing the scan — so it runs today with zero keys, and each
  provider goes live independently as you add its key.
- **Storage is still in-memory** (`lib/mockData.ts`) — a scan's results
  update the object in memory but reset when the server restarts. This is
  the next real gap to close (see below).

## Run it

```
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000. Go to a site's dashboard page and click
**"Run scan now"** — it'll tell you whether the result was live or simulated.

## API keys (all optional — blank ones simulate)

Fill in whichever you have in `.env.local`:

```
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=
PERPLEXITY_API_KEY=
SERP_API_KEY=       # from serpapi.com, for Google ranking checks
```

## A note on dependency versions

Every version in `package.json` is pinned exactly (not `^` ranges) and
`package-lock.json` is included, so `npm install` on your machine resolves
the identical dependency tree that was built and tested here. If you ever
hit a build error after adding a new package, check whether it bumped an
existing pin before troubleshooting further — that's what broke the
previous version of this app.

`npm audit` currently flags some advisories against a broad Next.js version
range and a `postcss` sub-dependency used only at build time for font
optimization — none affect this app's own runtime behavior, but worth
addressing before a public production deploy (`npm audit` for details).

## Wiring up the rest

1. **Database**: swap `mockData.ts` for real queries (Postgres +
   Prisma/Drizzle is a good default) using the entities discussed: `users`,
   `sites`, `tracked_prompts`, `search_checks`, `ai_checks`, `site_audits`,
   `visibility_scores`, `recommendations`, `scan_jobs`. This is what makes
   scans persist and the score trend actually meaningful over time.
2. **Scan job**: a scheduled job (Vercel Cron, or a queue like BullMQ) that
   calls the same logic in `/api/scan` per site on the interval its plan
   allows (free = once, paid = weekly), instead of only on manual click.
3. **Billing**: Stripe Checkout + a webhook to set `users.plan` and
   `plan_expires_at` — matches the $10/mo, $49.9/6mo, $99.9/yr tiers already
   reflected on the landing page.
4. **Auth**: something like Auth.js or Clerk in front of the dashboard
   routes (currently unauthenticated).

## Structure

```
app/
  page.tsx                    # landing page
  dashboard/page.tsx          # site list
  dashboard/[id]/page.tsx     # site detail — score, prompts, fixes, scan button
  api/
    sites/route.ts            # GET list
    sites/[id]/route.ts       # GET detail
    scan/route.ts             # POST — run a real (or simulated) scan
components/
  SignalMeter.tsx
  PromptTable.tsx
  RecommendationList.tsx
lib/
  mockData.ts                 # in-memory store — replace with real DB
  searchCheck.ts               # Google ranking via SerpAPI
  aiVisibility.ts               # orchestrates the 4 AI provider checks
  scoring.ts                     # computes the 0-100 visibility score
  providers/                      # one file per AI engine
```
