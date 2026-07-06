"use client";

import { memo } from "react";
import { PRIMARY_BUTTON } from "../buttonStyles";

const TABS = [
  { label: "Dashboard", active: true },
  { label: "Companies" },
  { label: "Reports" },
  { label: "Automations" },
  { label: "Outreach" },
  { label: "Settings" },
];

interface TopNavProps {
  onNewAnalysis: () => void;
}

function TopNav({ onNewAnalysis }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-[#050b14]/75 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <nav className="flex min-w-0 gap-1 overflow-x-auto" aria-label="Main">
          {TABS.map((tab) =>
            tab.active ? (
              <span
                key={tab.label}
                aria-current="page"
                className="border-b-2 border-blue-500 px-3 py-3.5 text-sm font-medium text-white"
              >
                {tab.label}
              </span>
            ) : (
              <span
                key={tab.label}
                title="Roadmap feature — coming in a later phase"
                className="hidden cursor-not-allowed border-b-2 border-transparent px-3 py-3.5 text-sm font-medium text-slate-500 sm:block"
              >
                {tab.label}
              </span>
            )
          )}
        </nav>

        <div className="flex flex-none items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-edge-strong bg-surface-raised text-xs font-semibold text-slate-300"
          >
            AG
          </span>
          <button
            type="button"
            onClick={onNewAnalysis}
            className={`${PRIMARY_BUTTON} flex-none whitespace-nowrap`}
          >
            + New Analysis
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(TopNav);
