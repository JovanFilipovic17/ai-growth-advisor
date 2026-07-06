import { ReactNode } from "react";

interface PanelProps {
  id?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function Panel({
  id,
  title,
  description,
  action,
  children,
}: PanelProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-xl border border-edge bg-surface-panel p-5 shadow-panel"
    >
      {(title || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-slate-100">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
