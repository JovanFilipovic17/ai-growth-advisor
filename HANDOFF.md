# HANDOFF.md

## Current Status (Phase 4B + mobile hotfix complete)

**MVP is implemented and stable** as a premium dark B2B SaaS dashboard ("AI Growth Advisor" cockpit). `npm run build` passes (typecheck + ESLint clean), no env vars, no external services — deploys to Vercel with zero config.

**Mobile hotfix (iPhone Safari crop/zoom):** root causes were (1) form inputs/selects at 14px, which triggers iOS Safari's auto-zoom-on-focus — fixed via `text-base sm:text-sm` (16px on mobile, unchanged 14px from `sm:` up) in `CompanyForm.tsx` and `ProposalBuilderView.tsx`; (2) missing `min-w-0` on grid/flex items wrapping tables and right rails, which lets a table's `min-w-[...]` leak into the ancestor's intrinsic size on WebKit — added to `Panel.tsx`, `OpportunitiesTable.tsx`, `BottlenecksSection.tsx`, and every view's right-rail/table-section wrapper. Also: explicit `viewport` export in `app/layout.tsx`, `overflow-x: hidden` added to `html` (was only on `body`) in `globals.css`, TopNav's non-essential tabs (Companies/Reports/Automations/Outreach/Settings) now `hidden sm:block`, and the Website Audit funnel row's fixed label width shrinks on mobile (`w-20 sm:w-40`). Desktop is pixel-identical (all changes are additive `min-w-0` or `sm:`-gated). Verified at 390px: all 5 views + tab switching, no page-level horizontal scroll, inputs render at 16px.

**Signal engine (`lib/signals.ts`, deterministic — no LLM):** the optional notes field now drives the analysis. `detectSignals(notes, industry)` keyword-matches 11 business signals (missed calls, slow follow-up, no CRM, review gap, no-shows, booking friction, manual reporting, churn risk, weak website conversion, inactive social, admin overload), each with per-industry weights (1–3). `applySignals()` re-ranks problems/opportunities via index-aligned `OPPORTUNITY_TAGS`, upgrades priority when boost ≥ 3, and marks paired problems as owner-confirmed. Downstream effects: recoverable hours +2/signal (cap 8) → savings/forecast/break-even shift; AI Opportunity Score +min(8, total weight); quick-win/complexity recompute on the new ranking; revenue leak re-sums the new top-4 bottlenecks; executive summary, AI insight, and outreach copy name the detected signals; Website Audit hardens Lead Capture when conversion/booking is flagged; Reviews bumps reputation risk when a review gap is flagged; Proposal Builder section descriptions reference the signals. Overview shows a "Detected Signals" panel (`components/report/DetectedSignals.tsx`, max 6 chips with relevance + matched phrase). `ReportData.quickWinPair` carries the top-two quick-win names for reuse across views. With empty notes everything behaves exactly as before.

**Example notes for testing (dental works well for all three):**
1. "We keep missing calls during busy hours and leads wait days for a reply." → missed calls + slow follow-up detected; AI receptionist jumps to #1; score 82 → 89; savings €1,575 → €1,715.
2. "We get bad reviews about waiting times and nobody replies to our reviews." → review gap; review request flow leads; Reviews view risk Medium → High with flagged insight.
3. "Lots of no-shows lately and patients say booking online is confusing." → no-shows + booking friction; appointment reminders lead; Website Audit lead capture shows "Major Gap — flagged in notes".

**Implemented views** (sidebar-navigable, `activeView` state in `components/AppShell.tsx`):
- **Overview** (`components/report/`) — KPI cards, company snapshot, bottlenecks, opportunities table, ROI chart, outreach messages.
- **Website Audit** (`components/views/WebsiteAuditView.tsx` + `lib/websiteAudit.ts`) — conversion score, trust/lead/mobile ratings, mock site preview, funnel, key findings, improvement ideas.
- **Reviews** (`components/views/ReviewsView.tsx` + `lib/reviewIntelligence.ts`) — rating/sentiment KPIs, sentiment breakdown, themes, response table, sample reviews.
- **ROI Forecast** (`components/views/RoiForecastView.tsx`) — leakage/recovery/cost/break-even stats, larger chart, scenario selector, cost assumptions, value breakdown table.
- **Proposal Builder** (`components/views/ProposalBuilderView.tsx`) — section cards with status badges, settings panel, page preview.

**Working flow:** user enters company info in `CompanyForm` → `generateAnalysis()` (`lib/mockAnalysis.ts`) builds one `AnalysisResult` fully client-side → every view reads from that same object; switching views never resets it. With no analysis yet, the input form shows regardless of which sidebar item is selected. Currency is € throughout (`lib/format.ts`).

**Still mock/local (by design):** Website Audit, Reviews, ROI Forecast, and Proposal preview are all deterministic template data + arithmetic keyed by the 5 industries (`lib/industryData.ts`, `lib/report.ts`, `lib/websiteAudit.ts`, `lib/reviewIntelligence.ts`). No scraping, no Google Reviews API, no APIs/DB/auth/payments/LLM calls.

**Placeholder features** (visually disabled with "Soon" badge / muted style via `components/PlaceholderButton.tsx` + `buttonStyles.ts`, not broken buttons): Generate Proposal PDF, Download PDF, Send by Email, Export to CRM, Regenerate with AI, View Details, Accept Recommendation, Explore Options, Edit (proposal sections), and top-nav tabs Companies/Reports/Automations/Settings.

**Shared building blocks:** `components/Panel.tsx` (section wrapper), `components/cardStyles.ts` (KPI card classes), `components/ScoreRing.tsx`, `components/PreviewSkeleton.tsx`, `components/buttonStyles.ts` (`PRIMARY_BUTTON`/`GHOST_BUTTON`/`PLACEHOLDER_BUTTON`/`SOON_BADGE`). Design tokens in `tailwind.config.ts` (`surface-panel`/`surface-raised`, `edge`, `shadow-panel`/`shadow-btn`) and the navy gradient background in `app/globals.css`. Reuse these for any new UI.

**Next recommended phases** (not started, do not build unless asked):
1. Real proposal/PDF export
2. Saved companies/reports
3. MCP/docs knowledge layer
4. n8n workflow integration
5. Real public data integrations (Google Reviews, site crawling) later

## Project Name

Business Intelligence Agent / AI Growth Advisor

## Core Idea

This is a Vercel-ready web app that helps AI freelancers, consultants, and small agencies identify real business problems inside a company and turn them into AI automation opportunities, ROI estimates, and personalized outreach/proposal materials.

The user enters a company name, website URL, industry, or notes. The app returns a structured business diagnosis with detected problems, recommended AI automations, implementation priority, estimated ROI, suggested pricing, and outreach copy.

This is both:

1. A portfolio project demonstrating agentic AI/business reasoning.
2. A practical internal tool for finding and qualifying real AI clients.

## Positioning

Do not position this as a generic AI generator.

Position it as:

“An AI business consultant that researches a company, identifies operational bottlenecks, estimates automation opportunities, and prepares a personalized implementation strategy.”

## MVP Goal

Build a clean, impressive Vercel MVP.

The first version should work with demo/mock data and deterministic analysis logic. Do not overbuild real scraping, auth, database, payments, or complex APIs yet.

The MVP flow:

1. User enters company details:

   * Company name
   * Website URL
   * Industry
   * Optional notes

2. App generates:

   * Business summary
   * Likely operational problems
   * 5–10 AI automation opportunities
   * Priority and difficulty for each opportunity
   * Estimated monthly hours saved
   * Estimated business value
   * Suggested implementation price
   * Suggested monthly retainer
   * Cold email
   * LinkedIn DM
   * Follow-up message
   * Proposal/report preview

## First Target Industries

Use these as demo scenarios:

1. Dental clinics
2. Restaurants / catering companies
3. Gyms / fitness studios
4. Balkan IPTV / OTT providers
5. Small e-commerce stores

## Suggested Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui if available
* Vercel deployment
* Mock/demo data first
* Optional LLM/API integration later

## Important Product Principle

Make the first version feel like a serious B2B tool, not a toy chatbot.

The UI should look like a modern SaaS dashboard:

* Clean landing section
* Input form
* Analysis cards
* Opportunity scoring
* ROI block
* Outreach/proposal section
* Copy/export buttons if easy

## Avoid for MVP

Do not build these yet unless explicitly requested:

* Real web scraping
* Google Maps API
* Google Reviews API
* Authentication
* Payments
* User accounts
* Database
* PDF export
* n8n export
* Complex backend
* Overly large architecture

## Future Versions

V1.1:

* Google Reviews analysis

V1.2:

* Competitor analysis

V1.3:

* Social media scan

V1.4:

* PDF export

V1.5:

* n8n workflow recommendation/export

V2:

* CRM for saved leads, scan history, outreach status, and follow-up reminders

## Development Instructions for Claude/Fable

Before every major change:

1. Read this HANDOFF.md.
2. Keep the implementation small and focused.
3. Prefer clean working code over broad architecture.
4. Do not invent unnecessary features.
5. Preserve the core MVP flow.
6. Explain what files were changed and why.
7. If a request is too broad, implement the smallest useful slice first.

## Current Priority

Create the first working Vercel MVP with:

* One landing page
* Company input form
* Demo analysis generator
* Opportunity cards
* ROI section
* Outreach/proposal section
* Clean responsive design
