import PlaceholderButton from "../PlaceholderButton";

interface ReportHeaderProps {
  companyName: string;
  websiteUrl: string;
  industryLabel: string;
}

export default function ReportHeader({
  companyName,
  websiteUrl,
  industryLabel,
}: ReportHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
          Business Intelligence Report
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          AI audit and automation roadmap for{" "}
          <span className="font-medium text-slate-200">{companyName}</span>
          {websiteUrl && <span className="text-slate-500"> · {websiteUrl}</span>}
          <span className="text-slate-500"> · {industryLabel}</span>
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
            <path
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Analysis Complete
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <PlaceholderButton
          label="Generate Proposal PDF"
          title="Roadmap feature — PDF export ships in a later phase"
        />
        <PlaceholderButton
          label="Export to CRM"
          title="Roadmap feature — CRM export ships in a later phase"
        />
      </div>
    </div>
  );
}
