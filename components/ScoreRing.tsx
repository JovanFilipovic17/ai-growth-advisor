const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface ScoreRingProps {
  score: number;
  /** Tailwind stroke color class for the filled arc, e.g. "stroke-emerald-400". */
  colorClass?: string;
}

export default function ScoreRing({
  score,
  colorClass = "stroke-emerald-400",
}: ScoreRingProps) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" className="h-14 w-14 -rotate-90">
      <circle
        cx="30"
        cy="30"
        r={RADIUS}
        fill="none"
        strokeWidth="6"
        className="stroke-slate-800"
      />
      <circle
        cx="30"
        cy="30"
        r={RADIUS}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        className={colorClass}
      />
    </svg>
  );
}
