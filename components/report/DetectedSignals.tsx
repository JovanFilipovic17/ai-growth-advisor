import { DetectedSignal } from "@/lib/types";
import Panel from "../Panel";

function relevanceFor(weight: number): { label: string; className: string } {
  if (weight >= 3)
    return {
      label: "High relevance",
      className: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    };
  if (weight >= 2)
    return {
      label: "Medium relevance",
      className: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    };
  return {
    label: "Noted",
    className: "border-edge-strong bg-surface-raised text-slate-400",
  };
}

export default function DetectedSignals({
  signals,
}: {
  signals: DetectedSignal[];
}) {
  if (signals.length === 0) return null;

  return (
    <Panel
      title="Detected Signals"
      description="Extracted from the owner's notes and used to re-rank this report."
    >
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((signal) => {
          const relevance = relevanceFor(signal.weight);
          return (
            <div
              key={signal.id}
              className="rounded-lg border border-edge bg-surface-raised/50 px-3 py-2.5"
            >
              <p className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-200">
                {signal.label}
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${relevance.className}`}
                >
                  {relevance.label}
                </span>
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Matched: &ldquo;{signal.evidence}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
