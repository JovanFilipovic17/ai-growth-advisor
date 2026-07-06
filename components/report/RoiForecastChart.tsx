import { RoiForecastPoint } from "@/lib/types";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import Panel from "../Panel";

const W = 640;
const H = 230;
const PAD = { left: 52, right: 16, top: 16, bottom: 30 };

interface RoiForecastChartProps {
  forecast: RoiForecastPoint[];
  breakEvenMonth: number;
  monthlySavings: number;
  projectedSixMonthRoi: number;
  /** Draws a dashed rose baseline at the current monthly revenue leakage. */
  leakBaseline?: number;
  title?: string;
  description?: string;
}

export default function RoiForecastChart({
  forecast,
  breakEvenMonth,
  monthlySavings,
  projectedSixMonthRoi,
  leakBaseline,
  title = "ROI Forecast (6-Month Projection)",
  description = "Cumulative net return after the one-time implementation cost.",
}: RoiForecastChartProps) {
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const minV = Math.min(0, forecast[0].cumulativeNet);
  const maxV = Math.max(
    forecast[forecast.length - 1].cumulativeNet,
    monthlySavings,
    leakBaseline ?? 0
  );
  const slot = innerW / forecast.length;

  const x = (month: number) => PAD.left + (month - 0.5) * slot;
  const y = (v: number) => PAD.top + innerH - ((v - minV) / (maxV - minV)) * innerH;

  const linePoints = forecast
    .map((p) => `${x(p.month)},${y(p.cumulativeNet)}`)
    .join(" ");
  const breakEvenPoint = forecast[breakEvenMonth - 1];
  const barWidth = Math.min(36, slot * 0.5);

  return (
    <Panel
      id="roi"
      title={title}
      description={description}
      action={
        <p className="text-sm font-semibold text-emerald-400">
          {formatCurrency(projectedSixMonthRoi)}{" "}
          <span className="font-medium text-slate-400">Projected ROI</span>
        </p>
      }
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`ROI forecast chart: cumulative net return grows to ${formatCurrency(projectedSixMonthRoi)} by month 6, breaking even in month ${breakEvenMonth}.`}
        className="mt-4 w-full"
      >
        {/* horizontal gridlines at min, zero, max */}
        {[minV, 0, maxV].map((v) => (
          <g key={v}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(v)}
              y2={y(v)}
              strokeDasharray={v === 0 ? "4 4" : undefined}
              className={v === 0 ? "stroke-slate-600" : "stroke-slate-800"}
            />
            <text
              x={PAD.left - 8}
              y={y(v) + 3}
              textAnchor="end"
              className="fill-slate-500 text-[10px]"
            >
              {formatCompactCurrency(v)}
            </text>
          </g>
        ))}

        {/* current leakage baseline */}
        {leakBaseline !== undefined && (
          <g>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(leakBaseline)}
              y2={y(leakBaseline)}
              strokeDasharray="5 4"
              strokeWidth="1.4"
              className="stroke-rose-500/60"
            />
            <text
              x={PAD.left + 6}
              y={y(leakBaseline) - 5}
              className="fill-rose-400 text-[10px] font-medium"
            >
              Current Leakage Baseline
            </text>
          </g>
        )}

        {/* monthly savings bars */}
        {forecast.map((p) => (
          <rect
            key={p.month}
            x={x(p.month) - barWidth / 2}
            y={y(monthlySavings)}
            width={barWidth}
            height={Math.max(0, y(0) - y(monthlySavings))}
            rx="3"
            className="fill-blue-500/25"
          />
        ))}

        {/* area fill under cumulative ROI line */}
        <defs>
          <linearGradient id="roiArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${linePoints} ${x(forecast[forecast.length - 1].month)},${PAD.top + innerH} ${x(forecast[0].month)},${PAD.top + innerH}`}
          fill="url(#roiArea)"
        />

        {/* cumulative net ROI line */}
        <polyline
          points={linePoints}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-emerald-400"
        />
        {forecast.map((p) => (
          <circle
            key={p.month}
            cx={x(p.month)}
            cy={y(p.cumulativeNet)}
            r="3.5"
            className="fill-emerald-400"
          />
        ))}

        {/* break-even marker */}
        <g>
          <circle
            cx={x(breakEvenPoint.month)}
            cy={y(breakEvenPoint.cumulativeNet)}
            r="6"
            fill="none"
            strokeWidth="2"
            className="stroke-emerald-300"
          />
          <rect
            x={x(breakEvenPoint.month) - 42}
            y={y(breakEvenPoint.cumulativeNet) - 30}
            width="84"
            height="17"
            rx="8.5"
            className="fill-emerald-500/15 stroke-emerald-500/40"
          />
          <text
            x={x(breakEvenPoint.month)}
            y={y(breakEvenPoint.cumulativeNet) - 18}
            textAnchor="middle"
            className="fill-emerald-300 text-[10px] font-medium"
          >
            Break-even Point
          </text>
        </g>

        {/* month labels */}
        {forecast.map((p) => (
          <text
            key={p.month}
            x={x(p.month)}
            y={H - 8}
            textAnchor="middle"
            className="fill-slate-500 text-[10px]"
          >
            Month {p.month}
          </text>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-0.5 w-4 rounded bg-emerald-400" />
          Cumulative net ROI
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-blue-500/40" />
          Monthly recovered capacity ({formatCurrency(monthlySavings)}/mo)
        </span>
        {leakBaseline !== undefined && (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-0.5 w-4 rounded border-t-2 border-dashed border-rose-500/70"
            />
            Current leakage baseline ({formatCurrency(leakBaseline)}/mo)
          </span>
        )}
      </div>
    </Panel>
  );
}
