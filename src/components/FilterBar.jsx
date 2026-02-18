export default function FilterBar({
  search,
  setSearch,
  scoreFilter,
  setScoreFilter,
  companyFilter,
  setCompanyFilter,
  sort,
  setSort,
  companies,
  resultCount,
}) {
  const scoreOptions = [
    { label: "All", value: "all" },
    { label: "7+", value: "7" },
    { label: "8+", value: "8" },
    { label: "9+", value: "9" },
  ];

  return (
    <div className="bg-bg-secondary/50 border border-white/5 rounded-xl p-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs, companies, stack..."
          className="w-full pl-10 pr-4 py-2.5 bg-bg-primary border border-white/10 rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Score pills */}
          <span className="text-xs text-text-muted mr-1">Score:</span>
          {scoreOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setScoreFilter(opt.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                scoreFilter === opt.value
                  ? "bg-accent text-white"
                  : "bg-white/5 text-text-secondary hover:bg-white/10 border border-white/5"
              }`}
            >
              {opt.label}
            </button>
          ))}

          {/* Company filter */}
          <span className="text-xs text-text-muted ml-2 mr-1">Company:</span>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-bg-primary border border-white/10 rounded-lg text-xs text-text-secondary px-2 py-1.5 focus:outline-none focus:border-accent/50 cursor-pointer"
          >
            <option value="all">All</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted font-mono">
            {resultCount} result{resultCount !== 1 ? "s" : ""}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-bg-primary border border-white/10 rounded-lg text-xs text-text-secondary px-2 py-1.5 focus:outline-none focus:border-accent/50 cursor-pointer"
          >
            <option value="newest">Newest first</option>
            <option value="score">Highest score</option>
            <option value="applicants">Least applicants</option>
          </select>
        </div>
      </div>
    </div>
  );
}
