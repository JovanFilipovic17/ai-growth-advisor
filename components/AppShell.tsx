"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { generateAnalysis } from "@/lib/mockAnalysis";
import { AnalysisResult, CompanyInput } from "@/lib/types";
import Sidebar, { ActiveView } from "./shell/Sidebar";
import TopNav from "./shell/TopNav";
import CompanyForm from "./CompanyForm";
import ReportView from "./report/ReportView";
import RoiForecastView from "./views/RoiForecastView";
import ProposalBuilderView from "./views/ProposalBuilderView";
import WebsiteAuditView from "./views/WebsiteAuditView";
import ReviewsView from "./views/ReviewsView";

const MOBILE_VIEW_TABS: { view: ActiveView; label: string }[] = [
  { view: "overview", label: "Overview" },
  { view: "website", label: "Website Audit" },
  { view: "reviews", label: "Reviews" },
  { view: "roi", label: "ROI Forecast" },
  { view: "proposal", label: "Proposal" },
];

export default function AppShell() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);

  // Scroll after the target view has rendered, so anchors work when
  // navigating from another view.
  useEffect(() => {
    if (!pendingAnchor) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document.getElementById(pendingAnchor)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setPendingAnchor(null);
  }, [pendingAnchor]);

  const handleAnalyze = useCallback((input: CompanyInput) => {
    setResult(generateAnalysis(input));
    setActiveView("overview");
    window.scrollTo({ top: 0 });
  }, []);

  const handleNewAnalysis = useCallback(() => {
    setResult(null);
    setActiveView("overview");
    window.scrollTo({ top: 0 });
  }, []);

  const handleNavigate = useCallback((view: ActiveView, anchor?: string) => {
    setActiveView(view);
    if (anchor) {
      setPendingAnchor(anchor);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const activeReportView = useMemo(() => {
    if (!result) return null;

    switch (activeView) {
      case "website":
        return <WebsiteAuditView result={result} />;
      case "reviews":
        return <ReviewsView result={result} />;
      case "roi":
        return <RoiForecastView result={result} />;
      case "proposal":
        return <ProposalBuilderView result={result} />;
      default:
        return <ReportView result={result} />;
    }
  }, [activeView, result]);

  return (
    <div className="flex min-h-screen">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav onNewAnalysis={handleNewAnalysis} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {result && (
            <div className="mb-4 flex gap-2 overflow-x-auto lg:hidden" role="tablist" aria-label="Report views">
              {MOBILE_VIEW_TABS.map(({ view, label }) => (
                <button
                  key={view}
                  type="button"
                  role="tab"
                  aria-selected={activeView === view}
                  onClick={() => handleNavigate(view)}
                  className={`flex-none rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeView === view
                      ? "border-blue-500/60 bg-blue-500/15 text-blue-300"
                      : "border-edge bg-surface-raised/50 text-slate-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          {result ? (
            activeReportView
          ) : (
            <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-blue-400">
                  Business Intelligence Agent
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                  Find hidden AI automation opportunities inside any business.
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">
                  Enter a company&rsquo;s details to generate an operational
                  audit: bottlenecks, automation opportunities, ROI forecast,
                  and ready-to-send outreach copy.
                </p>
              </div>
              <CompanyForm onAnalyze={handleAnalyze} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
