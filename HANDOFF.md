# HANDOFF.md

## Current Status

The app is a stable, Vercel-ready Next.js/Tailwind MVP for **AI Growth Advisor**: a premium dark B2B SaaS dashboard that helps AI freelancers/consultants turn company details into a deterministic business audit, automation opportunities, ROI estimates, outreach copy, and a client-ready proposal PDF.

`npm run build` is expected to pass. The app has no env vars, no backend, no auth, no database, no payments, no scraping, no LLM calls, and no external data integrations.

## Implemented

- **Multi-view dashboard** (`components/AppShell.tsx`) with sidebar/mobile navigation across Overview, Website Audit, Reviews, ROI Forecast, and Proposal Builder.
- **Company input + demo scenarios** (`components/CompanyForm.tsx`) with local form state and preset examples for the five target industries.
- **Notes-based deterministic signal engine** (`lib/signals.ts`) that keyword-matches owner notes and re-ranks analysis output without any LLM/API call.
- **Mock/local analysis generation** (`lib/mockAnalysis.ts`, `lib/industryData.ts`, `lib/report.ts`) using deterministic industry benchmark data.
- **Demo Website Audit** (`components/views/WebsiteAuditView.tsx`, `lib/websiteAudit.ts`) using mock conversion/trust/funnel data. No live crawling.
- **Demo Reviews intelligence** (`components/views/ReviewsView.tsx`, `lib/reviewIntelligence.ts`) using mock ratings, themes, sentiment, response rows, and review samples. No Google Reviews API.
- **ROI Forecast** (`components/views/RoiForecastView.tsx`) with deterministic calculations and charts.
- **Proposal Builder** (`components/views/ProposalBuilderView.tsx`) with configurable PDF settings and a cosmetic preview pane.
- **Client-side Proposal PDF export** (`lib/proposalPdf.ts`) using dynamically imported `jspdf` + `jspdf-autotable`. Live buttons exist in `ReportHeader.tsx` and `ProposalBuilderView.tsx`.
- **Mobile Safari hotfixes**: 16px mobile form controls, `min-w-0` fixes around tables/rails, viewport export, horizontal overflow protection, and mobile-safe view tabs.
- **Demo transparency label** near the form: "Demo mode · Local deterministic analysis · No external data used".

## Working Flow

1. User enters company details or selects a demo scenario.
2. `generateAnalysis()` builds one local `AnalysisResult`.
3. All views render from the same result object; switching views does not reset the analysis.
4. Proposal PDF export reads the same `AnalysisResult` plus Proposal Builder settings and downloads a browser-generated PDF.

## Target Industries

1. Dental clinics
2. Restaurants / catering companies
3. Gyms / fitness studios
4. Balkan IPTV / OTT providers
5. Small e-commerce stores

## Important Constraints

Keep the MVP local/demo-first unless explicitly asked otherwise:

- Do not add scraping, Google Reviews API, Google Maps API, auth, database, payments, accounts, CRM export, email sending, or LLM calls by default.
- Website Audit and Reviews are currently mock/demo intelligence, not real public-data integrations.
- Proposal PDF export is implemented client-side; do not list it as a future feature.
- Preserve the serious B2B dashboard feel. Avoid turning the app into a generic AI generator or toy chatbot.
- Keep changes small and scoped. Prefer existing components/styles: `Panel`, `cardStyles`, `ScoreRing`, `PreviewSkeleton`, `buttonStyles`, and Tailwind tokens in `tailwind.config.ts`.

## Placeholder / Roadmap UI

Still intentionally disabled or cosmetic:

- Send by Email
- Export to CRM
- Regenerate with AI
- View Details
- Accept Recommendation / Explore Options
- Edit proposal sections
- Top-nav tabs for Companies, Reports, Automations, Outreach, Settings
- Tone/Length/Currency proposal selects are decorative; PDF section toggles are functional.

## Future Phases

1. **Saved companies/reports**: local persistence first, then database later if needed.
2. **MCP/docs knowledge layer**: enrich recommendations with curated implementation knowledge.
3. **n8n workflow integration**: generate or export automation workflow blueprints.
4. **Real public data integrations later**: Google Reviews, website crawling, competitor/social scans. These should replace or augment current mock Website Audit/Reviews data only when explicitly requested.

## Development Notes

- Read this file before major changes.
- Run `npm run build` or `npm.cmd run build` before handing off.
- If dependencies changed remotely, run `npm install` after pulling.
- Keep `HANDOFF.md` accurate after feature work; do not claim future features are implemented until code exists.
