import PipelineCard from "./PipelineCard";

const COLUMN_STYLES = {
  to_apply: { accent: "bg-accent", label: "To Apply" },
  applied: { accent: "bg-score-mid", label: "Applied" },
  interview: { accent: "bg-like", label: "Interview" },
  result: { accent: "bg-score-high", label: "Result" },
};

export default function PipelineColumn({
  status,
  jobs,
  swipes,
  onStatusChange,
  onOpenCoverLetter,
}) {
  const style = COLUMN_STYLES[status];

  return (
    <div className="flex flex-col min-w-[260px] flex-1">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2.5 h-2.5 rounded-full ${style.accent}`} />
        <h3 className="font-semibold text-sm text-text-primary">
          {style.label}
        </h3>
        <span className="text-xs text-text-muted font-mono ml-auto">
          {jobs.length}
        </span>
      </div>

      <div className="flex flex-col gap-2 flex-1 bg-bg-overlay/50 rounded-xl p-2 min-h-[200px]">
        {jobs.length === 0 ? (
          <p className="text-xs text-text-muted text-center py-8">
            No offers here
          </p>
        ) : (
          jobs.map((job) => (
            <PipelineCard
              key={job.id}
              job={job}
              swipeData={swipes[job.id]}
              onStatusChange={onStatusChange}
              onOpenCoverLetter={onOpenCoverLetter}
            />
          ))
        )}
      </div>
    </div>
  );
}
