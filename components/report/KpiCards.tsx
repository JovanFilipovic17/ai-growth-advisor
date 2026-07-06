import { ReportData, RoiEstimate } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { CARD_CLASS, LABEL_CLASS } from "../cardStyles";
import ScoreRing from "../ScoreRing";

function IconBadge({
  path,
  className,
}: {
  path: string;
  className: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 flex-none items-center justify-center rounded-md ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path
          d={path}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const ICONS = {
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 13a1 1 0 100-2 1 1 0 000 2z",
  trendUp: "M3 17l6-6 4 4 8-9M15 6h6v6",
  alertTriangle:
    "M12 9v3.75m0 3h.008M10.29 3.86L2.7 16.15c-.87 1.5.22 3.35 1.95 3.35h14.7c1.73 0 2.81-1.85 1.95-3.35L13.71 3.86a2.25 2.25 0 00-3.42 0z",
  layers: "M12 3l9 4.5-9 4.5-9-4.5 9-4.5zM3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5",
  bolt: "M13.5 3L4.5 13.5h6L10.5 21l9-10.5h-6L13.5 3z",
};

interface KpiCardsProps {
  report: ReportData;
  roi: RoiEstimate;
}

export default function KpiCards({ report, roi }: KpiCardsProps) {
  return (
    <div
      id="overview"
      className="grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    >
      <div className={`${CARD_CLASS} flex items-center gap-3`}>
        <div className="flex-none">
          <ScoreRing score={report.opportunityScore} />
        </div>
        <div className="min-w-0">
          <p className={`${LABEL_CLASS} flex items-center gap-1.5`}>
            <IconBadge path={ICONS.target} className="bg-emerald-500/10 text-emerald-400" />
            AI Opportunity Score
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-100">
            {report.opportunityScore}
            <span className="text-sm font-medium text-slate-500">/100</span>
          </p>
          <p className="text-xs text-slate-400">{report.scoreLabel}</p>
        </div>
      </div>

      <div className={CARD_CLASS}>
        <p className={`${LABEL_CLASS} flex items-center gap-1.5`}>
          <IconBadge path={ICONS.trendUp} className="bg-emerald-500/10 text-emerald-400" />
          Estimated Monthly Savings
        </p>
        <p className="mt-2 text-2xl font-bold text-emerald-400">
          {formatCurrency(roi.estimatedMonthlyValue)}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          ≈ {roi.monthlyHoursSaved} staff hours recovered / mo
        </p>
      </div>

      <div
        className={`${CARD_CLASS} border-rose-500/25 shadow-[0_0_32px_-14px_rgba(244,63,94,0.4),inset_0_1px_0_rgba(148,163,184,0.07)]`}
      >
        <p className={`${LABEL_CLASS} flex items-center gap-1.5`}>
          <IconBadge path={ICONS.alertTriangle} className="bg-rose-500/10 text-rose-400" />
          Revenue Leak Detected
        </p>
        <p className="mt-2 text-2xl font-bold text-rose-400">
          {formatCurrency(report.revenueLeak)}
          <span className="text-sm font-medium text-slate-500">/mo</span>
        </p>
        <p className="mt-1 text-xs text-rose-400/80">Due to inefficiencies</p>
      </div>

      <div className={CARD_CLASS}>
        <p className={`${LABEL_CLASS} flex items-center gap-1.5`}>
          <IconBadge path={ICONS.layers} className="bg-blue-500/10 text-blue-400" />
          Implementation Complexity
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-100">
          {report.complexity}
        </p>
        <p className="mt-1 text-xs text-slate-400">{report.complexityNote}</p>
      </div>

      <div className={CARD_CLASS}>
        <p className={`${LABEL_CLASS} flex items-center gap-1.5`}>
          <IconBadge path={ICONS.bolt} className="bg-amber-500/10 text-amber-400" />
          Quick Win Potential
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-100">
          {report.quickWinPotential}
        </p>
        <p className="mt-1 text-xs text-slate-400">{report.quickWinNote}</p>
      </div>
    </div>
  );
}
