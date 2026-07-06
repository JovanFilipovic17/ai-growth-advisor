import { Outreach } from "@/lib/types";
import CopyButton from "../CopyButton";
import Panel from "../Panel";

export default function OutreachSection({ outreach }: { outreach: Outreach }) {
  const blocks = [
    { title: "Cold email", text: outreach.coldEmail },
    { title: "LinkedIn DM", text: outreach.linkedinDm },
    { title: "Follow-up message", text: outreach.followUp },
    { title: "3-sentence pitch", text: outreach.pitch },
  ];

  return (
    <Panel
      id="outreach"
      title="Outreach Messages"
      description="Ready-to-send drafts personalized to this business and its top automation opportunities."
    >
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {blocks.map((block) => (
          <div
            key={block.title}
            className="flex flex-col gap-3 rounded-lg border border-edge bg-surface-raised p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-100">
                {block.title}
              </h3>
              <CopyButton text={block.text} />
            </div>
            <p className="whitespace-pre-wrap text-xs leading-relaxed text-slate-300">
              {block.text}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
