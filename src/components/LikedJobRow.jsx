import { formatRelativeDate } from "../utils/helpers";

export default function LikedJobRow({ job, swipeData, onOpenCoverLetter, onMoveToApplied, onDismiss }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-md transition-shadow">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-text-primary truncate">
          {job.titre}
        </h4>
        <div className="flex items-center gap-2 text-xs text-text-secondary mt-0.5">
          <span>{job.entreprise}</span>
          <span className="text-text-muted">·</span>
          <span className="font-mono">
            {swipeData?.timestamp
              ? formatRelativeDate(swipeData.timestamp)
              : ""}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 shrink-0">
        <a
          href={job.lien}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
        >
          Apply
        </a>
        {job.cover_letter && (
          <button
            onClick={() => onOpenCoverLetter(job)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-bg-overlay text-text-secondary hover:bg-border border border-border transition-colors cursor-pointer"
          >
            Cover Letter
          </button>
        )}
        <button
          onClick={() => onMoveToApplied(job.id)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-like/10 text-like hover:bg-like/20 border border-like/20 transition-colors cursor-pointer"
        >
          Move to Applied
        </button>
        <button
          onClick={() => onDismiss(job.id)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-pass/10 text-pass hover:bg-pass/20 border border-pass/20 transition-colors cursor-pointer"
          title="Dismiss (e.g. expired offer)"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
