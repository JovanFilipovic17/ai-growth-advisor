export type Industry =
  | "dental"
  | "restaurant"
  | "gym"
  | "iptv"
  | "ecommerce";

export interface IndustryOption {
  value: Industry;
  label: string;
}

export const INDUSTRY_OPTIONS: IndustryOption[] = [
  { value: "dental", label: "Dental clinic" },
  { value: "restaurant", label: "Restaurant / catering" },
  { value: "gym", label: "Gym / fitness studio" },
  { value: "iptv", label: "Balkan IPTV / OTT provider" },
  { value: "ecommerce", label: "Small e-commerce store" },
];

export interface CompanyInput {
  companyName: string;
  websiteUrl: string;
  industry: Industry;
  notes: string;
}

export type Priority = "High" | "Medium" | "Low";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type ComplexityLevel = "Low" | "Medium" | "High";

/** Business signals the engine can extract from the owner's free-text notes. */
export type SignalId =
  | "missed_calls"
  | "slow_followup"
  | "no_crm"
  | "review_gap"
  | "no_shows"
  | "booking_friction"
  | "manual_reporting"
  | "churn_risk"
  | "website_conversion"
  | "social_inactive"
  | "admin_overload";

export interface DetectedSignal {
  id: SignalId;
  label: string;
  /** The notes phrase that triggered the detection. */
  evidence: string;
  /** Industry-adjusted relevance, 1 (noted) to 3 (critical for this industry). */
  weight: number;
}

export interface Problem {
  title: string;
  detail: string;
}

export interface Opportunity {
  title: string;
  description: string;
  priority: Priority;
  difficulty: Difficulty;
  hoursSavedPerMonth: number;
  impact: string;
}

export interface RoiEstimate {
  monthlyHoursSaved: number;
  hourlyValue: number;
  estimatedMonthlyValue: number;
  implementationPriceLow: number;
  implementationPriceHigh: number;
  monthlyRetainer: number;
}

export interface Bottleneck {
  title: string;
  detail: string;
  fix: string;
  severity: Priority;
  impactPerMonth: number;
}

export interface RoiForecastPoint {
  month: number;
  cumulativeNet: number;
}

export interface ReportData {
  opportunityScore: number;
  scoreLabel: string;
  /** Human-readable "x and y" naming the two best quick-win opportunities. */
  quickWinPair: string;
  revenueLeak: number;
  complexity: ComplexityLevel;
  complexityNote: string;
  quickWinPotential: ComplexityLevel;
  quickWinNote: string;
  bottlenecks: Bottleneck[];
  forecast: RoiForecastPoint[];
  breakEvenMonth: number;
  projectedSixMonthRoi: number;
  insight: string;
}

export interface Outreach {
  coldEmail: string;
  linkedinDm: string;
  followUp: string;
  pitch: string;
}

export interface AnalysisResult {
  companyName: string;
  websiteUrl: string;
  industry: Industry;
  industryLabel: string;
  businessSummary: string;
  problems: Problem[];
  opportunities: Opportunity[];
  signals: DetectedSignal[];
  roi: RoiEstimate;
  report: ReportData;
  outreach: Outreach;
}
