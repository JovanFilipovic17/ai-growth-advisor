import { INDUSTRY_PROFILES } from "./industryData";
import { buildReport } from "./report";
import {
  AnalysisResult,
  CompanyInput,
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

function buildRoi(base: Omit<RoiEstimate, "estimatedMonthlyValue">): RoiEstimate {
  const estimatedMonthlyValue = Math.round(
    base.monthlyHoursSaved * base.hourlyValue
  );
  return { ...base, estimatedMonthlyValue };
}

function buildOutreach(
  companyName: string,
  website: string,
  industryLabel: string,
  topProblemTitles: string[],
  topOpportunityTitles: string[],
  notes: string
): Outreach {
  const siteRef = website ? ` (${website})` : "";
  const problemLine = topProblemTitles.slice(0, 2).join(" and ").toLowerCase();
  const oppLine = topOpportunityTitles.slice(0, 2).join(" and ");
  const notesLine = notes.trim()
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

  const roi = buildRoi(profile.roi);
  const report = buildReport(profile.problems, profile.opportunities, roi);

  const problems = [...profile.problems];
  const notes = input.notes.trim();
  if (notes) {
    problems.push({ title: "Owner-provided context", detail: notes });
  }

  const opportunities = [...profile.opportunities];

  const priorityOrder = { High: 0, Medium: 1, Low: 2 } as const;
  const topOpportunityTitles = [...opportunities]
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 2)
    .map((o) => o.title);

  const outreach = buildOutreach(
    companyName,
    website,
    industryLabel,
    profile.problems.map((p) => p.title),
    topOpportunityTitles,
    notes
  );

  return {
    companyName,
    websiteUrl: website,
    industry: input.industry,
    industryLabel,
    businessSummary: profile.summary(companyName),
    problems,
    opportunities,
    roi,
    report,
    outreach,
  };
}
