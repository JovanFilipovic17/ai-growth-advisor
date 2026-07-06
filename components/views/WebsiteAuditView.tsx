import { memo, useMemo } from "react";
import { AnalysisResult, Priority } from "@/lib/types";
import {
  buildWebsiteAudit,
  AuditRating,
  RatingTone,
  FunnelTone,
} from "@/lib/websiteAudit";
import Panel from "../Panel";
import AiInsightPanel from "../report/AiInsightPanel";
import { CARD_CLASS, LABEL_CLASS } from "../cardStyles";
import ScoreRing from "../ScoreRing";

const TONE_TEXT: Record<RatingTone, string> = {
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
};

const SEVERITY_TEXT: Record<Priority, string> = {
  High: "text-rose-400",
  Medium: "text-amber-400",
  Low: "text-slate-400",
};

const FUNNEL_STYLES: Record<FunnelTone, { bar: string; pill: string }> = {
  slate: { bar: "bg-slate-600/50", pill: "bg-slate-700/70 text-slate-300" },
  amber: { bar: "bg-amber-500/25", pill: "bg-amber-500/15 text-amber-400" },
  rose: { bar: "bg-rose-500/25", pill: "bg-rose-500/15 text-rose-400" },
  emerald: { bar: "bg-emerald-500/25", pill: "bg-emerald-500/15 text-emerald-400" },
};

const IMPROVEMENT_ICONS = [
  // bot
  "M12 4v3m-5 3.5h10A1.5 1.5 0 0118.5 12v6a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 18v-6A1.5 1.5 0 017 10.5zM9.5 14.5h.01M14.5 14.5h.01M3 14v2m18-2v2",
  // chat + phone
  "M4.5 5.5h11A1.5 1.5 0 0117 7v6a1.5 1.5 0 01-1.5 1.5H9l-3.5 3v-3h-1A1.5 1.5 0 013 13V7a1.5 1.5 0 011.5-1.5zM19.5 9.5l1 1-2.5 2.5",
  // mail
  "M3.75 6.75h16.5v10.5H3.75zM3.75 7.5L12 13.5l8.25-6",
  // chat bubble
  "M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7a2.5 2.5 0 01-2.5 2.5H10l-4.5 4v-4h-1A2.5 2.5 0 014 13.5v-7z",
  // stars
  "M12 3l1.9 4.6 4.9.4-3.7 3.2 1.1 4.8L12 13.5 7.8 16l1.1-4.8L5.2 8l4.9-.4L12 3z",
];

const SITE_PREVIEW_WIDTHS = ["w-full", "w-10/12", "w-4/5"];

const RatingCard = memo(function RatingCard({
  label,
  rating,
}: {
  label: string;
  rating: AuditRating;
}) {
  return (
    <div className={CARD_CLASS}>
      <p className={LABEL_CLASS}>{label}</p>
      <p className={`mt-2 text-2xl font-bold ${TONE_TEXT[rating.tone]}`}>
        {rating.value}
      </p>
      <p className="mt-1 text-xs text-slate-400">{rating.note}</p>
    </div>
  );
});

const SitePreviewLines = memo(function SitePreviewLines({
  count,
}: {
  count: number;
}) {
  return (
    <div aria-hidden="true" className="space-y-1">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`h-1 rounded bg-slate-300 ${
            SITE_PREVIEW_WIDTHS[i % SITE_PREVIEW_WIDTHS.length]
          }`}
        />
      ))}
    </div>
  );
});

function WebsiteAuditView({ result }: { result: AnalysisResult }) {
  const audit = useMemo(() => buildWebsiteAudit(result), [result]);
  const siteLabel = result.websiteUrl || result.companyName;

  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
            Website Audit
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Conversion, trust, and automation analysis for{" "}
            <span className="font-medium text-slate-200">{siteLabel}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className={`${CARD_CLASS} flex items-center gap-3`}>
            <div className="flex-none">
              <ScoreRing score={audit.conversionScore} colorClass="stroke-blue-400" />
            </div>
            <div className="min-w-0">
              <p className={LABEL_CLASS}>Website Conversion Score</p>
              <p className="mt-1 text-2xl font-bold text-slate-100">
                {audit.conversionScore}
                <span className="text-sm font-medium text-slate-500">/100</span>
              </p>
              <p className="text-xs text-slate-400">{audit.scoreLabel}</p>
            </div>
          </div>
          <RatingCard label="Trust Signals" rating={audit.trustSignals} />
          <RatingCard label="Lead Capture Quality" rating={audit.leadCapture} />
          <RatingCard label="Mobile Experience" rating={audit.mobileExperience} />
          <RatingCard label="Automation Readiness" rating={audit.automationReadiness} />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Mock website preview */}
          <section
            aria-label="Website preview (mock)"
            className="rounded-xl border border-edge bg-surface-panel p-4 shadow-panel"
          >
            <div className="overflow-hidden rounded-lg border border-edge bg-white">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-2">
                <span className="truncate text-[10px] font-bold text-slate-800">
                  {result.companyName}
                </span>
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="hidden text-[8px] text-slate-500 sm:block">
                    Home · Reviews · About · Contact
                  </span>
                  <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[8px] font-semibold text-white">
                    {audit.ctaLabel}
                  </span>
                </div>
              </div>
              <div className="px-4 py-5">
                <p className="text-base font-bold leading-snug text-slate-900">
                  {result.companyName}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">{audit.tagline}</p>
                <span className="mt-2 inline-block rounded bg-blue-600 px-2 py-1 text-[9px] font-semibold text-white">
                  {audit.ctaLabel}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-200 px-3 py-3">
                {["Contact", "Services", "Booking"].map((col) => (
                  <div key={col} className="rounded border border-slate-200 p-2">
                    <p className="mb-1.5 text-[8px] font-bold text-slate-700">{col}</p>
                    <SitePreviewLines count={3} />
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Simulated page structure — no live crawling in demo mode.
            </p>
          </section>

          {/* Conversion funnel */}
          <Panel title="Conversion Funnel Analysis">
            <p className="mt-3 text-sm text-slate-400">
              Website Visit <span aria-hidden="true">→</span>{" "}
              <span className="text-slate-300">{audit.funnel[0].label}</span>
            </p>
            <div className="mt-4 space-y-3">
              {audit.funnel.map((step) => {
                const style = FUNNEL_STYLES[step.tone];
                return (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className="h-7 flex-1">
                      <div
                        style={{ width: `${Math.max(step.pct, 8)}%` }}
                        className={`mx-auto h-full rounded ${style.bar}`}
                      />
                    </div>
                    <span
                      className={`w-12 flex-none rounded px-1.5 py-0.5 text-center text-[11px] font-semibold ${style.pill}`}
                    >
                      {step.pct}%
                    </span>
                    <span className="w-40 flex-none text-xs text-slate-300">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Most visitors show intent but drop off before completing a
              request — automated follow-up recovers a share of these losses.
            </p>
          </Panel>
        </div>

        {/* Improvements */}
        <section>
          <h2 className="text-base font-semibold text-slate-100">
            Recommended Website Improvements
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {audit.improvements.map((improvement, i) => (
              <div
                key={improvement}
                className="flex flex-col gap-3 rounded-xl border border-edge bg-surface-raised p-4 shadow-panel"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d={IMPROVEMENT_ICONS[i % IMPROVEMENT_ICONS.length]}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-sm font-medium text-slate-200">{improvement}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right rail */}
      <div className="flex flex-col gap-5">
        <section aria-label="Key findings">
          <h2 className="text-base font-semibold text-slate-100">Key Findings</h2>
          <div className="mt-3 flex flex-col gap-3">
            {audit.findings.map((finding) => (
              <div
                key={finding.title}
                className="rounded-xl border border-edge bg-surface-panel p-4 shadow-panel"
              >
                <p className="text-sm font-semibold text-slate-100">
                  {finding.title}
                </p>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Severity:{" "}
                  <span className={`font-medium ${SEVERITY_TEXT[finding.severity]}`}>
                    {finding.severity}
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  <span className="font-medium text-slate-300">Business impact:</span>{" "}
                  {finding.impact}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  <span className="font-medium text-slate-300">Recommended fix:</span>{" "}
                  {finding.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        <AiInsightPanel insight={audit.insight} lead="" />
      </div>
    </div>
  );
}

export default memo(WebsiteAuditView);
