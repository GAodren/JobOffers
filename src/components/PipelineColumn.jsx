import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PipelineCard from "./PipelineCard";

const COLUMN_CONFIG = {
  to_apply: { color: "bg-accent", colorText: "text-accent", colorBg: "bg-accent/5", label: "To Apply", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  applied: { color: "bg-score-mid", colorText: "text-score-mid", colorBg: "bg-score-mid/5", label: "Applied", icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" },
  interview: { color: "bg-accent", colorText: "text-accent", colorBg: "bg-accent/5", label: "Interview", icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" },
  result: { color: "bg-like", colorText: "text-like", colorBg: "bg-like/5", label: "Result", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
};

export default function PipelineColumn({
  status,
  jobs,
  swipes,
  onStatusChange,
  onOpenCoverLetter,
  onDismiss,
}) {
  const [dragOver, setDragOver] = useState(false);
  const config = COLUMN_CONFIG[status];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const jobId = e.dataTransfer.getData("text/plain");
    if (jobId) {
      onStatusChange(jobId, status);
    }
  };

  return (
    <div className="flex flex-col min-w-[280px] flex-1">
      {/* Column header */}
      <div className="flex items-center gap-2.5 mb-3 px-1">
        <div className={`w-3 h-3 rounded-full ${config.color}`} />
        <h3 className="font-bold text-sm text-text-primary">
          {config.label}
        </h3>
        <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold ${config.colorText} ${config.colorBg}`}>
          {jobs.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col gap-3 flex-1 rounded-2xl p-3 min-h-[300px] transition-all duration-200 ${
          dragOver
            ? "bg-accent/10 border-2 border-dashed border-accent/40 scale-[1.01]"
            : "bg-bg-overlay/40 border-2 border-transparent"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className={`w-8 h-8 ${config.colorText} opacity-30 mb-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path d={config.icon} />
              </svg>
              <p className="text-sm text-text-muted">
                {dragOver ? "Drop here" : "No offers"}
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <PipelineCard
                key={job.id}
                job={job}
                swipeData={swipes[job.id]}
                currentStatus={status}
                onStatusChange={onStatusChange}
                onOpenCoverLetter={onOpenCoverLetter}
                onDismiss={onDismiss}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
