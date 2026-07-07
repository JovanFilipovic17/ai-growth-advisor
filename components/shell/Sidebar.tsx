"use client";

import { memo } from "react";
import { SOON_BADGE } from "../buttonStyles";

export type ActiveView = "overview" | "website" | "reviews" | "roi" | "proposal";

interface SidebarItem {
  label: string;
  view?: ActiveView;
  anchor?: string; // scroll target on the overview report
  soon?: boolean;
  icon: string; // SVG path data (24x24, stroke-based)
}

const NAV_ITEMS: SidebarItem[] = [
  {
    label: "Overview",
    view: "overview",
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  },
  {
    label: "Website Audit",
    view: "website",
    icon: "M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a13.7 13.7 0 000 18M12 3a13.7 13.7 0 010 18",
  },
  {
    label: "Reviews",
    view: "reviews",
    icon: "M11.48 3.5a.56.56 0 011.04 0l2.12 5.11 5.52.44a.56.56 0 01.32.99l-4.2 3.6 1.28 5.38a.56.56 0 01-.84.61L12 16.73l-4.72 2.9a.56.56 0 01-.84-.61l1.28-5.39-4.2-3.6a.56.56 0 01.32-.98l5.52-.44 2.12-5.1z",
  },
  {
    label: "Bottlenecks",
    view: "overview",
    anchor: "bottlenecks",
    icon: "M12 9v3.75m-9.3 3.4c-.87 1.5.22 3.35 1.95 3.35h14.7c1.73 0 2.81-1.85 1.95-3.35L14.65 3.4a2.25 2.25 0 00-3.9 0L2.7 16.15zM12 15.75h.01",
  },
  {
    label: "AI Opportunities",
    view: "overview",
    anchor: "opportunities",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    label: "ROI Forecast",
    view: "roi",
    icon: "M2.25 18L9 11.25l4.3 4.3 8.45-8.45M16.5 7.1h5.25v5.25",
  },
  {
    label: "Proposal",
    view: "proposal",
    icon: "M19.5 14.25v-2.6c0-1.24-1-2.25-2.25-2.25h-2.25A1.13 1.13 0 0113.88 8.3V6a2.25 2.25 0 00-2.25-2.25H9M9 3.75H6.75A1.5 1.5 0 005.25 5.25v13.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V14.25a10.5 10.5 0 00-10.5-10.5z",
  },
  {
    label: "Outreach Messages",
    view: "overview",
    anchor: "outreach",
    icon: "M8.6 10.9c0-1 .8-1.8 1.8-1.8h9.2c1 0 1.8.8 1.8 1.8v5.5c0 1-.8 1.8-1.8 1.8h-2.7l-3.3 3v-3h-3.2c-1 0-1.8-.8-1.8-1.8v-5.5zM2.6 5.4c0-1 .8-1.8 1.8-1.8h9.2c1 0 1.8.8 1.8 1.8v1.7H10.4c-1.9 0-3.4 1.5-3.4 3.4v3.6H4.4l-1.8 1.6V5.4z",
  },
];

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, anchor?: string) => void;
}

function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 flex-none flex-col border-r border-edge bg-[#060d19]/80 lg:flex">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-brand-600 shadow-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M4 17l5-6 4 3.5L20 7"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-sm font-semibold tracking-tight text-slate-100">
          AI Growth Advisor
        </span>
      </div>

      <nav className="mt-2 flex-1 space-y-0.5 px-3" aria-label="Report sections">
        {NAV_ITEMS.map((item) => {
          const isActive = item.view === activeView && !item.anchor;
          const baseClass = isActive
            ? "bg-surface-raised text-white shadow-panel"
            : item.soon
              ? "text-slate-500"
              : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200";
          const content = (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={`h-4 w-4 flex-none ${isActive ? "text-blue-400" : ""}`}
              >
                <path
                  d={item.icon}
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="flex-1 truncate text-left">{item.label}</span>
              {item.soon && <span className={SOON_BADGE}>Soon</span>}
            </>
          );
          const itemClass = `flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${baseClass}`;

          return item.view ? (
            <button
              key={item.label}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(item.view!, item.anchor)}
              className={itemClass}
            >
              {content}
            </button>
          ) : (
            <span
              key={item.label}
              title="Roadmap feature — coming in a later phase"
              className={`${itemClass} cursor-not-allowed`}
            >
              {content}
            </span>
          );
        })}
      </nav>

      <div className="border-t border-edge px-5 py-4">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Demo mode — analysis runs locally on industry benchmark data.
        </p>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
