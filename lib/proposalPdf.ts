import type { AnalysisResult } from "./types";
import { formatCurrency } from "./format";

export interface ProposalPdfSettings {
  includeRoiChart: boolean;
  includeImplementationTimeline: boolean;
  includePricingPackage: boolean;
}

export const DEFAULT_PROPOSAL_PDF_SETTINGS: ProposalPdfSettings = {
  includeRoiChart: true,
  includeImplementationTimeline: true,
  includePricingPackage: false,
};

const PAGE_MARGIN = 40;
const BRAND_BLUE: [number, number, number] = [37, 99, 235];
const INK: [number, number, number] = [15, 23, 42];
const MUTED: [number, number, number] = [100, 116, 139];
const ROSE: [number, number, number] = [244, 63, 94];

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "company"
  );
}

export async function generateProposalPdf(
  result: AnalysisResult,
  settings: ProposalPdfSettings = DEFAULT_PROPOSAL_PDF_SETTINGS,
): Promise<void> {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  let y = PAGE_MARGIN;

  const ensureSpace = (needed: number) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (y + needed > pageHeight - PAGE_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
    }
  };

  const heading = (text: string) => {
    ensureSpace(28);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...INK);
    doc.text(text, PAGE_MARGIN, y);
    y += 18;
  };

  const paragraph = (text: string, options?: { color?: [number, number, number]; size?: number }) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(options?.size ?? 10);
    doc.setTextColor(...(options?.color ?? INK));
    const lines: string[] = doc.splitTextToSize(text, contentWidth);
    for (const line of lines) {
      ensureSpace(14);
      doc.text(line, PAGE_MARGIN, y);
      y += 14;
    }
  };

  // Cover / header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_BLUE);
  doc.text("AI GROWTH ADVISOR", PAGE_MARGIN, y);
  y += 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text("AI Growth Opportunity Proposal", PAGE_MARGIN, y);
  y += 26;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  const subtitle = [result.companyName, result.industryLabel, result.websiteUrl]
    .filter(Boolean)
    .join("  ·  ");
  doc.text(subtitle, PAGE_MARGIN, y);
  y += 14;
  doc.text(
    `Prepared ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
    PAGE_MARGIN,
    y,
  );
  y += 28;

  // Executive Summary
  heading("Executive Summary");
  paragraph(result.businessSummary);
  y += 4;
  paragraph(
    `AI Opportunity Score: ${result.report.opportunityScore}/100 (${result.report.scoreLabel})  ·  Estimated monthly revenue leak: ${formatCurrency(result.report.revenueLeak)}`,
    { color: MUTED },
  );
  y += 16;

  // Current Business Bottlenecks
  heading("Current Business Bottlenecks");
  autoTable(doc, {
    startY: y,
    margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
    head: [["Bottleneck", "Severity", "Est. Impact/mo", "Recommended Fix"]],
    body: result.report.bottlenecks.map((b) => [
      b.title,
      b.severity,
      formatCurrency(b.impactPerMonth),
      b.fix,
    ]),
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: BRAND_BLUE },
    theme: "striped",
  });
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;

  // Recommended AI Automations
  heading("Recommended AI Automations");
  autoTable(doc, {
    startY: y,
    margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
    head: [["Automation", "Priority", "Difficulty", "Hours Saved/mo", "Impact"]],
    body: result.opportunities.map((o) => [
      o.title,
      o.priority,
      o.difficulty,
      String(o.hoursSavedPerMonth),
      o.impact,
    ]),
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: BRAND_BLUE },
    theme: "striped",
  });
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;

  // ROI Estimate
  heading("ROI Estimate");
  const { roi, report } = result;
  paragraph(
    `Recovered time: ${roi.monthlyHoursSaved} hrs/month at ${formatCurrency(roi.hourlyValue)}/hr  ·  Estimated monthly value: ${formatCurrency(roi.estimatedMonthlyValue)}`,
  );
  paragraph(
    `Implementation investment: ${formatCurrency(roi.implementationPriceLow)}–${formatCurrency(roi.implementationPriceHigh)}  ·  Monthly retainer: ${formatCurrency(roi.monthlyRetainer)}`,
  );
  paragraph(
    `Break-even: month ${report.breakEvenMonth}  ·  Projected 6-month ROI: ${formatCurrency(report.projectedSixMonthRoi)}`,
    { color: MUTED },
  );
  y += 8;

  if (settings.includeRoiChart && report.forecast.length > 0) {
    const chartHeight = 90;
    ensureSpace(chartHeight + 20);
    const values = report.forecast.map((p) => p.cumulativeNet);
    const maxAbs = Math.max(...values.map((v) => Math.abs(v)), 1);
    const barWidth = contentWidth / report.forecast.length;
    const baseline = y + chartHeight;
    report.forecast.forEach((point, i) => {
      const barHeight = (Math.abs(point.cumulativeNet) / maxAbs) * (chartHeight - 20);
      const x = PAGE_MARGIN + i * barWidth + barWidth * 0.15;
      const w = barWidth * 0.7;
      doc.setFillColor(...(point.cumulativeNet >= 0 ? BRAND_BLUE : ROSE));
      const barY = point.cumulativeNet >= 0 ? baseline - barHeight : baseline;
      doc.rect(x, barY, w, Math.max(barHeight, 1), "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...MUTED);
      doc.text(`M${point.month}`, x + w / 2, baseline + 12, { align: "center" });
    });
    y = baseline + 24;
  }

  // 30-Day Implementation Plan
  if (settings.includeImplementationTimeline) {
    heading("30-Day Implementation Plan");
    const phases = [
      { label: "Week 1 — Kickoff & Quick Win", items: result.opportunities.slice(0, 1) },
      { label: "Week 2 — Core Automation", items: result.opportunities.slice(1, 3) },
      { label: "Week 3 — Rollout & Integration", items: result.opportunities.slice(3, 5) },
      { label: "Week 4 — Review & Optimize", items: result.opportunities.slice(5, 7) },
    ].filter((phase) => phase.items.length > 0);

    for (const phase of phases) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...INK);
      ensureSpace(16);
      doc.text(phase.label, PAGE_MARGIN, y);
      y += 14;
      paragraph(phase.items.map((o) => o.title).join(", "), { color: MUTED });
      y += 4;
    }
    paragraph(report.complexityNote, { color: MUTED });
    y += 12;
  }

  // Pricing
  if (settings.includePricingPackage) {
    heading("Investment Summary");
    paragraph(
      `One-time implementation: ${formatCurrency(roi.implementationPriceLow)} – ${formatCurrency(roi.implementationPriceHigh)}`,
    );
    paragraph(`Ongoing monthly retainer: ${formatCurrency(roi.monthlyRetainer)}/month`);
    y += 12;
  }

  // Next Steps
  heading("Next Steps");
  paragraph("1. Review the findings and priorities in this proposal.");
  paragraph("2. Schedule a short call to confirm scope and timeline.");
  paragraph("3. Confirm a start date and kick off Week 1.");
  if (result.outreach.pitch) {
    y += 8;
    paragraph(result.outreach.pitch, { color: MUTED });
  }

  const filename = `${slugify(result.companyName)}-ai-growth-proposal.pdf`;
  await doc.save(filename, { returnPromise: true });
}
