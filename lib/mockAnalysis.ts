import { INDUSTRY_PROFILES } from "./industryData";
import { buildReport } from "./report";
import { applySignals, detectSignals, signalPhrase } from "./signals";
import {
  AnalysisResult,
  CompanyInput,
  DetectedSignal,
  INDUSTRY_OPTIONS,
  Outreach,
  RoiEstimate,
} from "./types";

function cleanCompanyName(name: string): string {
  return name.trim() || "This business";
}

function cleanWebsite(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function buildRoi(
  base: Omit<RoiEstimate, "estimatedMonthlyValue">,
  signals: DetectedSignal[]
): RoiEstimate {
  // Each confirmed signal reveals extra recoverable hours the benchmark
  // profile alone can't see (capped so the estimate stays conservative).
  const signalHours = Math.min(8, signals.length * 2);
  const monthlyHoursSaved = base.monthlyHoursSaved + signalHours;
  return {
    ...base,
    monthlyHoursSaved,
    estimatedMonthlyValue: Math.round(monthlyHoursSaved * base.hourlyValue),
  };
}

function buildSummary(
  baseSummary: string,
  signals: DetectedSignal[],
  leadOpportunity: string
): string {
  if (signals.length === 0) return baseSummary;
  return `${baseSummary} The owner's own notes independently flag ${signalPhrase(
    signals,
    3
  )} — first-hand confirmation that ${leadOpportunity.toLowerCase()} should lead the roadmap.`;
}

function buildOutreach(
  companyName: string,
  website: string,
  industryLabel: string,
  problemLine: string,
  topOpportunityTitles: string[],
  signals: DetectedSignal[],
  notes: string
): Outreach {
  const siteRef = website ? ` (${website})` : "";
  const oppLine = topOpportunityTitles.slice(0, 2).join(" and ");
  const notesLine =
    signals.length > 0
      ? ` You mentioned ${signalPhrase(signals, 1)} yourself — that's a pattern I see constantly in ${industryLabel.toLowerCase()} businesses, and it's usually fixable in weeks, not months.`
      : notes.trim()
        ? ` I also noted: "${notes.trim()}" — happy to fold that into the plan.`
        : "";

  const coldEmail = `Subject: A few automation opportunities I spotted for ${companyName}

Hi there,

I took a look at ${companyName}${siteRef} from an operations standpoint, and a couple of things stood out — specifically ${problemLine}.

These are common in ${industryLabel.toLowerCase()} businesses, and they're usually fixable with targeted automation rather than more headcount. Two quick wins I'd start with: ${oppLine}.${notesLine}

Would you be open to a 15-minute call this week? I can walk you through exactly where the time and revenue are leaking, and what it would take to fix it.

Best,
[Your name]`;

  const linkedinDm = `Hi! I help ${industryLabel.toLowerCase()} businesses like ${companyName} cut down on manual admin work using targeted AI automation. Noticed a couple of likely bottlenecks (${problemLine}) — worth a quick chat about ${oppLine.toLowerCase()}?`;

  const followUp = `Hi again — following up on my note about ${companyName}. No pressure at all, just wanted to flag that the ${oppLine.toLowerCase()} could realistically be live within a few weeks and start saving staff time almost immediately. Let me know if a short call makes sense, or if now isn't the right time.`;

  const pitch = `I help ${industryLabel.toLowerCase()} businesses like ${companyName} find and automate the hidden operational bottlenecks — like ${problemLine} — that quietly cost hours and revenue every month. In a short engagement, I map out the highest-impact automations, build the top 1-2, and show measurable time and cost savings within weeks.`;

  return { coldEmail, linkedinDm, followUp, pitch };
}

export function generateAnalysis(input: CompanyInput): AnalysisResult {
  const companyName = cleanCompanyName(input.companyName);
  const website = cleanWebsite(input.websiteUrl);
  const profile = INDUSTRY_PROFILES[input.industry];
  const industryLabel =
    INDUSTRY_OPTIONS.find((o) => o.value === input.industry)?.label ??
    "Business";
  const notes = input.notes.trim();

  // 1. Extract weighted signals from the owner's notes.
  const signals = detectSignals(notes, input.industry);

  // 2. Re-rank problems/opportunities around what the owner confirmed.
  const { problems, opportunities } = applySignals(
    profile,
    input.industry,
    signals
  );

  // 3. Signals uplift the recoverable-hours estimate, which flows into
  //    savings, forecast, and break-even.
  const roi = buildRoi(profile.roi, signals);
  const report = buildReport(problems, opportunities, roi, signals);

  const displayProblems = [...problems];
  if (notes && signals.length === 0) {
    displayProblems.push({ title: "Owner-provided context", detail: notes });
  }

  // Opportunities are already ranked (signal boost first, then priority).
  const topOpportunityTitles = opportunities.slice(0, 2).map((o) => o.title);

  const problemLine =
    signals.length > 0
      ? signalPhrase(signals)
      : problems
          .slice(0, 2)
          .map((p) => p.title.toLowerCase())
          .join(" and ");

  const outreach = buildOutreach(
    companyName,
    website,
    industryLabel,
    problemLine,
    topOpportunityTitles,
    signals,
    notes
  );

  return {
    companyName,
    websiteUrl: website,
    industry: input.industry,
    industryLabel,
    businessSummary: buildSummary(
      profile.summary(companyName),
      signals,
      topOpportunityTitles[0]
    ),
    problems: displayProblems,
    opportunities,
    signals,
    roi,
    report,
    outreach,
  };
}
