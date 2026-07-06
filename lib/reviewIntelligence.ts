import { AnalysisResult, ComplexityLevel, Industry, Priority } from "./types";

export type SentimentTone = "positive" | "negative" | "neutral";

export interface ReviewTheme {
  label: string;
  meta: string;
  tone: SentimentTone;
}

export interface ReviewSample {
  kind: "Positive" | "Negative" | "Neutral";
  stars: number;
  text: string;
  analysis: string;
  reply: string;
  urgency: ComplexityLevel;
}

export interface ResponseRow {
  type: string;
  count: number;
  responseRate: string;
  risk: ComplexityLevel;
  automation: string;
}

export interface ReviewRecommendation {
  title: string;
  priority: Priority;
  impactPerMonth: number;
  complexity: ComplexityLevel;
  time: string;
}

export interface ReviewIntelligence {
  rating: number;
  totalReviews: number;
  sentimentScore: number;
  responseRate: number;
  unansweredNegative: number;
  reputationRisk: ComplexityLevel;
  sentiment: { positive: number; neutral: number; negative: number };
  themes: ReviewTheme[];
  responseRows: ResponseRow[];
  recommendations: ReviewRecommendation[];
  samples: ReviewSample[];
  insight: string;
}

interface ReviewProfile {
  rating: number;
  totalReviews: number;
  positive: number;
  neutral: number;
  negative: number;
  responseRate: number;
  touchpoint: string;
  themes: ReviewTheme[];
  samples: ReviewSample[];
}

const PROFILES: Record<Industry, ReviewProfile> = {
  dental: {
    rating: 4.3,
    totalReviews: 186,
    positive: 71,
    neutral: 18,
    negative: 11,
    responseRate: 42,
    touchpoint: "successful appointments",
    themes: [
      { label: "Long waiting time", meta: "High freq · Negative · High impact", tone: "negative" },
      { label: "Friendly staff", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Difficulty reaching the clinic by phone", meta: "Medium freq · Negative · High impact", tone: "negative" },
      { label: "Appointment scheduling confusion", meta: "Medium freq · Negative · Medium impact", tone: "negative" },
      { label: "Good dental results", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Pricing uncertainty", meta: "Low freq · Neutral · Medium impact", tone: "neutral" },
    ],
    samples: [
      {
        kind: "Positive",
        stars: 5,
        text: "Great experience, very professional and friendly staff. My teeth feel amazing.",
        analysis: "Highly positive",
        reply: "Thank them for their kind words and loyalty.",
        urgency: "Low",
      },
      {
        kind: "Negative",
        stars: 2,
        text: "Waited over 45 minutes past my appointment time. No one apologized. Very frustrating.",
        analysis: "Negative, high risk",
        reply: "Acknowledge the wait, apologize sincerely, offer a direct contact to resolve.",
        urgency: "High",
      },
      {
        kind: "Neutral",
        stars: 4,
        text: "The cleaning was fine, but the scheduling process was confusing.",
        analysis: "Neutral",
        reply: "Acknowledge the feedback, mention process improvements.",
        urgency: "Medium",
      },
    ],
  },
  restaurant: {
    rating: 4.1,
    totalReviews: 342,
    positive: 68,
    neutral: 19,
    negative: 13,
    responseRate: 35,
    touchpoint: "happy visits",
    themes: [
      { label: "Slow service at peak hours", meta: "High freq · Negative · High impact", tone: "negative" },
      { label: "Delicious food", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Phone never answered", meta: "Medium freq · Negative · High impact", tone: "negative" },
      { label: "Reservation mix-ups", meta: "Medium freq · Negative · Medium impact", tone: "negative" },
      { label: "Great atmosphere", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Value for money", meta: "Low freq · Neutral · Medium impact", tone: "neutral" },
    ],
    samples: [
      {
        kind: "Positive",
        stars: 5,
        text: "Amazing food and lovely atmosphere — the pasta was the best I've had in the city.",
        analysis: "Highly positive",
        reply: "Thank them warmly and invite them back for the seasonal menu.",
        urgency: "Low",
      },
      {
        kind: "Negative",
        stars: 2,
        text: "We booked for 8pm and still waited 40 minutes. Nobody picked up the phone when we called ahead.",
        analysis: "Negative, high risk",
        reply: "Apologize for the wait, explain the fix, offer a reserved table on their next visit.",
        urgency: "High",
      },
      {
        kind: "Neutral",
        stars: 3,
        text: "Food was good but service felt rushed on a busy Friday.",
        analysis: "Neutral",
        reply: "Thank them and note added staffing on peak evenings.",
        urgency: "Medium",
      },
    ],
  },
  gym: {
    rating: 4.4,
    totalReviews: 214,
    positive: 74,
    neutral: 16,
    negative: 10,
    responseRate: 48,
    touchpoint: "training milestones",
    themes: [
      { label: "Great coaches", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Billing issues on cancellation", meta: "Medium freq · Negative · High impact", tone: "negative" },
      { label: "Crowded at peak times", meta: "Medium freq · Negative · Medium impact", tone: "negative" },
      { label: "Clean facilities", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Hard to book classes", meta: "Medium freq · Negative · Medium impact", tone: "negative" },
      { label: "Membership pricing", meta: "Low freq · Neutral · Medium impact", tone: "neutral" },
    ],
    samples: [
      {
        kind: "Positive",
        stars: 5,
        text: "Best gym I've trained at — the coaches actually care about your progress.",
        analysis: "Highly positive",
        reply: "Thank them and tag the coaching team.",
        urgency: "Low",
      },
      {
        kind: "Negative",
        stars: 1,
        text: "Cancelled my membership and was still charged for two months. Support never replied.",
        analysis: "Negative, high risk",
        reply: "Apologize, confirm the refund directly, and share a direct billing contact.",
        urgency: "High",
      },
      {
        kind: "Neutral",
        stars: 4,
        text: "Good equipment, but classes fill up too fast.",
        analysis: "Neutral",
        reply: "Thank them and mention the new booking system rollout.",
        urgency: "Medium",
      },
    ],
  },
  iptv: {
    rating: 3.8,
    totalReviews: 128,
    positive: 58,
    neutral: 17,
    negative: 25,
    responseRate: 22,
    touchpoint: "successful renewals",
    themes: [
      { label: "Buffering during live matches", meta: "High freq · Negative · High impact", tone: "negative" },
      { label: "Fast activation", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Support slow to reply", meta: "High freq · Negative · High impact", tone: "negative" },
      { label: "Renewal confusion", meta: "Medium freq · Negative · Medium impact", tone: "negative" },
      { label: "Wide channel selection", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Price for value", meta: "Low freq · Neutral · Low impact", tone: "neutral" },
    ],
    samples: [
      {
        kind: "Positive",
        stars: 5,
        text: "Activated in 10 minutes, channels work great on my Smart TV.",
        analysis: "Highly positive",
        reply: "Thank them and share the multi-device setup guide.",
        urgency: "Low",
      },
      {
        kind: "Negative",
        stars: 2,
        text: "Stream kept buffering during the derby and support answered the next day.",
        analysis: "Negative, high risk",
        reply: "Apologize, share the server-switch fix, and offer a free week.",
        urgency: "High",
      },
      {
        kind: "Neutral",
        stars: 3,
        text: "Service is decent, but renewing manually every month is annoying.",
        analysis: "Neutral",
        reply: "Thank them and point to the new auto-renewal reminders.",
        urgency: "Medium",
      },
    ],
  },
  ecommerce: {
    rating: 4.2,
    totalReviews: 156,
    positive: 69,
    neutral: 18,
    negative: 13,
    responseRate: 31,
    touchpoint: "delivered orders",
    themes: [
      { label: "Fast shipping", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Slow support replies", meta: "Medium freq · Negative · High impact", tone: "negative" },
      { label: "Sizing runs small", meta: "Medium freq · Negative · Medium impact", tone: "negative" },
      { label: "Product quality", meta: "High freq · Positive · Positive impact", tone: "positive" },
      { label: "Return process unclear", meta: "Medium freq · Negative · Medium impact", tone: "negative" },
      { label: "Price vs. value", meta: "Low freq · Neutral · Low impact", tone: "neutral" },
    ],
    samples: [
      {
        kind: "Positive",
        stars: 5,
        text: "Order arrived in two days, quality better than expected.",
        analysis: "Highly positive",
        reply: "Thank them and suggest the matching accessories line.",
        urgency: "Low",
      },
      {
        kind: "Negative",
        stars: 2,
        text: "Emailed twice about a return and got no answer for a week.",
        analysis: "Negative, high risk",
        reply: "Apologize, resolve the return directly, and share the new returns portal.",
        urgency: "High",
      },
      {
        kind: "Neutral",
        stars: 3,
        text: "Nice product, but the sizing chart was off.",
        analysis: "Neutral",
        reply: "Thank them and mention the updated size guide.",
        urgency: "Medium",
      },
    ],
  },
};

const RECOMMENDATION_TEMPLATES: {
  title: string;
  priority: Priority;
  hours: number;
  complexity: ComplexityLevel;
  time: string;
}[] = [
  { title: "Review Response Agent", priority: "High", hours: 37, complexity: "Low", time: "Approx. 1 week" },
  { title: "Negative Review Escalation Workflow", priority: "High", hours: 71, complexity: "Medium", time: "Approx. 2 weeks" },
  { title: "Happy Customer Review Request Flow", priority: "Medium", hours: 43, complexity: "Medium", time: "Approx. 2 weeks" },
  { title: "Weekly Reputation Report", priority: "Low", hours: 14, complexity: "Low", time: "Approx. 1 day" },
  { title: "Google Business Profile Q&A Assistant", priority: "Medium", hours: 19, complexity: "Medium", time: "Approx. 1 week" },
];

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

/** Deterministic review intelligence derived from the mock analysis — no live review data. */
export function buildReviewIntelligence(result: AnalysisResult): ReviewIntelligence {
  const profile = PROFILES[result.industry];
  const { totalReviews, positive, neutral, negative, responseRate } = profile;

  const negCount = Math.round((totalReviews * negative) / 100);
  const unansweredNegative = Math.round(negCount * 0.85);
  const reputationRisk: ComplexityLevel =
    negative >= 20 ? "High" : negative >= 10 ? "Medium" : "Low";

  const responseRows: ResponseRow[] = [
    {
      type: "5-star reviews",
      count: Math.round(totalReviews * 0.64),
      responseRate: "60%",
      risk: "Low",
      automation: "Review Response Agent",
    },
    {
      type: "4-star reviews",
      count: Math.round(totalReviews * 0.24),
      responseRate: "20%",
      risk: "Low",
      automation: "Review Response Agent",
    },
    {
      type: "Neutral reviews",
      count: Math.round(totalReviews * 0.054),
      responseRate: "0%",
      risk: "Medium",
      automation: "Review Response Agent",
    },
    {
      type: "Negative reviews",
      count: Math.round(totalReviews * 0.059),
      responseRate: "0%",
      risk: "High",
      automation: "Negative Review Escalation Workflow",
    },
    {
      type: "Unanswered reviews",
      count: Math.round(totalReviews * 0.38),
      responseRate: "0%",
      risk: "High",
      automation: "All",
    },
  ];

  const recommendations: ReviewRecommendation[] = RECOMMENDATION_TEMPLATES.map(
    (t) => ({
      title: t.title,
      priority: t.priority,
      impactPerMonth: roundTo(t.hours * result.roi.hourlyValue, 50),
      complexity: t.complexity,
      time: t.time,
    })
  );

  return {
    rating: profile.rating,
    totalReviews,
    sentimentScore: Math.round(positive + neutral * 0.4),
    responseRate,
    unansweredNegative,
    reputationRisk,
    sentiment: { positive, neutral, negative },
    themes: profile.themes,
    responseRows,
    recommendations,
    samples: profile.samples,
    insight: `The strongest opportunity is not only replying to reviews, but triggering review requests automatically after ${profile.touchpoint}.`,
  };
}
