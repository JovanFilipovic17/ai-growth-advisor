import {
  DetectedSignal,
  Industry,
  Opportunity,
  Priority,
  Problem,
  SignalId,
} from "./types";
import { IndustryProfile } from "./industryData";

/**
 * Deterministic notes → signals engine. No LLM involved: lowercase keyword
 * matching, weighted per industry, then used to re-rank the mock analysis.
 *
 * Example notes for manual testing (also listed in HANDOFF.md):
 * 1. "We keep missing calls during busy hours and leads wait days for a reply."
 *    → missed_calls + slow_followup: AI receptionist jumps to #1, score rises.
 * 2. "We get bad reviews about waiting times and nobody replies to our reviews."
 *    → review_gap: review automation climbs, Reviews view risk bumps to High.
 * 3. "Lots of no-shows lately and patients say booking online is confusing."
 *    → no_shows + booking_friction: reminders lead, Website Audit flags lead capture.
 */

interface SignalDef {
  id: SignalId;
  label: string;
  keywords: string[];
  /** How much this signal matters per industry (1 = noted, 3 = critical). */
  weights: Record<Industry, number>;
}

const SIGNAL_DEFS: SignalDef[] = [
  {
    id: "missed_calls",
    label: "Missed inbound calls",
    keywords: [
      "missed call", "missing calls", "miss calls", "phone rings", "can't answer",
      "cant answer", "nobody answers", "unanswered calls", "busy line",
      "keep missing calls", "phone problem", "calls go",
    ],
    weights: { dental: 3, restaurant: 3, gym: 2, iptv: 1, ecommerce: 1 },
  },
  {
    id: "slow_followup",
    label: "Slow lead follow-up",
    keywords: [
      "slow follow", "follow up", "follow-up", "followup", "leads wait",
      "leads go cold", "slow to reply", "reply late", "days for a reply",
      "slow response", "respond slowly", "take days",
    ],
    weights: { dental: 2, restaurant: 2, gym: 3, iptv: 2, ecommerce: 2 },
  },
  {
    id: "no_crm",
    label: "No CRM / scattered customer data",
    keywords: [
      "no crm", "excel", "spreadsheet", "messy data", "no system",
      "scattered", "paper records", "notebook", "whatsapp chats everywhere",
    ],
    weights: { dental: 2, restaurant: 1, gym: 2, iptv: 2, ecommerce: 2 },
  },
  {
    id: "review_gap",
    label: "Review management gap",
    keywords: [
      "bad review", "negative review", "1-star", "one star", "google rating",
      "reply to review", "replies to review", "unanswered review",
      "reviews", "reputation",
    ],
    weights: { dental: 3, restaurant: 3, gym: 2, iptv: 2, ecommerce: 2 },
  },
  {
    id: "no_shows",
    label: "Appointment no-shows",
    keywords: [
      "no-show", "no show", "noshow", "don't show up", "dont show up",
      "cancel last minute", "last-minute cancel", "missed appointment",
    ],
    weights: { dental: 3, restaurant: 3, gym: 2, iptv: 1, ecommerce: 1 },
  },
  {
    id: "booking_friction",
    label: "Booking friction",
    keywords: [
      "hard to book", "booking is confusing", "booking online", "booking flow",
      "booking process", "scheduling", "book appointments", "reservation process",
      "booking",
    ],
    weights: { dental: 3, restaurant: 3, gym: 3, iptv: 1, ecommerce: 2 },
  },
  {
    id: "manual_reporting",
    label: "Manual reporting",
    keywords: [
      "manual report", "reports by hand", "reporting", "copy paste",
      "copy-paste", "manually track", "manual data entry", "type everything",
    ],
    weights: { dental: 1, restaurant: 2, gym: 2, iptv: 2, ecommerce: 2 },
  },
  {
    id: "churn_risk",
    label: "Churn / renewal risk",
    keywords: [
      "churn", "cancel subscription", "cancellations", "renewal", "renewals",
      "expire", "expiring", "losing customers", "losing members", "retention",
      "members leaving", "don't come back", "dont come back",
    ],
    weights: { dental: 2, restaurant: 2, gym: 3, iptv: 3, ecommerce: 2 },
  },
  {
    id: "website_conversion",
    label: "Weak website conversion",
    keywords: [
      "website doesn't convert", "website doesnt convert", "no leads from website",
      "website conversion", "landing page", "web form", "website is old",
      "site doesn't", "few inquiries", "website",
    ],
    weights: { dental: 2, restaurant: 2, gym: 2, iptv: 2, ecommerce: 3 },
  },
  {
    id: "social_inactive",
    label: "Inactive social media",
    keywords: [
      "social media", "instagram", "facebook", "tiktok", "haven't posted",
      "havent posted", "no posts", "never post",
    ],
    weights: { dental: 1, restaurant: 2, gym: 2, iptv: 1, ecommerce: 2 },
  },
  {
    id: "admin_overload",
    label: "High admin workload",
    keywords: [
      "admin", "paperwork", "overwhelmed", "drowning", "busywork",
      "too much manual", "no time", "everything by hand", "manually",
    ],
    weights: { dental: 2, restaurant: 2, gym: 2, iptv: 2, ecommerce: 2 },
  },
];

const SIGNAL_LABELS: Record<SignalId, string> = Object.fromEntries(
  SIGNAL_DEFS.map((d) => [d.id, d.label])
) as Record<SignalId, string>;

export function signalLabel(id: SignalId): string {
  return SIGNAL_LABELS[id];
}

/**
 * Tags for INDUSTRY_PROFILES[industry].opportunities[i] — index-aligned, same
 * invariant as problems[i] ↔ opportunities[i] pairing in industryData.ts.
 * A detected signal boosts every opportunity tagged with its id.
 */
const OPPORTUNITY_TAGS: Record<Industry, SignalId[][]> = {
  dental: [
    ["no_shows", "booking_friction"], // appointment reminders
    ["missed_calls", "slow_followup", "booking_friction", "website_conversion"], // AI receptionist
    ["review_gap", "social_inactive"], // review request flow
    ["churn_risk", "slow_followup", "no_crm"], // recall & reactivation
    ["admin_overload", "manual_reporting"], // insurance pre-verification
    ["admin_overload", "no_crm"], // digital intake forms
  ],
  restaurant: [
    ["missed_calls", "slow_followup", "booking_friction"], // AI phone/chat assistant
    ["no_shows", "booking_friction"], // reservation reminders
    ["review_gap", "social_inactive"], // review & reputation
    ["manual_reporting", "admin_overload"], // inventory automation
    ["churn_risk", "no_crm"], // loyalty automation
    ["slow_followup", "website_conversion"], // catering auto-responder
  ],
  gym: [
    ["slow_followup", "website_conversion", "missed_calls"], // trial lead nurture
    ["churn_risk", "no_crm"], // churn-risk win-back
    ["booking_friction", "no_shows"], // class booking assistant
    ["churn_risk", "manual_reporting"], // billing & renewal reminders
    ["review_gap", "social_inactive"], // referral & review automation
    ["admin_overload", "manual_reporting"], // coach admin automation
  ],
  iptv: [
    ["missed_calls", "slow_followup", "admin_overload"], // AI support chatbot
    ["churn_risk", "manual_reporting"], // renewal & payment reminders
    ["booking_friction", "website_conversion"], // onboarding sequence
    ["churn_risk", "slow_followup"], // churn win-back
    ["no_crm", "manual_reporting", "admin_overload"], // reseller tracking
    ["missed_calls", "admin_overload"], // FAQ auto-responder
  ],
  ecommerce: [
    ["slow_followup", "missed_calls", "admin_overload"], // AI support assistant
    ["website_conversion", "churn_risk"], // cart recovery
    ["review_gap", "churn_risk"], // review & upsell flow
    ["manual_reporting", "no_crm"], // inventory sync
    ["no_crm", "churn_risk", "social_inactive"], // segmentation & win-back
    ["website_conversion", "booking_friction"], // FAQ chatbot
  ],
};

/** Extracts weighted business signals from free-text notes. Deterministic. */
export function detectSignals(
  notes: string,
  industry: Industry
): DetectedSignal[] {
  const text = notes.trim().toLowerCase();
  if (!text) return [];

  const detected: DetectedSignal[] = [];
  for (const def of SIGNAL_DEFS) {
    const match = def.keywords.find((k) => text.includes(k));
    if (match) {
      detected.push({
        id: def.id,
        label: def.label,
        evidence: match,
        weight: def.weights[industry],
      });
    }
  }
  // Strongest signals first; stable on definition order for equal weights.
  return detected.sort((a, b) => b.weight - a.weight).slice(0, 6);
}

const PRIORITY_UPGRADE: Record<Priority, Priority> = {
  High: "High",
  Medium: "High",
  Low: "Medium",
};

export interface AdjustedAnalysis {
  problems: Problem[];
  opportunities: Opportunity[];
  /** Signal boost per (re-ranked) opportunity, aligned by index. */
  boosts: number[];
}

/**
 * Re-ranks the industry profile using detected signals: opportunities tagged
 * with a matched signal move up, their priority upgrades when the evidence is
 * strong, and the paired problem is marked as owner-confirmed.
 */
export function applySignals(
  profile: IndustryProfile,
  industry: Industry,
  signals: DetectedSignal[]
): AdjustedAnalysis {
  const tags = OPPORTUNITY_TAGS[industry];
  const weightById = new Map(signals.map((s) => [s.id, s.weight]));

  const entries = profile.opportunities.map((opp, i) => {
    const boost = (tags[i] ?? []).reduce(
      (sum, tag) => sum + (weightById.get(tag) ?? 0),
      0
    );
    return { opp, problem: profile.problems[i], boost, i };
  });

  entries.sort((a, b) => b.boost - a.boost || a.i - b.i);

  return {
    opportunities: entries.map(({ opp, boost }) =>
      boost >= 3 ? { ...opp, priority: PRIORITY_UPGRADE[opp.priority] } : opp
    ),
    problems: entries.map(({ problem, boost }) =>
      boost > 0
        ? { ...problem, detail: `${problem.detail} Confirmed by the owner's notes.` }
        : problem
    ),
    boosts: entries.map((e) => e.boost),
  };
}

export function totalSignalWeight(signals: DetectedSignal[]): number {
  return signals.reduce((sum, s) => sum + s.weight, 0);
}

/** "missed inbound calls and slow lead follow-up" — for sentence templates. */
export function signalPhrase(signals: DetectedSignal[], max = 2): string {
  return signals
    .slice(0, max)
    .map((s) => s.label.toLowerCase())
    .join(" and ");
}

export function hasSignal(signals: DetectedSignal[], id: SignalId): boolean {
  return signals.some((s) => s.id === id);
}
