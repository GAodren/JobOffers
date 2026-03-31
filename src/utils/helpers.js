export function getScoreClass(score) {
  if (score >= 8) return "bg-score-high/15 text-score-high border-score-high/30";
  if (score >= 7) return "bg-score-mid/15 text-score-mid border-score-mid/30";
  return "bg-score-low/15 text-score-low border-score-low/30";
}

export function formatRelativeDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
