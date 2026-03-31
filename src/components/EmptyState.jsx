export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center flex-1">
      <div className="w-16 h-16 rounded-2xl bg-bg-overlay flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-text-secondary mb-1">
        {message || "All caught up!"}
      </h3>
      <p className="text-sm text-text-muted max-w-sm">
        Check back later for new opportunities.
      </p>
    </div>
  );
}
