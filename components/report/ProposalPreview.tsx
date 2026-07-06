import PreviewSkeleton from "../PreviewSkeleton";

interface ProposalPreviewProps {
  companyName: string;
}

function MiniBars() {
  const heights = [35, 55, 45, 70, 90];
  return (
    <div aria-hidden="true" className="flex h-10 items-end gap-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className="w-3 rounded-sm bg-blue-500/70"
        />
      ))}
    </div>
  );
}

// White "paper" page thumbnail, like a PDF preview.
function PageThumb({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-edge bg-slate-100 p-4 shadow-panel">
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
        {heading}
      </p>
      {children}
    </div>
  );
}

export default function ProposalPreview({ companyName }: ProposalPreviewProps) {
  return (
    <section
      id="proposal"
      aria-label="Proposal preview"
      className="scroll-mt-24 rounded-xl border border-edge bg-surface-panel p-5 shadow-panel"
    >
      <h2 className="text-base font-semibold text-slate-100">Proposal Preview</h2>
      <p className="mt-1 text-xs text-slate-500">
        Auto-assembled from this report. Export ships in a later phase.
      </p>

      <div className="mt-4 space-y-3">
        {/* Cover page */}
        <div className="rounded-lg border border-blue-500/25 bg-gradient-to-br from-blue-600/35 via-slate-900 to-slate-950 p-4 shadow-panel">
          <span
            aria-hidden="true"
            className="mb-6 block h-2 w-2 rounded-full bg-blue-400"
          />
          <p className="text-sm font-bold leading-snug text-slate-100">
            AI Growth
            <br />
            Opportunity Proposal
          </p>
          <p className="mt-2 truncate text-[10px] text-slate-400">{companyName}</p>
        </div>

        <PageThumb heading="Executive Summary">
          <PreviewSkeleton count={5} />
        </PageThumb>

        <PageThumb heading="Recommended AI Automations">
          <PreviewSkeleton count={3} />
          <p className="mb-2 mt-3 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            ROI Estimate
          </p>
          <MiniBars />
        </PageThumb>

        <PageThumb heading="30-Day Implementation Plan">
          <PreviewSkeleton count={4} />
        </PageThumb>
      </div>
    </section>
  );
}
