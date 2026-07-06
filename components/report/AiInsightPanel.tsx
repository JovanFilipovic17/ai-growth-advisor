import PlaceholderButton from "../PlaceholderButton";

interface AiInsightPanelProps {
  insight: string;
  /** Bold prefix before the insight text; pass "" to omit. */
  lead?: string;
  /** Placeholder action labels; pass [] to render no buttons. */
  actions?: string[];
}

export default function AiInsightPanel({
  insight,
  lead = "Recommended next move:",
  actions = ["Accept Recommendation", "Explore Options"],
}: AiInsightPanelProps) {
  return (
    <section
      aria-label="AI insight"
      className="rounded-xl border border-blue-400/30 bg-gradient-to-b from-blue-500/20 via-blue-900/10 to-transparent p-5 shadow-panel"
    >
      <div className="flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-4 w-4 text-blue-400"
        >
          <path
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-sm font-semibold text-slate-100">AI Insight</h2>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-300">
        {lead && (
          <>
            <span className="font-semibold text-slate-100">{lead}</span>{" "}
          </>
        )}
        {insight}
      </p>

      {actions.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {actions.map((label) => (
            <PlaceholderButton
              key={label}
              label={label}
              className="w-full text-xs"
            />
          ))}
        </div>
      )}
    </section>
  );
}
