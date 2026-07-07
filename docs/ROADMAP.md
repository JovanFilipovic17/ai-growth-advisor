# IC Systems Private Roadmap

This roadmap is for the private IC Systems Growth Intelligence repo. Keep the public portfolio version separate.

## Current Position

The app is still local/demo-first. It uses the AI Growth Advisor foundation for safe private experimentation, with no real APIs, scraping, database, auth, MCP, n8n, or LLM calls.

## Target Use Case 1: Solar Panel Competitor Intelligence

Goal: help IC Systems understand solar panel competitors, market gaps, offer positioning, lead-capture quality, review/reputation signals, and practical growth opportunities.

Future workflow:

1. Enter IC Systems business context.
2. Enter target service/market, e.g. solar panels.
3. Find or input around 10 competitors.
4. Analyze competitor websites/offers/lead capture/reviews/content.
5. Identify gaps and opportunities.
6. Generate a management-ready report.
7. Later connect real APIs, MCP/docs, and n8n workflows.

## Suggested Phases

### Phase 1: Private Positioning And Manual Inputs

- Reposition UI around IC Systems and market intelligence.
- Add manual target market/service context.
- Add manual competitor list input.
- Keep all analysis deterministic/local.

### Phase 2: Competitor Intelligence Views

- Add competitor comparison table.
- Add mock/manual website and offer assessment.
- Add lead-capture and content gap scoring.
- Add management-ready report framing.

### Phase 3: Saved Experiments

- Save companies, target markets, competitor sets, and generated reports.
- Start with local storage or file export before introducing a database.

### Phase 4: Knowledge Layer

- Connect curated IC Systems docs, product/service notes, market assumptions, and internal playbooks.
- Consider MCP/docs only after the manual workflow is useful.

### Phase 5: Real Integrations

- Competitor website crawling
- Google Reviews/Maps
- Search/social/content scans
- n8n workflows for monitoring and reporting

Only add these when explicitly requested and after secrets/env handling is ready.
