import {
  Bottleneck,
  ComplexityLevel,
  DetectedSignal,
  Difficulty,
  Opportunity,
  Priority,
  Problem,
  ReportData,
  RoiEstimate,
  RoiForecastPoint,
} from "./types";
import { formatCurrency } from "./format";
import { signalPhrase, totalSignalWeight } from "./signals";

const PRIORITY_WEIGHT: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };
const DIFFICULTY_WEIGHT: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };

const FORECAST_MONTHS = 6;

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function scoreLabelFor(score: number): string {
  if (score >= 85) return "Exceptional potential";
  if (score >= 75) return "Excellent potential";
  if (score >= 60) return "Strong potential";
  return "Moderate potential";
}

function complexityFor(opportunities: Opportunity[]): {
  complexity: ComplexityLevel;
  complexityNote: string;
} {
  const top = opportunities.slice(0, 4);
  const avg =
    top.reduce((sum, o) => sum + DIFFICULTY_WEIGHT[o.difficulty], 0) / top.length;
  if (avg < 1.6) return { complexity: "Low", complexityNote: "Approx. 2–4 weeks" };
  if (avg < 2.3) return { complexity: "Medium", complexityNote: "Approx. 4–6 weeks" };
  return { complexity: "High", complexityNote: "Approx. 6–10 weeks" };
}

function quickWinFor(opportunities: Opportunity[]): {
  quickWinPotential: ComplexityLevel;
  quickWinNote: string;
} {
  const hasHighEasy = opportunities.some(
    (o) => o.priority === "High" && o.difficulty === "Easy"
  );
  if (hasHighEasy) {
    return { quickWinPotential: "High", quickWinNote: "Immediate ROI impact" };
  }
  const hasEasy = opportunities.some((o) => o.difficulty === "Easy");
  if (hasEasy) {
    return { quickWinPotential: "Medium", quickWinNote: "Fast initial wins available" };
  }
  return { quickWinPotential: "Low", quickWinNote: "Longer ramp-up expected" };
}

/**
 * Derives the dashboard report from the mock analysis inputs.
 * All values are deterministic arithmetic on the industry profile —
 * no external data involved.
 */
export function buildReport(
  problems: Problem[],
  opportunities: Opportunity[],
  roi: RoiEstimate,
  signals: DetectedSignal[] = []
): ReportData {
  // Owner-confirmed signals raise confidence in the upside estimate.
  const signalBonus = Math.min(8, totalSignalWeight(signals));
  const opportunityScore = Math.min(
    96,
    Math.max(40, Math.round(50 + roi.monthlyHoursSaved * 0.7) + signalBonus)
  );

  const bottlenecks: Bottleneck[] = problems.slice(0, 4).map((problem, i) => {
    const opp = opportunities[i] ?? opportunities[0];
    return {
      title: problem.title,
      detail: problem.detail,
      fix: opp.title,
      severity: opp.priority,
      impactPerMonth: roundTo(opp.hoursSavedPerMonth * roi.hourlyValue * 2.2, 50),
    };
  });

  const revenueLeak = bottlenecks.reduce((sum, b) => sum + b.impactPerMonth, 0);

  const implementationMid = Math.round(
    (roi.implementationPriceLow + roi.implementationPriceHigh) / 2
  );
  const monthlySavings = roi.estimatedMonthlyValue;

  const forecast: RoiForecastPoint[] = Array.from(
    { length: FORECAST_MONTHS },
    (_, i) => ({
      month: i + 1,
      cumulativeNet: monthlySavings * (i + 1) - implementationMid,
    })
  );
  const breakEvenMonth = Math.min(
    FORECAST_MONTHS,
    Math.max(1, Math.ceil(implementationMid / monthlySavings))
  );
  const projectedSixMonthRoi = monthlySavings * FORECAST_MONTHS - implementationMid;

  const quickWins = [...opportunities]
    .sort(
      (a, b) =>
        DIFFICULTY_WEIGHT[a.difficulty] * 2 +
        PRIORITY_WEIGHT[a.priority] -
        (DIFFICULTY_WEIGHT[b.difficulty] * 2 + PRIORITY_WEIGHT[b.priority])
    )
    .slice(0, 2);
  const quickWinPair = `${quickWins[0].title.toLowerCase()} and ${quickWins[1].title.toLowerCase()}`;

  const insight =
    signals.length > 0
      ? `Start with ${quickWinPair} — your notes independently surface ${signalPhrase(
          signals
        )}, which is exactly what these builds attack. At ${formatCurrency(
          monthlySavings
        )}/mo in recovered capacity the engagement breaks even around month ${breakEvenMonth}, and every owner-confirmed signal makes that estimate more certain, not less.`
      : `Start with ${quickWinPair} — the lowest-complexity builds on this roadmap with immediate time savings. At ${formatCurrency(
          monthlySavings
        )}/mo in recovered capacity, the engagement breaks even around month ${breakEvenMonth} and compounds from there.`;

  return {
    opportunityScore,
    scoreLabel: scoreLabelFor(opportunityScore),
    quickWinPair,
    revenueLeak,
    ...complexityFor(opportunities),
    ...quickWinFor(opportunities),
    bottlenecks,
    forecast,
    breakEvenMonth,
    projectedSixMonthRoi,
    insight,
  };
}
