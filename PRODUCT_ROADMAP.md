# Fleet Labs Product Roadmap

## Product Direction

Fleet Labs is evolving from a narrow visibility audit into a growth and visibility intelligence dashboard. It should help a business understand how customers discover it across search and AI, where visibility is being lost, and which actions are most likely to improve growth.

## Implemented

- Homepage URL submission and site creation.
- Search visibility checks through SerpAPI.
- Optional AI visibility checks for OpenAI, Anthropic, Gemini, and Perplexity.
- Provider-aware behavior: configured providers run; missing providers are skipped instead of simulated.
- Search-only scoring when no AI provider is configured.
- Per-provider request timeouts and fallback handling.
- Dashboard site detail view with visibility score, search score, AI score, search opportunities, and recommendations.
- First-scan dashboard flow that returns the site immediately and scans after the dashboard loads.
- Shared development mock store so newly created sites can be looked up across API route bundles.
- Responsive navigation and a dedicated pricing page.

## Current Dashboard Slice

The dashboard overview now makes the existing data useful to a business owner:

- Growth-oriented summary cards.
- Visibility trend chart from stored score history.
- Search and AI signal comparison.
- Provider-aware scoring remains available; connection status is deferred until more APIs are enabled.
- Search opportunity language instead of developer-oriented "tracked prompts".
- Prioritized recommendations with clear impact labels.

## Planned Work

### Phase 1: Product Clarity and Existing Data

- [x] Rename confusing dashboard language around tracked prompts.
- [x] Add overview metrics and score trend visualization.
- [ ] Add provider status visibility when additional APIs are enabled.
- [x] Improve recommendation prioritization.
- [x] Add a basic technical audit for titles, descriptions, headings, robots.txt, sitemap, HTTPS, and structured data.

### Phase 2: Real Search Performance

- [ ] Add Google Search Console integration.
- [ ] Import clicks, impressions, CTR, average position, keywords, and landing pages.
- [ ] Show ranking movement and search opportunities over time.

### Phase 3: Website Analytics

- [ ] Add Google Analytics 4 integration.
- [ ] Display visits, unique visitors, pages per visit, average visit duration, engagement/bounce rate, traffic sources, and conversions.
- [ ] Add date-range comparison and conversion funnel views.

### Phase 4: Technical SEO and Content Intelligence

- [ ] Build a crawler for important site pages.
- [ ] Add PageSpeed and mobile checks.
- [ ] Connect technical findings to affected URLs.
- [ ] Generate content opportunities from ranking gaps and competitor visibility.

### Phase 5: Durable SaaS Foundation

- [ ] Replace the in-memory store with a database.
- [ ] Add authentication and per-user site ownership.
- [ ] Add scheduled scans and historical snapshots.
- [ ] Add billing and plan limits.

## Data Boundaries

SerpAPI can provide search-result visibility, but it cannot provide website visits, unique visitors, conversions, bounce rate, or average visit duration. Those metrics require Google Analytics 4 or another analytics provider. Search Console is needed for first-party Google search performance such as clicks, impressions, CTR, and average position.

## UX Vocabulary

Prefer language that answers a business question:

- "Tracked prompts" -> "Search opportunities" or "Visibility checks"
- "AI component" -> "AI visibility"
- "Recommendations" -> "Recommended fixes"
- "Run scan" -> "Refresh insights"
- "Score" -> "Visibility score"

## Notes

The current product should label provider coverage clearly. It must not present simulated or unavailable data as real analytics.
