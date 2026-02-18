import ScoreBadge from "./ScoreBadge";
import TagList from "./TagList";
import { formatRelativeDate } from "../utils/helpers";

export default function JobCard({ job, onOpenCoverLetter }) {
  return (
    <div className="group bg-bg-card border border-white/5 rounded-xl p-5 flex flex-col gap-3 transition-all hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5">
      {/* Top: score + title */}
      <div className="flex items-start gap-3">
        <ScoreBadge score={job.score} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[15px] leading-snug truncate">
            {job.titre}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary">
            <span className="font-medium">{job.entreprise}</span>
            <span className="text-text-muted">·</span>
            <span className="truncate">{job.localisation}</span>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span className="font-mono">
          {formatRelativeDate(job.date_publication)}
        </span>
        {job.type_contrat && (
          <>
            <span>·</span>
            <span>{job.type_contrat}</span>
          </>
        )}
        {job.salaire && job.salaire !== "Non précisé" && (
          <>
            <span>·</span>
            <span className="text-score-high">{job.salaire}</span>
          </>
        )}
      </div>

      {/* Stack tags */}
      <TagList stack={job.stack} />

      {/* Comment */}
      {job.commentaire && (
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
          {job.commentaire}
        </p>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <span className="text-xs text-text-muted font-mono">
          {job.nb_candidats || "Unknown"}
        </span>
        <div className="flex gap-2">
          {job.cover_letter && (
            <button
              onClick={() => onOpenCoverLetter(job)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              Cover Letter
            </button>
          )}
          <a
            href={job.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent hover:bg-accent-hover text-white transition-colors"
          >
            Apply
          </a>
        </div>
      </div>
    </div>
  );
}
