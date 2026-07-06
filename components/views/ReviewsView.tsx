import { memo, useMemo } from "react";
import { AnalysisResult, ComplexityLevel, Priority } from "@/lib/types";
import {
  buildReviewIntelligence,
  ReviewSample,
  SentimentTone,
} from "@/lib/reviewIntelligence";
import { formatCurrency } from "@/lib/format";
import Panel from "../Panel";
import AiInsightPanel from "../report/AiInsightPanel";
import { CARD_CLASS, LABEL_CLASS } from "../cardStyles";

const LEVEL_TEXT: Record<ComplexityLevel, string> = {
  Low: "text-emerald-400",
  Medium: "text-amber-400",
  High: "text-rose-400",
};

const PRIORITY_TEXT: Record<Priority, string> = {
  High: "text-rose-400",
  Medium: "text-amber-400",
  Low: "text-emerald-400",
};

const THEME_STYLES: Record<SentimentTone, string> = {
  positive: "border-emerald-500/25",
  negative: "border-rose-500/25",
  neutral: "border-amber-500/25",
};

const SAMPLE_HEADER: Record<ReviewSample["kind"], string> = {
  Positive: "text-emerald-400",
  Negative: "text-rose-400",
  Neutral: "text-amber-400",
};

const STAR_INDEXES = [0, 1, 2, 3, 4];

const Stars = memo(function Stars({ filled }: { filled: number }) {
  return (
    <span aria-label={`${filled} out of 5 stars`} className="text-sm tracking-tight">
      {STAR_INDEXES.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < filled ? "text-amber-400" : "text-slate-600"}
        >
          ★
        </span>
      ))}
    </span>
  );
});

function ReviewsView({ result }: { result: AnalysisResult }) {
  const intel = useMemo(() => buildReviewIntelligence(result), [result]);
  const { sentiment } = intel;

  const kpis = useMemo(
    () => [
      {
        label: "Google Rating",
        value: intel.rating.toFixed(1),
        tone: "text-blue-300",
      },
      {
        label: "Total Reviews",
        value: String(intel.totalReviews),
        tone: "text-slate-100",
      },
      {
        label: "Sentiment Score",
        value: `${intel.sentimentScore}/100`,
        tone: "text-slate-100",
      },
      {
        label: "Response Rate",
        value: `${intel.responseRate}%`,
        tone: "text-slate-100",
      },
      {
        label: "Unanswered Negative Reviews",
        value: String(intel.unansweredNegative),
        tone: "text-rose-400",
      },
      {
        label: "Estimated Reputation Risk",
        value: intel.reputationRisk,
        tone: LEVEL_TEXT[intel.reputationRisk],
      },
    ],
    [
      intel.rating,
      intel.reputationRisk,
      intel.responseRate,
      intel.sentimentScore,
      intel.totalReviews,
      intel.unansweredNegative,
    ]
  );

  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
            Review Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Customer sentiment, reputation risks, and automation opportunities
            from public reviews of{" "}
            <span className="font-medium text-slate-200">{result.companyName}</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-6">
          {kpis.map((kpi) => (
            <div key={kpi.label} className={CARD_CLASS}>
              <p className={LABEL_CLASS}>{kpi.label}</p>
              <p className={`mt-2 text-xl font-bold ${kpi.tone}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Panel title="Sentiment Breakdown">
            <div className="mt-4 flex h-7 overflow-hidden rounded-lg">
              <div
                style={{ width: `${sentiment.positive}%` }}
                className="flex items-center justify-center bg-emerald-500/80 text-[11px] font-semibold text-emerald-950"
              >
                {sentiment.positive}%
              </div>
              <div
                style={{ width: `${sentiment.neutral}%` }}
                className="flex items-center justify-center bg-amber-500/80 text-[11px] font-semibold text-amber-950"
              >
                {sentiment.neutral}%
              </div>
              <div
                style={{ width: `${sentiment.negative}%` }}
                className="flex items-center justify-center bg-rose-500/80 text-[11px] font-semibold text-rose-950"
              >
                {sentiment.negative}%
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-emerald-500/80" />
                Positive: {sentiment.positive}%
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-amber-500/80" />
                Neutral: {sentiment.neutral}%
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-rose-500/80" />
                Negative: {sentiment.negative}%
              </span>
            </div>
          </Panel>

          <Panel title="Common Customer Themes">
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {intel.themes.map((theme) => (
                <div
                  key={theme.label}
                  className={`rounded-lg border bg-surface-raised/50 px-3 py-2.5 ${THEME_STYLES[theme.tone]}`}
                >
                  <p className="text-xs font-semibold text-slate-200">{theme.label}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{theme.meta}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <section>
          <h2 className="text-base font-semibold text-slate-100">
            Review Response Analysis
          </h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-edge bg-surface-panel shadow-panel">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-edge bg-slate-950/40 text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="px-4 py-2.5 font-medium">Review Type</th>
                  <th scope="col" className="px-3 py-2.5 font-medium">Count</th>
                  <th scope="col" className="px-3 py-2.5 font-medium">Response Rate</th>
                  <th scope="col" className="px-3 py-2.5 font-medium">Risk Level</th>
                  <th scope="col" className="px-3 py-2.5 font-medium">Suggested Automation</th>
                </tr>
              </thead>
              <tbody>
                {intel.responseRows.map((row) => (
                  <tr key={row.type} className="border-b border-edge last:border-0">
                    <td className="px-4 py-2.5 font-medium text-slate-100">{row.type}</td>
                    <td className="px-3 py-2.5 text-slate-300">{row.count}</td>
                    <td className="px-3 py-2.5 text-slate-300">{row.responseRate}</td>
                    <td className={`px-3 py-2.5 font-medium ${LEVEL_TEXT[row.risk]}`}>
                      {row.risk}
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{row.automation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-100">
            AI Recommendations
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {intel.recommendations.map((rec) => (
              <div
                key={rec.title}
                className="rounded-xl border border-edge bg-surface-raised p-4 shadow-panel"
              >
                <p className="text-sm font-semibold text-slate-100">{rec.title}</p>
                <dl className="mt-2 space-y-1 text-[11px] text-slate-400">
                  <div>
                    Priority:{" "}
                    <span className={`font-medium ${PRIORITY_TEXT[rec.priority]}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <div>
                    Est. impact:{" "}
                    <span className="font-medium text-emerald-400">
                      {formatCurrency(rec.impactPerMonth)}/mo
                    </span>
                  </div>
                  <div>
                    Complexity:{" "}
                    <span className={`font-medium ${LEVEL_TEXT[rec.complexity]}`}>
                      {rec.complexity}
                    </span>
                  </div>
                  <div>{rec.time}</div>
                </dl>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right rail: sample reviews */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {intel.samples.map((sample) => (
            <div
              key={sample.kind}
              className="rounded-xl border border-edge bg-surface-panel p-4 shadow-panel"
            >
              <p className={`text-sm font-semibold ${SAMPLE_HEADER[sample.kind]}`}>
                {sample.kind} Review
              </p>
              <div className="mt-1">
                <Stars filled={sample.stars} />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                &ldquo;{sample.text}&rdquo;
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                <span className="font-medium text-slate-300">AI Analysis:</span>{" "}
                {sample.analysis}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                <span className="font-medium text-slate-300">Suggested Reply:</span>{" "}
                {sample.reply}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                <span className="font-medium text-slate-300">Urgency:</span>{" "}
                <span className={`font-medium ${LEVEL_TEXT[sample.urgency]}`}>
                  {sample.urgency}
                </span>
              </p>
            </div>
          ))}
        </div>

        <AiInsightPanel insight={intel.insight} lead="" />
      </div>
    </div>
  );
}

export default memo(ReviewsView);
