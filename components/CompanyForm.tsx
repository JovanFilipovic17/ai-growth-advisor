"use client";

import { FormEvent, useState } from "react";
import { CompanyInput, INDUSTRY_OPTIONS, Industry } from "@/lib/types";
import Panel from "./Panel";
import { PRIMARY_BUTTON } from "./buttonStyles";

interface CompanyFormProps {
  onAnalyze: (input: CompanyInput) => void;
}

// text-base (16px) on mobile avoids iOS Safari's auto-zoom-on-focus for any
// input under 16px; sm: reverts to the original 14px on larger screens.
const FIELD_CLASS =
  "rounded-lg border border-edge-strong bg-slate-950/60 px-3 py-2 text-base sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const LABEL_CLASS = "text-sm font-medium text-slate-300";

const COMPANY_NAME_ERROR_ID = "companyName-error";

interface DemoPreset extends CompanyInput {
  title: string;
  challenge: string;
}

const DEMO_PRESETS: DemoPreset[] = [
  {
    title: "Dental clinic",
    challenge: "Missed calls and slow follow-up",
    companyName: "Urban Smile Dental Studio",
    websiteUrl: "urbansmile.example",
    industry: "dental",
    notes:
      "We keep missing calls during busy hours, new patient leads wait days for a reply, and booking online feels confusing.",
  },
  {
    title: "Restaurant / catering",
    challenge: "Booking confusion and unanswered reviews",
    companyName: "Adria Table Catering",
    websiteUrl: "adriatable.example",
    industry: "restaurant",
    notes:
      "Guests complain about reservation mix-ups, nobody replies to reviews consistently, and catering inquiries often wait too long for follow-up.",
  },
  {
    title: "Gym",
    challenge: "Churn, inactive members, and manual reporting",
    companyName: "PulseFit Studio",
    websiteUrl: "pulsefit.example",
    industry: "gym",
    notes:
      "Member churn is creeping up, inactive members are not re-engaged, class reports are built manually, and follow-up after trials is slow.",
  },
  {
    title: "Balkan IPTV / OTT",
    challenge: "Renewals, support tickets, and churn",
    companyName: "BalkanStream OTT",
    websiteUrl: "balkanstream.example",
    industry: "iptv",
    notes:
      "Renewals are handled manually, support tickets pile up during live matches, slow replies create churn risk, and customers need clearer renewal reminders.",
  },
  {
    title: "E-commerce",
    challenge: "Abandoned carts and weak follow-up",
    companyName: "Northline Goods",
    websiteUrl: "northlinegoods.example",
    industry: "ecommerce",
    notes:
      "Too many carts are abandoned, support replies are slow, email follow-up is weak, and return questions take too much manual admin time.",
  },
];

export default function CompanyForm({ onAnalyze }: CompanyFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [industry, setIndustry] = useState<Industry>(INDUSTRY_OPTIONS[0].value);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!companyName.trim()) {
      setError("Company name is required.");
      return;
    }
    setError("");
    onAnalyze({ companyName, websiteUrl, industry, notes });
  }

  function applyPreset(preset: DemoPreset) {
    setCompanyName(preset.companyName);
    setWebsiteUrl(preset.websiteUrl);
    setIndustry(preset.industry);
    setNotes(preset.notes);
    setError("");
  }

  return (
    <Panel
      title="Analyze a company"
      description="Enter what you know. The agent will generate a full operational audit using demo data tailored to the selected industry."
      action={
        <span className="rounded-full border border-edge bg-surface-raised/50 px-2.5 py-1 text-[11px] font-medium text-slate-400">
          Demo mode · Local deterministic analysis · No external data used
        </span>
      }
    >
      <section aria-labelledby="demo-presets-title" className="mt-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3
              id="demo-presets-title"
              className="text-sm font-semibold text-slate-100"
            >
              Try a demo scenario
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Pick a realistic portfolio example, then run the same analysis
              flow.
            </p>
          </div>
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-300">
            v1.1 demo presets
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-5">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.industry}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`min-w-0 rounded-lg border p-3 text-left transition hover:border-blue-500/45 hover:bg-blue-500/10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                industry === preset.industry &&
                companyName === preset.companyName
                  ? "border-blue-500/60 bg-blue-500/15"
                  : "border-edge bg-surface-raised/50"
              }`}
            >
              <span className="block truncate text-sm font-semibold text-slate-100">
                {preset.title}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                {preset.challenge}
              </span>
            </button>
          ))}
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="companyName" className={LABEL_CLASS}>
            Company name
          </label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Urban Smile Dental Studio"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? COMPANY_NAME_ERROR_ID : undefined}
            className={FIELD_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="websiteUrl" className={LABEL_CLASS}>
            Website URL
          </label>
          <input
            id="websiteUrl"
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="e.g. urbansmile.com"
            className={FIELD_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="industry" className={LABEL_CLASS}>
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
            className={`${FIELD_CLASS} bg-slate-950`}
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="notes" className={LABEL_CLASS}>
            Optional notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything specific you already know — e.g. team size, tools they use, complaints you've heard..."
            rows={3}
            className={FIELD_CLASS}
          />
        </div>

        {error && (
          <p
            id={COMPANY_NAME_ERROR_ID}
            role="alert"
            className="sm:col-span-2 text-sm text-rose-400"
          >
            {error}
          </p>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            className={`${PRIMARY_BUTTON} w-full sm:w-auto`}
          >
            Run Analysis
          </button>
        </div>
      </form>
    </Panel>
  );
}
