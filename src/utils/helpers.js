export function getScoreColor(score) {
  if (score >= 8) return "var(--color-score-high)";
  if (score >= 7) return "var(--color-score-mid)";
  return "var(--color-score-low)";
}

export function getScoreClass(score) {
  if (score >= 8) return "bg-score-high/15 text-score-high border-score-high/30";
  if (score >= 7) return "bg-score-mid/15 text-score-mid border-score-mid/30";
  return "bg-score-low/15 text-score-low border-score-low/30";
}

export function formatDate(dateStr) {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
  return formatDate(dateStr);
}

export function parseApplicants(str) {
  if (!str) return Infinity;
  const match = str.match(/(\d+)/);
  if (match) return parseInt(match[1], 10);
  if (str.toLowerCase().includes("first")) return 0;
  return Infinity;
}

export function getAverageScore(jobs) {
  if (!jobs.length) return 0;
  const sum = jobs.reduce((acc, job) => acc + (job.score || 0), 0);
  return (sum / jobs.length).toFixed(1);
}

export function getLatestDate(jobs) {
  if (!jobs.length) return null;
  const dates = jobs
    .map((j) => new Date(j.date_ajout))
    .filter((d) => !isNaN(d.getTime()));
  if (!dates.length) return null;
  return new Date(Math.max(...dates));
}
