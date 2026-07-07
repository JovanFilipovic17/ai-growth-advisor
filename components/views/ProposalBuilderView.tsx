"use client";

import { useState } from "react";
import { AnalysisResult, DetectedSignal } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { signalPhrase } from "@/lib/signals";
import {
  generateProposalPdf,
  ProposalPdfSettings,
  DEFAULT_PROPOSAL_PDF_SETTINGS,
} from "@/lib/proposalPdf";
import Panel from "../Panel";
import PlaceholderButton from "../PlaceholderButton";
import PreviewSkeleton from "../PreviewSkeleton";
import AiInsightPanel from "../report/AiInsightPanel";
import { PRIMARY_BUTTON, GHOST_BUTTON } from "../buttonStyles";

type SectionStatus = "Complete" | "Draft" | "Needs Review";

const STATUS_STYLES: Record<SectionStatus, string> = {
  Complete: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Draft: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  "Needs Review": "border-rose-500/30 bg-rose-500/10 text-rose-400",
};

interface ProposalSection {
  title: string;
  description: string;
  status: SectionStatus;
}

// Descriptions sharpen when owner notes produced detected signals.
function buildSections(signals: DetectedSignal[]): ProposalSection[] {
  const hasSignals = signals.length > 0;
  return [
    {
      title: "Executive Summary",
      description: hasSignals
        ? `Findings and strategy, sharpened by owner-confirmed signals: ${signalPhrase(signals, 3)}.`
        : "Overview of findings and strategic AI growth opportunities.",
      status: "Complete",
    },
    {
      title: "Current Business Bottlenecks",
      description: hasSignals
        ? "Operational inefficiencies and revenue leaks, re-ranked around what the owner reported first-hand."
        : "Analysis of operational inefficiencies and revenue leaks.",
      status: "Complete",
    },
    {
      title: "Recommended AI Automations",
      description: hasSignals
        ? `AI solutions targeting ${signalPhrase(signals)} ahead of the standard playbook.`
        : "Suggested AI solutions for lead handling, reviews, and scheduling.",
      status: "Complete",
    },
    {
      title: "ROI Estimate",
      description: "Financial projections and cost-benefit analysis.",
      status: "Complete",
    },
    {
      title: "30-Day Implementation Plan",
      description: "Timeline and roadmap for deploying initial automations.",
      status: "Draft",
    },
    {
      title: "Pricing Options",
      description: "Proposed packages and investment details.",
      status: "Needs Review",
    },
    {
      title: "Next Steps",
      description: "Action items and approval process.",
      status: "Complete",
    },
  ];
}

const PLACEHOLDER_ACTION_BUTTONS = ["Regenerate with AI", "Send by Email", "Export to CRM"];

// text-base (16px) on mobile avoids iOS Safari's auto-zoom-on-focus.
const SELECT_CLASS =
  "w-full rounded-lg border border-edge-strong bg-slate-950/60 px-3 py-2 text-base sm:text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

function EditButton() {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="Roadmap feature — section editing ships in a later phase"
      className="inline-flex flex-none cursor-not-allowed items-center gap-1.5 rounded-md border border-edge bg-surface-raised/50 px-2.5 py-1.5 text-xs font-medium text-slate-500"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-3 w-3">
        <path
          d="M16.86 4.49a1.88 1.88 0 112.65 2.65L7.5 19.14l-4 1.35 1.35-4L16.86 4.49z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Edit
    </button>
  );
}

// Gates which sections generateProposalPdf() includes.
function Toggle({
  label,
  checked,
  onChange,
  optional,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm text-slate-300">
        {label}
        {optional && (
          <span className="text-xs text-slate-500">Optional</span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 flex-none rounded-full transition ${
          checked ? "bg-blue-500" : "bg-slate-700"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function LabeledSelect({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <select id={id} defaultValue={options[0]} className={SELECT_CLASS}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ProposalBuilderView({
  result,
}: {
  result: AnalysisResult;
}) {
  const { companyName, report } = result;
  const sections = buildSections(result.signals);
  const [settings, setSettings] = useState<ProposalPdfSettings>(
    DEFAULT_PROPOSAL_PDF_SETTINGS,
  );
  const [isGenerating, setIsGenerating] = useState(false);

  function updateSetting<K extends keyof ProposalPdfSettings>(key: K, value: boolean) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGeneratePdf() {
    setIsGenerating(true);
    try {
      await generateProposalPdf(result, settings);
    } catch (error) {
      console.error("Failed to generate proposal PDF", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
            Proposal Builder
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Create a management-ready growth intelligence report from the analysis for{" "}
            <span className="font-medium text-slate-200">{companyName}</span>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className={`${PRIMARY_BUTTON} text-xs disabled:cursor-wait disabled:opacity-70`}
          >
            {isGenerating ? "Generating…" : "Generate Proposal PDF"}
          </button>
          <button
            type="button"
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className={`${GHOST_BUTTON} text-xs disabled:cursor-wait disabled:opacity-70`}
          >
            {isGenerating ? "Generating…" : "Download PDF"}
          </button>
          {PLACEHOLDER_ACTION_BUTTONS.map((label) => (
            <PlaceholderButton key={label} label={label} className="text-xs" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-3">
            {sections.map((section) => (
              <div
                key={section.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-edge bg-surface-panel p-4 shadow-panel"
              >
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-100">
                    {section.title}
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[section.status]}`}
                    >
                      {section.status}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {section.description}
                  </p>
                </div>
                <EditButton />
              </div>
            ))}
          </div>

          <Panel title="Proposal Settings">
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Tone/length/currency are decorative for now — the PDF export
                  is a data export, not a rewrite engine; wiring these would
                  mean generating varied prose per combination. */}
              <LabeledSelect
                id="proposal-tone"
                label="Tone"
                options={["Professional", "Friendly", "Direct"]}
              />
              <LabeledSelect
                id="proposal-length"
                label="Proposal length"
                options={["Standard", "Short", "Detailed"]}
              />
              <LabeledSelect id="proposal-currency" label="Currency" options={["EUR"]} />
              <div className="flex flex-col justify-end gap-3 sm:col-span-2 lg:col-span-3">
                <Toggle
                  label="Include ROI chart"
                  checked={settings.includeRoiChart}
                  onChange={(next) => updateSetting("includeRoiChart", next)}
                />
                <Toggle
                  label="Include implementation timeline"
                  checked={settings.includeImplementationTimeline}
                  onChange={(next) => updateSetting("includeImplementationTimeline", next)}
                />
                <Toggle
                  label="Include pricing package"
                  checked={settings.includePricingPackage}
                  onChange={(next) => updateSetting("includePricingPackage", next)}
                  optional
                />
              </div>
            </div>
          </Panel>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          {/* Full-page proposal preview (visual mock) */}
          <section
            aria-label="Proposal preview"
            className="rounded-xl border border-edge bg-surface-panel p-4 shadow-panel"
          >
            <div className="rounded-lg border border-edge bg-slate-100 p-5 shadow-panel">
              <div className="mb-4 flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-blue-500"
                />
                <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                  IC Systems Growth Intelligence
                </span>
              </div>
              <p className="text-base font-bold leading-snug text-slate-900">
                AI Growth
                <br />
                Opportunity Proposal
              </p>
              <p className="mt-1 truncate text-[10px] text-slate-500">
                {companyName}
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="mb-1.5 text-[10px] font-bold text-slate-700">
                    Executive Summary
                  </p>
                  <PreviewSkeleton count={4} className="mb-3 space-y-1" />
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-bold text-slate-700">
                    Bottleneck Analysis
                  </p>
                  <PreviewSkeleton count={3} className="mb-3 space-y-1" />
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-bold text-slate-700">
                    Recommended Automations
                  </p>
                  <PreviewSkeleton count={3} className="mb-3 space-y-1" />
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-bold text-slate-700">
                    ROI Forecast
                  </p>
                  <p className="mb-1 text-[9px] font-semibold text-emerald-600">
                    {formatCurrency(report.projectedSixMonthRoi)} Projected ROI
                  </p>
                  <div aria-hidden="true" className="mb-2 flex h-9 items-end gap-1">
                    {[30, 45, 40, 60, 75, 95].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-3 rounded-sm bg-blue-500/70"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-bold text-slate-700">
                    Implementation Roadmap
                  </p>
                  <div aria-hidden="true" className="mb-2 flex flex-wrap gap-1">
                    {["Week 1", "Week 2", "Week 3", "Week 4"].map((w) => (
                      <span
                        key={w}
                        className="rounded bg-slate-300 px-1.5 py-0.5 text-[8px] font-medium text-slate-600"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-bold text-slate-700">
                    Next Steps
                  </p>
                  <PreviewSkeleton count={2} className="mb-3 space-y-1" />
                </div>
              </div>
            </div>
          </section>

          <AiInsightPanel
            insight="Before sending, review the pricing assumptions and adjust the implementation timeline based on your delivery capacity."
            lead=""
            actions={[]}
          />
        </div>
      </div>
    </div>
  );
}
