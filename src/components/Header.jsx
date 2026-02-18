import { getAverageScore, getLatestDate, formatRelativeDate } from "../utils/helpers";

export default function Header({ jobs }) {
  const avg = getAverageScore(jobs);
  const latest = getLatestDate(jobs);

  return (
    <header className="border-b border-white/5 bg-bg-secondary/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <circle cx="12" cy="12" r="2" />
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                </svg>
              </div>
              <h1 className="text-xl font-bold tracking-tight">Job Radar</h1>
            </div>
            <p className="text-text-secondary text-sm mt-1">
              Automated Job Intelligence — Powered by n8n & AI
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm font-mono text-text-secondary border border-white/5">
              {jobs.length} offers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm font-mono text-text-secondary border border-white/5">
              avg {avg}/10
            </span>
            {latest && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm font-mono text-text-secondary border border-white/5">
                {formatRelativeDate(latest.toISOString())}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-score-high/10 text-score-high text-sm border border-score-high/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-score-high opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-score-high"></span>
              </span>
              Updated daily
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
