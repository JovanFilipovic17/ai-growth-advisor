import { AnalysisResult, Difficulty } from "@/lib/types";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import Panel from "../Panel";
import RoiForecastChart from "../report/RoiForecastChart";
import AiInsightPanel from "../report/AiInsightPanel";
import { CARD_CLASS, LABEL_CLASS } from "../cardStyles";

const COMPLEXITY_LABEL: Record<Difficulty, string> = {
  Easy: "Low",
  Medium: "Medium",
  Hard: "High",
};

const COMPLEXITY_STYLES: Record<Difficulty, string> = {
  Easy: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Hard: "border-rose-500/30 bg-rose-500/10 text-rose-400",
};

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export default function RoiForecastView({ result }: { result: AnalysisResult }) {
  const { report, roi, companyName, opportunities } = result;

  const implementationMid = Math.round(
    (roi.implementationPriceLow + roi.implementationPriceHigh) / 2
  );
  const monthly = roi.estimatedMonthlyValue;
  const breakEvenExact = (implementationMid / monthly).toFixed(1);
  const totalHours = opportunities.reduce(
    (sum, o) => sum + o.hoursSavedPerMonth,
    0
  );

  const stats = [
    {
      label: "Current Monthly Revenue Leakage",
      value: formatCurrency(report.revenueLeak),
      valueClass: "text-rose-400",
      note: "↓ Due to inefficiencies",
      noteClass: "text-rose-400/80",
      cardExtra:
        "border-rose-500/25 shadow-[0_0_32px_-14px_rgba(244,63,94,0.4),inset_0_1px_0_rgba(148,163,184,0.07)]",
    },
    {
      label: "Expected Monthly Recovery",
      value: formatCurrency(monthly),
      valueClass: "text-emerald-400",
      note: `↑ ${roi.monthlyHoursSaved} staff hours recovered / mo`,
      noteClass: "text-emerald-400/80",
      cardExtra: "",
    },
    {
      label: "Implementation Cost",
      value: formatCurrency(implementationMid),
      valueClass: "text-slate-100",
      note: `Range ${formatCurrency(roi.implementationPriceLow)}–${formatCurrency(roi.implementationPriceHigh)}`,
      noteClass: "text-slate-400",
      cardExtra: "",
    },
    {
      label: "Break-even Point",
      value: `Month ${breakEvenExact}`,
      valueClass: "text-slate-100",
      note: "At realistic recovery rate",
      noteClass: "text-slate-400",
      cardExtra: "",
    },
    {
      label: "6-Month Projected ROI",
      value: formatCurrency(report.projectedSixMonthRoi),
      valueClass: "text-emerald-400",
      note: "Net of implementation cost",
      noteClass: "text-slate-400",
      cardExtra: "",
    },
  ];

  const scenarios = [
    {
      name: "Conservative",
      selected: false,
      detail: `Recover ${formatCurrency(Math.round(monthly * 0.7))}/mo`,
    },
    {
      name: "Realistic",
      selected: true,
      detail: `Recover ${formatCurrency(monthly)}/mo · Cost ${formatCompactCurrency(implementationMid)}`,
    },
    {
      name: "Aggressive",
      selected: false,
      detail: `ROI ${formatCompactCurrency(Math.round(report.projectedSixMonthRoi * 1.15))} · Conf. 78%`,
    },
  ];

  const assumptions = [
    { label: "Staff cost equivalent", value: `${formatCurrency(roi.hourlyValue)}/hr` },
    { label: "Recovered staff hours", value: `${roi.monthlyHoursSaved} hrs/mo` },
    { label: "Missed-opportunity multiplier", value: "2.2×" },
    {
      label: "Implementation range",
      value: `${formatCurrency(roi.implementationPriceLow)}–${formatCurrency(roi.implementationPriceHigh)}`,
    },
    { label: "Ongoing retainer", value: `${formatCurrency(roi.monthlyRetainer)}/mo` },
  ];

  const topTwo = report.insight.split(" — ")[0].replace(/^Start with /, "");
  const roiInsight = `Start with ${topTwo}. This combination has the fastest break-even and lowest implementation risk, and pays for itself by month ${report.breakEvenMonth}.`;

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
          ROI Forecast
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Projected savings, revenue recovery, implementation cost, and
          break-even timeline for{" "}
          <span className="font-medium text-slate-200">{companyName}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className={`${CARD_CLASS} ${stat.cardExtra}`}>
            <p className={LABEL_CLASS}>{stat.label}</p>
            <p className={`mt-2 text-2xl font-bold ${stat.valueClass}`}>
              {stat.value}
            </p>
            <p className={`mt-1 text-xs ${stat.noteClass}`}>{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-5">
          <RoiForecastChart
            forecast={report.forecast}
            breakEvenMonth={report.breakEvenMonth}
            monthlySavings={monthly}
            projectedSixMonthRoi={report.projectedSixMonthRoi}
            leakBaseline={report.revenueLeak}
            title="6-Month Financial Projection & Break-even Analysis"
            description="Cumulative net return vs. the current monthly revenue leakage."
          />

          <section className="flex flex-col">
            <h2 className="text-base font-semibold text-slate-100">
              Automation Value Breakdown
            </h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-edge bg-surface-panel shadow-panel">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-edge bg-slate-950/40 text-xs uppercase tracking-wide text-slate-500">
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      Automation
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-medium">
                      Monthly Value
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-medium">
                      Setup Cost
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-medium">
                      Complexity
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-medium">
                      Payback Period
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-medium">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opp, i) => {
                    const monthlyValue =
                      Math.round((opp.hoursSavedPerMonth * roi.hourlyValue) / 10) *
                      10;
                    const setupCost = Math.max(
                      100,
                      roundTo(
                        (implementationMid * opp.hoursSavedPerMonth) / totalHours,
                        50
                      )
                    );
                    const payback = (setupCost / monthlyValue).toFixed(1);
                    const confidence = Math.max(80, 96 - i * 3);
                    return (
                      <tr
                        key={opp.title}
                        className="border-b border-edge last:border-0"
                      >
                        <td className="px-4 py-3 font-medium text-slate-100">
                          {opp.title}
                        </td>
                        <td className="px-3 py-3 font-medium text-emerald-400">
                          {formatCurrency(monthlyValue)}/mo
                        </td>
                        <td className="px-3 py-3 text-slate-300">
                          {formatCurrency(setupCost)}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${COMPLEXITY_STYLES[opp.difficulty]}`}
                          >
                            {COMPLEXITY_LABEL[opp.difficulty]}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-300">{payback} mo</td>
                        <td className="px-3 py-3 text-slate-300">{confidence}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-5">
          <Panel title="Scenario Selector">
            <div className="mt-4 flex flex-col gap-2.5">
              {scenarios.map((s) => (
                <div
                  key={s.name}
                  title="Visual mock — scenario modeling ships in a later phase"
                  className={`cursor-not-allowed rounded-lg border p-3 ${
                    s.selected
                      ? "border-blue-500/60 bg-blue-500/10"
                      : "border-edge bg-surface-raised/50"
                  }`}
                >
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-100">
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${
                        s.selected
                          ? "border-blue-400 bg-blue-500 text-white"
                          : "border-edge-strong bg-transparent"
                      }`}
                    >
                      {s.selected ? "✓" : ""}
                    </span>
                    {s.name}
                  </p>
                  <p className="mt-1.5 pl-6 text-xs text-slate-400">{s.detail}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Key Cost Assumptions"
            action={<span className="text-xs font-medium text-slate-500">Realistic</span>}
          >
            <ul className="mt-4 space-y-2.5">
              {assumptions.map((a) => (
                <li
                  key={a.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-slate-400">{a.label}</span>
                  <span className="font-medium text-slate-200">{a.value}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <AiInsightPanel
            insight={roiInsight}
            lead="Recommended package:"
            actions={[
              "Add ROI to Proposal",
              "Export Financial Summary",
              "Generate Client-Friendly Explanation",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
