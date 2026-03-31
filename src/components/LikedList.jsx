import { useState, useMemo } from "react";
import LikedJobRow from "./LikedJobRow";

export default function LikedList({
  jobs,
  swipes,
  onOpenCoverLetter,
  onUpdateStatus,
  onDismiss,
}) {
  const [sortBy, setSortBy] = useState("date");

  const likedJobs = useMemo(() => {
    const liked = jobs.filter(
      (j) => swipes[j.id]?.action === "liked" && swipes[j.id]?.status === "to_apply"
    );

    if (sortBy === "score") {
      liked.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else {
      liked.sort(
        (a, b) =>
          new Date(swipes[b.id]?.timestamp || 0) -
          new Date(swipes[a.id]?.timestamp || 0)
      );
    }

    return liked;
  }, [jobs, swipes, sortBy]);

  if (likedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-bg-overlay flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-secondary mb-1">
          No liked offers yet
        </h3>
        <p className="text-sm text-text-muted">
          Swipe right on offers you like to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary">
          Liked Offers ({likedJobs.length})
        </h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-bg-card border border-border rounded-lg text-xs text-text-secondary px-3 py-1.5 focus:outline-none focus:border-accent cursor-pointer"
        >
          <option value="date">Newest first</option>
          <option value="score">Highest score</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {likedJobs.map((job) => (
          <LikedJobRow
            key={job.id}
            job={job}
            swipeData={swipes[job.id]}
            onOpenCoverLetter={onOpenCoverLetter}
            onMoveToApplied={(id) => onUpdateStatus(id, "applied")}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </div>
  );
}
