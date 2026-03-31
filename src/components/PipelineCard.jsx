import { getScoreClass, formatRelativeDate } from "../utils/helpers";

const STATUS_OPTIONS = [
  { value: "to_apply", label: "To Apply" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "result", label: "Result" },
];

export default function PipelineCard({ job, swipeData, onStatusChange, onOpenCoverLetter }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2 mb-2">
        <div
          className={`inline-flex items-baseline gap-0.5 px-2 py-0.5 rounded-md font-mono font-bold text-sm ${getScoreClass(job.score)}`}
        >
          {job.score}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-xs text-text-primary leading-snug truncate">
            {job.titre}
          </h4>
          <p className="text-[11px] text-text-secondary truncate">
            {job.entreprise}
          </p>
        </div>
      </div>

      <div className="text-[11px] text-text-muted font-mono mb-2">
        {formatRelativeDate(swipeData?.timestamp)}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={swipeData?.status || "to_apply"}
          onChange={(e) => onStatusChange(job.id, e.target.value)}
          className="flex-1 bg-bg-overlay border border-border rounded-md text-[11px] text-text-secondary px-2 py-1 focus:outline-none focus:border-accent cursor-pointer"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {job.cover_letter && (
          <button
            onClick={() => onOpenCoverLetter(job)}
            className="text-[11px] text-accent hover:underline cursor-pointer shrink-0"
          >
            CL
          </button>
        )}
        <a
          href={job.lien}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-accent hover:underline shrink-0"
        >
          Link
        </a>
      </div>
    </div>
  );
}
