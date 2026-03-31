export default function Header({ activeTab, onTabChange, stats }) {
  const tabs = [
    { id: "swipe", label: "Swipe" },
    { id: "liked", label: "Liked" },
    { id: "pipeline", label: "Pipeline" },
  ];

  return (
    <header className="border-b border-border bg-bg-card sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <circle cx="12" cy="12" r="2" />
                <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
              </svg>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary">
              SwipeJob
            </h1>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-accent text-white"
                    : "text-text-secondary hover:bg-bg-overlay hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-bg-overlay text-xs font-mono text-text-secondary border border-border">
              {stats.newOffers} new
            </span>
            <span className="px-3 py-1.5 rounded-full bg-like/10 text-xs font-mono text-like border border-like/20">
              {stats.liked} liked
            </span>
            <span className="px-3 py-1.5 rounded-full bg-accent/10 text-xs font-mono text-accent border border-accent/20">
              {stats.applied} applied
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
