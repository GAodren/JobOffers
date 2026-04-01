import { useMemo } from "react";
import PipelineColumn from "./PipelineColumn";

const STATUSES = ["to_apply", "applied", "interview", "result"];

export default function Pipeline({
  jobs,
  swipes,
  onUpdateStatus,
  onOpenCoverLetter,
  onDismiss,
}) {
  const columns = useMemo(() => {
    const grouped = {};
    for (const status of STATUSES) {
      grouped[status] = [];
    }

    for (const job of jobs) {
      const swipe = swipes[job.id];
      if (swipe?.action !== "liked") continue;
      const status = swipe.status || "to_apply";
      if (grouped[status]) {
        grouped[status].push(job);
      }
    }

    return grouped;
  }, [jobs, swipes]);

  const totalLiked = Object.values(columns).reduce((sum, col) => sum + col.length, 0);

  return (
    <div className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Pipeline</h2>
          <p className="text-sm text-text-muted mt-0.5">
            Drag cards between columns or use the arrow buttons
          </p>
        </div>
        <span className="text-sm text-text-secondary font-mono">
          {totalLiked} offer{totalLiked !== 1 ? "s" : ""} total
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6">
        {STATUSES.map((status) => (
          <PipelineColumn
            key={status}
            status={status}
            jobs={columns[status]}
            swipes={swipes}
            onStatusChange={onUpdateStatus}
            onOpenCoverLetter={onOpenCoverLetter}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </div>
  );
}
