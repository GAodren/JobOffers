import { useMemo } from "react";
import PipelineColumn from "./PipelineColumn";

const STATUSES = ["to_apply", "applied", "interview", "result"];

export default function Pipeline({
  jobs,
  swipes,
  onUpdateStatus,
  onOpenCoverLetter,
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

  return (
    <div className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
      <h2 className="text-lg font-bold text-text-primary mb-4">Pipeline</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => (
          <PipelineColumn
            key={status}
            status={status}
            jobs={columns[status]}
            swipes={swipes}
            onStatusChange={onUpdateStatus}
            onOpenCoverLetter={onOpenCoverLetter}
          />
        ))}
      </div>
    </div>
  );
}
