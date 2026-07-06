# AI Growth Advisor

Premium AI business intelligence dashboard for consultants, freelancers, and small agencies.

AI Growth Advisor helps turn company information into structured business insights: operational bottlenecks, AI automation opportunities, ROI forecasts, website audit signals, review intelligence, proposal sections, and outreach-ready recommendations.

This project is built as a portfolio-ready MVP using Next.js, TypeScript, Tailwind CSS, and deterministic local business logic.

---

## Overview

AI Growth Advisor is designed as an AI consultant cockpit.

A user enters basic company information such as:

- Company name
- Website URL
- Industry
- Optional business notes

The app then generates a multi-view business intelligence report, including:

- Company overview
- Business bottlenecks
- AI automation opportunities
- ROI forecast
- Website audit
- Review intelligence
- Proposal builder
- Outreach-ready insights

The current version uses local/mock deterministic logic. It does not use external APIs, scraping, authentication, databases, or paid AI calls.

---

## Why This Project Exists

Many small businesses have operational problems that can be improved with AI automation, but consultants often need time to identify:

- where the business is losing time or revenue
- which automation opportunity should come first
- how to estimate ROI
- how to structure the proposal
- how to explain the value clearly to the client

AI Growth Advisor demonstrates how an AI-powered business intelligence layer could help AI consultants and agencies prepare better client audits and proposals faster.

---

## Features

### 1. Business Intelligence Overview

The main dashboard summarizes the company analysis and highlights:

- AI Opportunity Score
- Estimated monthly savings
- Revenue leakage
- Implementation complexity
- Quick-win potential

### 2. Business Bottlenecks

The app detects mock operational bottlenecks based on the selected industry, such as:

- missed lead follow-up
- poor booking flow
- weak review response
- manual reporting
- churn risk
- customer support gaps

Each bottleneck includes severity, estimated impact, and a suggested fix.

### 3. AI Automation Opportunities

The dashboard ranks potential AI automation solutions, such as:

- AI receptionist
- lead follow-up agent
- review response agent
- appointment reminder agent
- customer support automation
- reporting agent
- retention / renewal automation

Each opportunity includes priority, difficulty, estimated value, and confidence.

### 4. Website Audit View

A dedicated Website Audit view shows mock website intelligence, including:

- conversion score
- trust signals
- lead capture quality
- mobile experience
- automation readiness
- recommended website improvements

### 5. Reviews / Review Intelligence View

A dedicated Reviews view shows mock reputation intelligence, including:

- rating overview
- sentiment score
- response rate
- unanswered negative reviews
- reputation risk
- customer themes
- AI recommendations

### 6. ROI Forecast View

A dedicated ROI view shows:

- current monthly revenue leakage
- expected recovery
- implementation cost
- break-even estimate
- 6-month projected ROI
- scenario-style forecast sections

### 7. Proposal Builder View

A dedicated Proposal Builder view structures a client-ready proposal with:

- executive summary
- current bottlenecks
- recommended AI automations
- ROI estimate
- implementation plan
- pricing options
- next steps

Export and CRM buttons are currently visual placeholders for future roadmap features.

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- Local deterministic analysis logic
- Vercel-ready static deployment

---

## Current Status

This is an MVP demo.

Implemented:

- Premium dark SaaS dashboard UI
- Multi-view dashboard shell
- Overview dashboard
- Website Audit view
- Reviews view
- ROI Forecast view
- Proposal Builder view
- Local/mock business analysis
- Responsive layout
- Static Vercel-ready build

Not implemented yet:

- real website scraping
- real Google Reviews integration
- real AI/LLM calls
- authentication
- database
- saved reports
- PDF export
- CRM export
- email sending
- n8n workflow integration

---

## Demo Flow

1. Enter a company name.
2. Add a website URL.
3. Select an industry.
4. Optionally add business notes.
5. Generate the business analysis.
6. Explore the generated views:
   - Overview
   - Website Audit
   - Reviews
   - ROI Forecast
   - Proposal Builder

---

## Supported Demo Industries

The MVP currently supports deterministic mock analysis for:

- Dental clinic
- Restaurant / catering
- Gym / fitness studio
- Balkan IPTV / OTT provider
- Small e-commerce store

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```bash
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

---

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  AppShell.tsx
  CompanyForm.tsx
  CopyButton.tsx
  Panel.tsx
  ScoreRing.tsx
  PreviewSkeleton.tsx
  cardStyles.ts
  buttonStyles.ts

components/shell/
  Sidebar.tsx
  TopNav.tsx

components/report/
  ReportView.tsx
  KpiCards.tsx
  BottlenecksSection.tsx
  OpportunitiesTable.tsx
  RoiForecastChart.tsx
  ProposalPreview.tsx
  AiInsightPanel.tsx
  OutreachSection.tsx

components/views/
  WebsiteAuditView.tsx
  ReviewsView.tsx
  RoiForecastView.tsx
  ProposalBuilderView.tsx

lib/
  types.ts
  industryData.ts
  mockAnalysis.ts
  report.ts
  format.ts
  websiteAudit.ts
```

---

## Roadmap

### Phase 1: Smarter Local Intelligence

Make the optional notes field influence:

- detected signals
- bottleneck severity
- opportunity ranking
- ROI estimate
- proposal recommendations
- website audit insights
- review intelligence

### Phase 2: Proposal / Report Export

Add real report export functionality:

- PDF export
- downloadable client proposal
- proposal templates
- branded report layout

### Phase 3: Saved Companies and Reports

Add persistence for:

- saved companies
- scan history
- generated reports
- opportunity status
- follow-up tracking

### Phase 4: MCP / Docs Knowledge Layer

Connect the app to external knowledge sources such as:

- internal docs
- business playbooks
- sales notes
- proposal templates
- previous client reports

### Phase 5: n8n Workflow Integration

Connect analysis outputs to automation workflows:

- send follow-up emails
- create CRM tasks
- trigger lead enrichment
- notify the consultant
- schedule outreach reminders

### Phase 6: Real Public Data Integrations

Potential future integrations:

- website crawling
- Google Reviews
- social media analysis
- competitor research
- Google Maps leads
- public business data

---

## Positioning

AI Growth Advisor is not a generic chatbot.

It is a business intelligence and proposal-preparation dashboard for AI consultants who want to identify automation opportunities and communicate business value more clearly.

---

## Disclaimer

This MVP uses mock and deterministic local logic for demonstration purposes.

It does not currently perform real website crawling, review scraping, live company research, or external AI inference.

---

## Author

Built by Jovan Filipovic as part of an AI business and agentic automation portfolio.