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

  return (
    <Panel
      title="Analyze a company"
      description="Enter what you know. The agent will generate a full operational audit using demo data tailored to the selected industry."
    >
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
