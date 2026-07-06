import { AnalysisResult, Industry, Priority } from "./types";

export type RatingTone = "emerald" | "amber" | "rose";
export type FunnelTone = "slate" | "amber" | "rose" | "emerald";

export interface AuditRating {
  value: string;
  note: string;
  tone: RatingTone;
}

export interface FunnelStep {
  label: string;
  pct: number;
  tone: FunnelTone;
}

export interface AuditFinding {
  title: string;
  severity: Priority;
  impact: string;
  fix: string;
}

export interface WebsiteAudit {
  conversionScore: number;
  scoreLabel: string;
  trustSignals: AuditRating;
  leadCapture: AuditRating;
  mobileExperience: AuditRating;
  automationReadiness: AuditRating;
  tagline: string;
  ctaLabel: string;
  funnel: FunnelStep[];
  findings: AuditFinding[];
  improvements: string[];
  insight: string;
}

interface AuditProfile {
  tagline: string;
  ctaLabel: string;
  leadChannel: string;
  firstImprovement: string;
  trustSignals: AuditRating;
  leadCapture: AuditRating;
  mobileExperience: AuditRating;
  funnel: FunnelStep[];
}

const GOOD: RatingTone = "emerald";
const MEDIUM: RatingTone = "amber";
const WEAK: RatingTone = "rose";

const PROFILES: Record<Industry, AuditProfile> = {
  dental: {
    tagline: "Modern dental care for the whole family",
    ctaLabel: "Book Appointment",
    leadChannel: "WhatsApp",
    firstImprovement: "Add AI appointment assistant",
    trustSignals: { value: "Medium", note: "Needs Improvement", tone: MEDIUM },
    leadCapture: { value: "Weak", note: "Major Gap", tone: WEAK },
    mobileExperience: { value: "Good", note: "Responsive", tone: GOOD },
    funnel: [
      { label: "Service Page", pct: 72, tone: "slate" },
      { label: "Contact Form", pct: 34, tone: "amber" },
      { label: "Booking Request", pct: 18, tone: "rose" },
      { label: "Confirmed Appointment", pct: 11, tone: "emerald" },
    ],
  },
  restaurant: {
    tagline: "Seasonal kitchen & catering for every occasion",
    ctaLabel: "Reserve a Table",
    leadChannel: "WhatsApp",
    firstImprovement: "Add AI reservation assistant",
    trustSignals: { value: "Medium", note: "Needs Improvement", tone: MEDIUM },
    leadCapture: { value: "Weak", note: "Major Gap", tone: WEAK },
    mobileExperience: { value: "Good", note: "Responsive", tone: GOOD },
    funnel: [
      { label: "Menu Page", pct: 78, tone: "slate" },
      { label: "Reservation Form", pct: 31, tone: "amber" },
      { label: "Booking Request", pct: 19, tone: "rose" },
      { label: "Confirmed Reservation", pct: 12, tone: "emerald" },
    ],
  },
  gym: {
    tagline: "Train smarter with coaches who care",
    ctaLabel: "Start Free Trial",
    leadChannel: "WhatsApp",
    firstImprovement: "Add AI trial booking assistant",
    trustSignals: { value: "Good", note: "Solid Reviews", tone: GOOD },
    leadCapture: { value: "Medium", note: "Needs Improvement", tone: MEDIUM },
    mobileExperience: { value: "Good", note: "Responsive", tone: GOOD },
    funnel: [
      { label: "Membership Page", pct: 74, tone: "slate" },
      { label: "Trial Form", pct: 29, tone: "amber" },
      { label: "Trial Booking", pct: 16, tone: "rose" },
      { label: "Confirmed Trial", pct: 10, tone: "emerald" },
    ],
  },
  iptv: {
    tagline: "Thousands of channels, on every device",
    ctaLabel: "Start Free Trial",
    leadChannel: "Telegram",
    firstImprovement: "Add AI support chatbot",
    trustSignals: { value: "Weak", note: "Major Gap", tone: WEAK },
    leadCapture: { value: "Medium", note: "Needs Improvement", tone: MEDIUM },
    mobileExperience: { value: "Medium", note: "Needs Improvement", tone: MEDIUM },
    funnel: [
      { label: "Pricing Page", pct: 81, tone: "slate" },
      { label: "Telegram Contact", pct: 38, tone: "amber" },
      { label: "Trial Request", pct: 22, tone: "rose" },
      { label: "Activated Subscription", pct: 14, tone: "emerald" },
    ],
  },
  ecommerce: {
    tagline: "Quality products, shipped fast",
    ctaLabel: "Shop Now",
    leadChannel: "WhatsApp",
    firstImprovement: "Add AI order-status assistant",
    trustSignals: { value: "Medium", note: "Needs Improvement", tone: MEDIUM },
    leadCapture: { value: "Weak", note: "Major Gap", tone: WEAK },
    mobileExperience: { value: "Good", note: "Responsive", tone: GOOD },
    funnel: [
      { label: "Product Page", pct: 76, tone: "slate" },
      { label: "Add to Cart", pct: 32, tone: "amber" },
      { label: "Checkout", pct: 14, tone: "rose" },
      { label: "Completed Order", pct: 9, tone: "emerald" },
    ],
  },
};

function scoreLabelFor(score: number): string {
  if (score >= 75) return "Strong Potential";
  if (score >= 55) return "Fair Potential";
  return "Weak Foundation";
}

const READINESS: Record<string, AuditRating> = {
  High: { value: "High", note: "Excellent Base", tone: GOOD },
  Medium: { value: "Medium", note: "Solid Base", tone: MEDIUM },
  Low: { value: "Low", note: "Needs Groundwork", tone: WEAK },
};

/** Deterministic website audit derived from the mock analysis — no crawling. */
export function buildWebsiteAudit(result: AnalysisResult): WebsiteAudit {
  const profile = PROFILES[result.industry];
  const { report } = result;

  const conversionScore = Math.min(
    90,
    Math.max(40, report.opportunityScore - 14)
  );

  const ctaFinding: AuditFinding = {
    title: "Primary CTA is visible but not repeated",
    severity: "Medium",
    impact: "Missed conversions on service and pricing pages.",
    fix: `Repeat the "${profile.ctaLabel}" CTA on all key pages.`,
  };
  const findings: AuditFinding[] = [
    ctaFinding,
    ...report.bottlenecks.map((b) => ({
      title: b.title,
      severity: b.severity,
      impact: b.detail,
      fix: b.fix,
    })),
  ].slice(0, 5);

  const improvements = [
    profile.firstImprovement,
    `Add instant ${profile.leadChannel} booking button`,
    "Add automated form follow-up",
    "Add FAQ chatbot",
    "Add review carousel and trust section",
  ];

  const insight = `The site attracts real intent but loses most visitors at the ${profile.funnel[1].label.toLowerCase()} step. The fastest improvement is automated ${profile.leadChannel} follow-up after form submission.`;

  return {
    conversionScore,
    scoreLabel: scoreLabelFor(conversionScore),
    trustSignals: profile.trustSignals,
    leadCapture: profile.leadCapture,
    mobileExperience: profile.mobileExperience,
    automationReadiness: READINESS[report.quickWinPotential],
    tagline: profile.tagline,
    ctaLabel: profile.ctaLabel,
    funnel: profile.funnel,
    findings,
    improvements,
    insight,
  };
}
