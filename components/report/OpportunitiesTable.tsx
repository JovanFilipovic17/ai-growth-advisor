import { Difficulty, Opportunity, Priority } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

const PRIORITY_STYLES: Record<Priority, string> = {
  High: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  Medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Low: "border-edge-strong bg-surface-raised text-slate-400",
};

const IMPL_TIME: Record<Difficulty, string> = {
  Easy: "1 week",
  Medium: "2–3 weeks",
  Hard: "4–6 weeks",
};

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  hourlyValue: number;
}

export default function OpportunitiesTable({
  opportunities,
  hourlyValue,
}: OpportunitiesTableProps) {
  return (
    <section id="opportunities" className="flex scroll-mt-24 flex-col">
      <h2 className="text-base font-semibold text-slate-100">
        AI Automation Opportunities
      </h2>
      <div className="mt-3 flex-1 overflow-x-auto rounded-xl border border-edge bg-surface-panel shadow-panel">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-edge bg-slate-950/40 text-xs uppercase tracking-wide text-slate-500">
              <th scope="col" className="px-4 py-2.5 font-medium">
                Recommendation
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Priority
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Impl. time
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Value est.
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Confidence
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp, i) => {
              const valueEst =
                Math.round((opp.hoursSavedPerMonth * hourlyValue) / 10) * 10;
              const confidence = Math.max(80, 96 - i * 3);
              return (
                <tr
                  key={opp.title}
                  className="border-b border-edge last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-100">
                      {i + 1}. {opp.title}
                    </p>
                    <p className="mt-0.5 max-w-md text-xs text-slate-500">
                      {opp.description}
                    </p>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${PRIORITY_STYLES[opp.priority]}`}
                    >
                      {opp.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-300">
                    {IMPL_TIME[opp.difficulty]}
                  </td>
                  <td className="px-3 py-3 font-medium text-emerald-400">
                    {formatCurrency(valueEst)}/mo
                  </td>
                  <td className="px-3 py-3 text-slate-300">{confidence}%</td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Roadmap feature — detail drill-down ships in a later phase"
                      className="inline-flex cursor-not-allowed items-center gap-1 rounded-md border border-edge bg-surface-raised/50 px-2.5 py-1 text-[11px] font-medium text-slate-500"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="h-3 w-3"
                      >
                        <path
                          d="M7.5 10.5V7.5a4.5 4.5 0 119 0v3M6 10.5h12a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 19.5V12A1.5 1.5 0 016 10.5z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
