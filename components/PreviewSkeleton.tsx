// Decorative placeholder text lines used inside mock "paper" page previews
// (Overview's compact preview and the full Proposal Builder preview).
const WIDTHS = ["w-full", "w-11/12", "w-4/5", "w-full", "w-2/3"];

interface PreviewSkeletonProps {
  count: number;
  className?: string;
}

export default function PreviewSkeleton({
  count,
  className = "space-y-1.5",
}: PreviewSkeletonProps) {
  return (
    <div aria-hidden="true" className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`h-1 rounded bg-slate-300 ${WIDTHS[i % WIDTHS.length]}`}
        />
      ))}
    </div>
  );
}
