import { AnalysisResult } from "@/lib/types";
import Panel from "../Panel";
import ReportHeader from "./ReportHeader";
import KpiCards from "./KpiCards";
import DetectedSignals from "./DetectedSignals";
import BottlenecksSection from "./BottlenecksSection";
import OpportunitiesTable from "./OpportunitiesTable";
import RoiForecastChart from "./RoiForecastChart";
import ProposalPreview from "./ProposalPreview";
import AiInsightPanel from "./AiInsightPanel";
import OutreachSection from "./OutreachSection";

export default function ReportView({ result }: { result: AnalysisResult }) {
  const { report, roi } = result;

  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex min-w-0 flex-col gap-5">
        <ReportHeader
          companyName={result.companyName}
          websiteUrl={result.websiteUrl}
          industryLabel={result.industryLabel}
        />

        <KpiCards report={report} roi={roi} />

        <Panel title="Company Snapshot">
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {result.businessSummary}
          </p>
        </Panel>

        <DetectedSignals signals={result.signals} />

        <div className="grid grid-cols-1 gap-5 min-[1720px]:grid-cols-[5fr_6fr]">
          <BottlenecksSection bottlenecks={report.bottlenecks} />
          <OpportunitiesTable
            opportunities={result.opportunities}
            hourlyValue={roi.hourlyValue}
          />
        </div>

        <RoiForecastChart
          forecast={report.forecast}
          breakEvenMonth={report.breakEvenMonth}
          monthlySavings={roi.estimatedMonthlyValue}
          projectedSixMonthRoi={report.projectedSixMonthRoi}
        />

        <OutreachSection outreach={result.outreach} />
      </div>

      <div className="flex min-w-0 flex-col gap-5">
        <ProposalPreview companyName={result.companyName} />
        <AiInsightPanel insight={report.insight} />
      </div>
    </div>
  );
}
