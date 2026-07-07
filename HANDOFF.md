# HANDOFF.md

## Current Status

This repository is now the private applied version of the AI Growth Advisor foundation for **IC Systems Growth Intelligence**.

The app is a Vercel-ready Next.js/Tailwind dashboard for safe real-business experimentation around market and competitor intelligence. It currently remains local/demo-first: no real APIs, no database, no auth, no scraping, no n8n, no MCP, and no LLM calls.

First private target use case: **solar panel competitor intelligence**.

## Implemented Foundation

- **Multi-view dashboard** (`components/AppShell.tsx`) with sidebar/mobile navigation across Overview, Website Audit, Reviews, ROI Forecast, and Proposal Builder.
- **Company/context input + demo scenarios** (`components/CompanyForm.tsx`) with local form state and preset examples inherited from the public AI Growth Advisor version.
- **Notes-based deterministic signal engine** (`lib/signals.ts`) that keyword-matches notes and re-ranks analysis output without any LLM/API call.
- **Mock/local analysis generation** (`lib/mockAnalysis.ts`, `lib/industryData.ts`, `lib/report.ts`) using deterministic benchmark data.
- **Demo Website Audit** (`components/views/WebsiteAuditView.tsx`, `lib/websiteAudit.ts`) using mock conversion/trust/funnel data. No live crawling.
- **Demo Reviews intelligence** (`components/views/ReviewsView.tsx`, `lib/reviewIntelligence.ts`) using mock ratings, themes, sentiment, response rows, and review samples. No Google Reviews API.
- **ROI Forecast** (`components/views/RoiForecastView.tsx`) with deterministic calculations and charts.
- **Proposal Builder** (`components/views/ProposalBuilderView.tsx`) with configurable PDF settings and a cosmetic preview pane.
- **Client-side PDF export** (`lib/proposalPdf.ts`) using dynamically imported `jspdf` + `jspdf-autotable`.
- **Mobile Safari hotfixes**: 16px mobile form controls, `min-w-0` fixes around tables/rails, viewport export, horizontal overflow protection, and mobile-safe view tabs.
- **Private docs/env setup**: `.env.example` and `docs/ROADMAP.md`.
- **IC Systems company profile/config** (`lib/companyProfiles.ts`, `docs/IC_SYSTEMS_PROFILE.md`) with verified facts, assumptions, validation questions, and solar competitor seed list.
- **IC Solar pilot roadmap** (`docs/IC_SOLAR_PILOT_ROADMAP.md`) for the first private solar competitor intelligence workflow.

## Private Project Status

- This repo is a private applied lab based on the AI Growth Advisor foundation.
- IC Systems / IC Solar is the first real pilot.
- The architecture should remain reusable for any company, not only IC Systems.
- IC Systems-specific data must live in profiles, config, and docs (`lib/companyProfiles.ts`, `docs/`), not hardcoded throughout the core engine.
- Real API integrations are future tasks.

## Private Project Purpose

Use the AI Growth Advisor foundation to run real market and competitor intelligence experiments for IC Systems while keeping the public portfolio version separate.

Future target workflow:

1. Enter IC Systems business context.
2. Enter target service/market, e.g. solar panels.
3. Find or input around 10 competitors.
4. Analyze competitor websites, offers, lead capture, reviews, and content.
5. Identify market gaps and opportunities.
6. Generate a management-ready report.
7. Later connect real APIs, MCP/docs, and n8n workflows.

## Current Data Mode

Everything is still local/mock/manual input by design.

- Website Audit and Reviews are mock/demo intelligence, not real public-data integrations.
- Competitor intelligence is currently a profile/config/docs pilot, not a real data-ingestion workflow.
- Proposal/report PDF export is implemented client-side and should not be listed as future.
- `.env.local` is gitignored via `.env*.local`; keep secrets out of git.

## Important Constraints

Do not add these unless explicitly requested:

- Real API calls
- Scraping/crawling
- Database or persistence
- Auth/accounts
- Payments
- CRM export
- Email sending
- n8n workflow calls
- MCP/docs connection
- LLM calls

Keep changes small and scoped. Prefer existing components/styles: `Panel`, `cardStyles`, `ScoreRing`, `PreviewSkeleton`, `buttonStyles`, and Tailwind tokens in `tailwind.config.ts`.

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
2. **Solar competitor intelligence workflow**: IC Systems context, target service/market, competitor list, gap analysis, management report.
3. **MCP/docs knowledge layer**: enrich recommendations with curated internal/product/market knowledge.
4. **n8n workflow integration**: generate or export automation workflow blueprints.
5. **Real public data integrations later**: competitor website crawling, Google Reviews/Maps, search/social/content scans.

## Development Notes

- Read this file before major changes.
- Run `npm run build` or `npm.cmd run build` before handing off.
- If dependencies changed remotely, run `npm install` after pulling.
- Keep `HANDOFF.md` accurate after feature work; do not claim future features are implemented until code exists.
