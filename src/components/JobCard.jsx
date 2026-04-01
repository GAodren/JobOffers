import { formatRelativeDate } from "../utils/helpers";

export default function JobCard({ job }) {
  const tags = job.stack
    ? job.stack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-bg-card rounded-2xl shadow-lg border border-border p-6 flex flex-col gap-3 w-full max-w-[500px]">
      {/* Title */}
      <div>
        <h3 className="font-bold text-lg leading-snug text-text-primary">
          {job.titre}
        </h3>
          <div className="flex items-center gap-1.5 mt-0.5 text-sm text-text-secondary">
            {job.entreprise_url ? (
              <a
                href={job.entreprise_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                {job.entreprise}
              </a>
            ) : (
              <span className="font-medium">{job.entreprise}</span>
            )}
          </div>
      </div>

      {/* Info rows */}
      <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
        {job.localisation && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-overlay text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
            </svg>
            {job.localisation}
          </span>
        )}
        {job.type_contrat && (
          <span className="px-2.5 py-1 rounded-lg bg-bg-overlay text-xs">
            {job.type_contrat}
          </span>
        )}
        {job.type_travail && (
          <span className="px-2.5 py-1 rounded-lg bg-bg-overlay text-xs">
            {job.type_travail}
          </span>
        )}
        {job.experience_requise && (
          <span className="px-2.5 py-1 rounded-lg bg-bg-overlay text-xs">
            {job.experience_requise}
          </span>
        )}
      </div>

      {/* Salary */}
      {job.salaire && job.salaire !== "Non précisé" && (
        <div className="text-sm font-semibold text-score-high">
          {job.salaire}
        </div>
      )}

      {/* Stack tags */}
      {tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Applicants + Date */}
      <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
        {job.nb_candidats && <span>{job.nb_candidats}</span>}
        <span>{formatRelativeDate(job.date_publication)}</span>
      </div>

      {/* AI Comment */}
      {job.commentaire && (
        <p className="text-sm text-text-secondary leading-relaxed italic border-l-2 border-accent/30 pl-3">
          {job.commentaire}
        </p>
      )}

      {/* Link to offer */}
      <a
        href={job.lien}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-accent hover:underline mt-auto self-end"
      >
        View on LinkedIn →
      </a>
    </div>
  );
}
