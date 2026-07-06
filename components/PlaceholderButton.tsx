import { PLACEHOLDER_BUTTON, SOON_BADGE } from "./buttonStyles";

interface PlaceholderButtonProps {
  label: string;
  title?: string;
  className?: string;
}

export default function PlaceholderButton({
  label,
  title = "Roadmap feature — ships in a later phase",
  className = "",
}: PlaceholderButtonProps) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title={title}
      className={`${PLACEHOLDER_BUTTON} ${className}`}
    >
      {label}
      <span className={SOON_BADGE}>Soon</span>
    </button>
  );
}
