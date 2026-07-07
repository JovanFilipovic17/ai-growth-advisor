# IC Systems Growth Intelligence

Private applied version of the AI Growth Advisor foundation for IC Systems.

This app is a local, Vercel-ready Next.js/Tailwind dashboard for running controlled market and competitor intelligence experiments before adding real integrations.

The first private target use case is **solar panel competitor intelligence**.

## Purpose

IC Systems Growth Intelligence helps turn business context, target services/markets, competitor inputs, and notes into a structured management-ready intelligence report.

The current version still uses deterministic local/mock analysis logic. It does not call real APIs, scrape websites, use a database, require auth, connect to n8n, use MCP, or call LLMs.

## Current Capabilities

- Multi-view dashboard based on the AI Growth Advisor cockpit
- Demo scenario/company input flow
- Notes-based deterministic signal engine
- Mock Website Audit view
- Mock Reviews / reputation intelligence view
- ROI Forecast view
- Proposal / report builder
- Client-side PDF export with `jspdf` and `jspdf-autotable`
- Mobile Safari layout hotfixes
- Static Vercel-ready build

## First Private Use Case

Solar panel competitor intelligence.

Future workflow:

1. Enter IC Systems business context.
2. Enter target service/market, for example solar panels.
3. Find or input around 10 competitors.
4. Analyze competitor websites, offers, lead capture, reviews, and content.
5. Identify market gaps and opportunities.
6. Generate a management-ready report.
7. Later connect real APIs, MCP/docs, and n8n workflows.

## Current Data Mode

The app is safe for private experimentation because it is currently local/demo-first:

- No real API calls
- No database
- No authentication
- No scraping
- No n8n workflow calls
- No MCP connection
- No LLM calls
- No external data used unless manually typed into the form

## Environment

Copy `.env.example` to `.env.local` when real integrations are introduced.

`.env.local` is intentionally gitignored via `.env*.local`.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

Build:

```bash
npm run build
```

On Windows PowerShell, if `npm.ps1` is blocked by execution policy, use:

```powershell
npm.cmd run build
```

## Development Constraints

Keep this private repo ready for real experiments, but do not add live integrations until explicitly requested.

Allowed now:

- copy/positioning updates
- deterministic local logic
- manually entered competitor/business context
- mock/demo competitor intelligence UI
- local export/report generation

Not yet:

- scraping
- Google Reviews / Maps APIs
- paid market-data APIs
- database
- auth/accounts
- n8n automation calls
- MCP/docs connections
- LLM calls

## Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md).
