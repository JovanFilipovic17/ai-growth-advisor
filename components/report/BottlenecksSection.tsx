import { Bottleneck, Priority } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

const SEVERITY_STYLES: Record<Priority, string> = {
  High: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  Medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Low: "border-edge-strong bg-surface-raised text-slate-400",
};

export default function BottlenecksSection({
  bottlenecks,
}: {
  bottlenecks: Bottleneck[];
}) {
  return (
    <section id="bottlenecks" className="scroll-mt-24">
      <h2 className="text-base font-semibold text-slate-100">
        Business Bottlenecks
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        {bottlenecks.map((b) => (
          <div
            key={b.title}
            className="flex flex-col gap-2 rounded-xl border border-edge bg-surface-raised p-4 shadow-panel"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-100">{b.title}</h3>
              <span
                className={`flex-none rounded-full border px-2 py-0.5 text-[11px] font-medium ${SEVERITY_STYLES[b.severity]}`}
              >
                {b.severity}
              </span>
            </div>
            <p className="text-xs font-medium text-rose-400">
              Estimated impact: {formatCurrency(b.impactPerMonth)}/mo
            </p>
            <p className="text-xs leading-relaxed text-slate-400">{b.detail}</p>
            <p className="mt-auto border-t border-edge pt-2 text-xs text-slate-300">
              <span className="font-semibold text-slate-200">Fix:</span> {b.fix}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
