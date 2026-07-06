import { Industry, Opportunity, Problem, RoiEstimate } from "./types";

export interface IndustryProfile {
  summary: (companyName: string) => string;
  // Ordered so problems[i] is addressed by opportunities[i] — the report
  // layer pairs them into bottleneck cards with a suggested fix.
  problems: Problem[];
  opportunities: Opportunity[];
  roi: Omit<RoiEstimate, "estimatedMonthlyValue">;
}

export const INDUSTRY_PROFILES: Record<Industry, IndustryProfile> = {
  dental: {
    summary: (name) =>
      `${name} appears to be a patient-facing dental practice where front-desk staff juggle phone bookings, reminder calls, and insurance paperwork by hand. Growth is likely being capped by no-shows, slow patient communication, and manual scheduling rather than a lack of demand.`,
    problems: [
      {
        title: "High no-show rate",
        detail:
          "Appointment reminders are inconsistent, so booked chair time regularly goes unused.",
      },
      {
        title: "Missed after-hours inquiries",
        detail:
          "New patient inquiries from the website and Instagram go unanswered outside office hours and go cold.",
      },
      {
        title: "No review collection system",
        detail:
          "There is no systematic process for requesting Google reviews after a good visit.",
      },
      {
        title: "No patient recall process",
        detail:
          "Recall for cleanings and checkups relies on staff remembering to follow up manually.",
      },
      {
        title: "Manual insurance paperwork",
        detail:
          "Insurance verification and claims paperwork is done by hand for every patient.",
      },
      {
        title: "Paper intake at check-in",
        detail:
          "Front desk spends hours per week on phone bookings, rescheduling, and paper intake forms.",
      },
    ],
    opportunities: [
      {
        title: "Automated appointment reminders (SMS + email)",
        description:
          "Send automatic multi-touch reminders (7 days, 1 day, 2 hours before) to cut no-shows without staff involvement.",
        priority: "High",
        difficulty: "Easy",
        hoursSavedPerMonth: 12,
        impact: "Reduces no-shows, protects chair-time revenue",
      },
      {
        title: "AI receptionist / booking chatbot",
        description:
          "A website and WhatsApp chatbot that answers FAQs, checks availability, and books appointments 24/7.",
        priority: "High",
        difficulty: "Medium",
        hoursSavedPerMonth: 20,
        impact: "Captures after-hours leads that currently go cold",
      },
      {
        title: "Automated review request flow",
        description:
          "Trigger a review request text/email after each completed appointment for happy patients only.",
        priority: "Medium",
        difficulty: "Easy",
        hoursSavedPerMonth: 4,
        impact: "Improves local SEO and Google ranking over time",
      },
      {
        title: "Recall & reactivation campaigns",
        description:
          "Automatically message patients due for a 6-month cleaning or who haven't visited in 12+ months.",
        priority: "Medium",
        difficulty: "Medium",
        hoursSavedPerMonth: 8,
        impact: "Reactivates dormant patients into recurring revenue",
      },
      {
        title: "Insurance pre-verification assistant",
        description:
          "Pre-fill and validate insurance details before the visit using structured intake forms.",
        priority: "Medium",
        difficulty: "Hard",
        hoursSavedPerMonth: 10,
        impact: "Cuts front-desk admin load and billing delays",
      },
      {
        title: "Digital intake forms",
        description:
          "Replace paper intake forms with a mobile-friendly form sent before the visit.",
        priority: "Low",
        difficulty: "Easy",
        hoursSavedPerMonth: 5,
        impact: "Faster check-in, cleaner patient records",
      },
    ],
    roi: {
      monthlyHoursSaved: 45,
      hourlyValue: 35,
      implementationPriceLow: 1500,
      implementationPriceHigh: 3500,
      monthlyRetainer: 400,
    },
  },

  restaurant: {
    summary: (name) =>
      `${name} likely runs on thin margins where staff time is split between service, phone orders, and supplier coordination. The biggest opportunities are usually around reservation handling, repeat-customer marketing, and reducing manual work in ordering and inventory.`,
    problems: [
      {
        title: "Phones tie up staff mid-service",
        detail:
          "Staff answer repetitive calls about hours, reservations, and menu questions during peak service.",
      },
      {
        title: "Unmanaged reservation no-shows",
        detail:
          "No-shows on booked tables go unmanaged, wasting capacity during the busiest hours.",
      },
      {
        title: "No review monitoring",
        detail:
          "Customer feedback and reviews are not actively collected or monitored.",
      },
      {
        title: "Manual inventory & ordering",
        detail:
          "Inventory counts and supplier ordering are done by hand and take hours each week.",
      },
      {
        title: "No repeat-guest marketing",
        detail:
          "Loyal customers aren't re-engaged with promotions or repeat-visit offers.",
      },
      {
        title: "Slow catering inquiry response",
        detail:
          "Catering and event inquiries are handled ad-hoc over email or DMs with slow response times.",
      },
    ],
    opportunities: [
      {
        title: "AI phone/chat assistant for orders & reservations",
        description:
          "Handles common calls and DMs (hours, menu, reservations) automatically, freeing staff during peak service.",
        priority: "High",
        difficulty: "Medium",
        hoursSavedPerMonth: 18,
        impact: "Frees floor staff, captures orders that would otherwise be missed",
      },
      {
        title: "Automated reservation confirmations & reminders",
        description:
          "SMS/email confirmations and reminders to reduce no-shows on booked tables.",
        priority: "High",
        difficulty: "Easy",
        hoursSavedPerMonth: 8,
        impact: "Protects table revenue during peak hours",
      },
      {
        title: "Review & reputation automation",
        description:
          "Auto-request reviews from satisfied diners and flag negative feedback for fast follow-up.",
        priority: "Medium",
        difficulty: "Easy",
        hoursSavedPerMonth: 5,
        impact: "Builds review volume that drives new foot traffic",
      },
      {
        title: "Inventory & supplier order automation",
        description:
          "Track stock levels and auto-generate supplier orders based on par levels and sales velocity.",
        priority: "Medium",
        difficulty: "Hard",
        hoursSavedPerMonth: 12,
        impact: "Reduces waste and manual admin time",
      },
      {
        title: "Repeat-customer loyalty automation",
        description:
          "Automatically message past customers with win-back offers based on last visit date.",
        priority: "Medium",
        difficulty: "Medium",
        hoursSavedPerMonth: 6,
        impact: "Increases repeat visit frequency",
      },
      {
        title: "Catering/event inquiry auto-responder",
        description:
          "Instantly respond to catering leads with pricing info and a booking link instead of manual back-and-forth.",
        priority: "Low",
        difficulty: "Easy",
        hoursSavedPerMonth: 4,
        impact: "Faster response wins more catering deals",
      },
    ],
    roi: {
      monthlyHoursSaved: 40,
      hourlyValue: 30,
      implementationPriceLow: 1200,
      implementationPriceHigh: 3000,
      monthlyRetainer: 350,
    },
  },

  gym: {
    summary: (name) =>
      `${name} likely depends on membership retention and lead conversion more than raw foot traffic. Common bottlenecks are slow follow-up on trial leads, manual class scheduling, and no structured system for member churn prevention.`,
    problems: [
      {
        title: "Trial leads go cold",
        detail:
          "Follow-up on trial sign-ups is inconsistent, so interested prospects drift away before converting.",
      },
      {
        title: "No churn early-warning",
        detail:
          "There is no automated check-in on members whose visit frequency is dropping — the classic cancellation signal.",
      },
      {
        title: "Manual class scheduling",
        detail:
          "Class bookings and cancellations are managed manually or over group chat.",
      },
      {
        title: "Manual renewal chasing",
        detail:
          "Renewal and billing reminders are sent by hand or not at all, so failed payments slip through.",
      },
      {
        title: "No referral engine",
        detail:
          "Referrals and reviews are not systematically requested from happy members.",
      },
      {
        title: "Coaches buried in admin",
        detail:
          "Coaches spend hours on scheduling and reminders instead of training clients.",
      },
    ],
    opportunities: [
      {
        title: "Automated lead nurture for trial sign-ups",
        description:
          "Multi-day SMS/email sequence that follows up with trial leads automatically until they book or convert.",
        priority: "High",
        difficulty: "Easy",
        hoursSavedPerMonth: 10,
        impact: "Converts more trials into paying members",
      },
      {
        title: "Churn-risk detection & win-back flow",
        description:
          "Flag members with declining check-ins and trigger a personalized re-engagement message automatically.",
        priority: "High",
        difficulty: "Medium",
        hoursSavedPerMonth: 8,
        impact: "Directly reduces membership churn",
      },
      {
        title: "AI booking assistant for classes",
        description:
          "Chatbot/SMS assistant that lets members book, cancel, or check class schedules without calling staff.",
        priority: "Medium",
        difficulty: "Medium",
        hoursSavedPerMonth: 12,
        impact: "Reduces front-desk workload and no-shows",
      },
      {
        title: "Automated billing & renewal reminders",
        description:
          "Send renewal notices and failed-payment recovery messages automatically before revenue is lost.",
        priority: "Medium",
        difficulty: "Easy",
        hoursSavedPerMonth: 5,
        impact: "Reduces involuntary churn from failed payments",
      },
      {
        title: "Referral & review automation",
        description:
          "Prompt engaged members for referrals and Google reviews at the right moments (after a PR, milestone, etc.).",
        priority: "Low",
        difficulty: "Easy",
        hoursSavedPerMonth: 4,
        impact: "Grows organic lead flow at near-zero cost",
      },
      {
        title: "Coach admin automation",
        description:
          "Automate session reminders and program check-ins so coaches spend more time coaching, less on logistics.",
        priority: "Low",
        difficulty: "Medium",
        hoursSavedPerMonth: 6,
        impact: "Improves coach capacity without new hires",
      },
    ],
    roi: {
      monthlyHoursSaved: 38,
      hourlyValue: 28,
      implementationPriceLow: 1200,
      implementationPriceHigh: 2800,
      monthlyRetainer: 350,
    },
  },

  iptv: {
    summary: (name) =>
      `${name} likely operates a subscription-based IPTV/OTT service where support volume, churn, and payment friction scale faster than the team can handle manually. High-volume Telegram/WhatsApp support and manual renewal tracking are typical bottlenecks in this niche.`,
    problems: [
      {
        title: "Manual support at scale",
        detail:
          "Telegram/WhatsApp support is handled by hand, causing slow response times as subscribers grow.",
      },
      {
        title: "Untracked renewals",
        detail:
          "Subscription renewals and payment reminders are tracked manually or not at all.",
      },
      {
        title: "No subscriber onboarding",
        detail:
          "New subscribers get no automated device setup or app installation instructions.",
      },
      {
        title: "Expired users not re-targeted",
        detail:
          "Churned and expired customers aren't systematically approached with win-back offers.",
      },
      {
        title: "Spreadsheet reseller payouts",
        detail:
          "Reseller and affiliate payouts are reconciled manually in spreadsheets.",
      },
      {
        title: "Repeat troubleshooting questions",
        detail:
          "Buffering, activation, and device questions repeat constantly across support channels.",
      },
    ],
    opportunities: [
      {
        title: "AI support chatbot (Telegram/WhatsApp)",
        description:
          "Automatically answers the top recurring support questions (activation, buffering, device setup) instantly, 24/7.",
        priority: "High",
        difficulty: "Medium",
        hoursSavedPerMonth: 25,
        impact: "Cuts support load dramatically as subscriber count scales",
      },
      {
        title: "Automated renewal & payment reminders",
        description:
          "Notify subscribers before expiry with a one-click renewal link, reducing manual chasing.",
        priority: "High",
        difficulty: "Easy",
        hoursSavedPerMonth: 15,
        impact: "Directly reduces involuntary churn and lost recurring revenue",
      },
      {
        title: "Automated onboarding sequence",
        description:
          "New subscribers automatically receive setup guides and activation steps per device (Smart TV, MAG, Android, etc.).",
        priority: "Medium",
        difficulty: "Easy",
        hoursSavedPerMonth: 10,
        impact: "Fewer support tickets from confused new customers",
      },
      {
        title: "Churn win-back automation",
        description:
          "Automatically message expired subscribers with a limited-time reactivation discount.",
        priority: "Medium",
        difficulty: "Medium",
        hoursSavedPerMonth: 8,
        impact: "Recovers revenue from customers who would otherwise be lost",
      },
      {
        title: "Reseller/affiliate tracking automation",
        description:
          "Automate commission calculation and payout tracking instead of manual spreadsheet reconciliation.",
        priority: "Medium",
        difficulty: "Hard",
        hoursSavedPerMonth: 10,
        impact: "Reduces errors and admin time as the reseller network grows",
      },
      {
        title: "FAQ/knowledge base auto-responder",
        description:
          "Deflect the most repeated questions with an instant automated reply before a human is looped in.",
        priority: "Low",
        difficulty: "Easy",
        hoursSavedPerMonth: 6,
        impact: "Frees support staff for complex/escalated issues",
      },
    ],
    roi: {
      monthlyHoursSaved: 55,
      hourlyValue: 25,
      implementationPriceLow: 1500,
      implementationPriceHigh: 4000,
      monthlyRetainer: 450,
    },
  },

  ecommerce: {
    summary: (name) =>
      `${name} likely runs lean with a small team handling customer service, order issues, and marketing simultaneously. The biggest wins are typically in automating repetitive support questions, abandoned cart recovery, and post-purchase follow-up.`,
    problems: [
      {
        title: "Manual order-status support",
        detail:
          "Emails and DMs about order status and returns are answered one by one.",
      },
      {
        title: "Abandoned carts ignored",
        detail:
          "Abandoned checkouts get no systematic recovery follow-up, leaving revenue on the table.",
      },
      {
        title: "No post-purchase flow",
        detail:
          "Review requests and upsells after delivery are inconsistent or missing entirely.",
      },
      {
        title: "Manual inventory sync",
        detail:
          "Stock-level updates across sales channels are manual and error-prone.",
      },
      {
        title: "No customer segmentation",
        detail:
          "Repeat customers and one-time buyers get the same generic email marketing.",
      },
      {
        title: "Repetitive product FAQs",
        detail:
          "Sizing, shipping, and product questions repeat constantly in support inboxes.",
      },
    ],
    opportunities: [
      {
        title: "AI customer support assistant",
        description:
          "Automatically answers order status, returns, and shipping questions across email/chat, escalating only complex cases.",
        priority: "High",
        difficulty: "Medium",
        hoursSavedPerMonth: 20,
        impact: "Cuts support workload without hiring",
      },
      {
        title: "Abandoned cart recovery automation",
        description:
          "Triggered email/SMS sequence recovers a percentage of abandoned checkouts automatically.",
        priority: "High",
        difficulty: "Easy",
        hoursSavedPerMonth: 6,
        impact: "Directly recovers lost revenue with no extra ad spend",
      },
      {
        title: "Post-purchase review & upsell flow",
        description:
          "Automatically request reviews and suggest relevant add-ons after delivery.",
        priority: "Medium",
        difficulty: "Easy",
        hoursSavedPerMonth: 5,
        impact: "Increases average order value and review volume",
      },
      {
        title: "Inventory sync automation",
        description:
          "Keep stock levels synced automatically across storefront and marketplaces to prevent overselling.",
        priority: "Medium",
        difficulty: "Hard",
        hoursSavedPerMonth: 10,
        impact: "Reduces costly stockout/oversell errors",
      },
      {
        title: "Customer segmentation & win-back emails",
        description:
          "Automatically segment buyers and send targeted win-back campaigns to lapsed customers.",
        priority: "Medium",
        difficulty: "Medium",
        hoursSavedPerMonth: 8,
        impact: "Increases repeat purchase rate",
      },
      {
        title: "FAQ chatbot for product questions",
        description:
          "Deflect repetitive sizing/shipping/product questions instantly on the storefront.",
        priority: "Low",
        difficulty: "Easy",
        hoursSavedPerMonth: 6,
        impact: "Improves conversion rate by answering pre-purchase questions instantly",
      },
    ],
    roi: {
      monthlyHoursSaved: 42,
      hourlyValue: 27,
      implementationPriceLow: 1300,
      implementationPriceHigh: 3200,
      monthlyRetainer: 380,
    },
  },
};
