import { useState } from "react";
import { useJobs } from "./hooks/useJobs";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import JobGrid from "./components/JobGrid";
import EmptyState from "./components/EmptyState";
import CoverLetterModal from "./components/CoverLetterModal";
import Footer from "./components/Footer";

export default function App() {
  const {
    jobs,
    filtered,
    loading,
    error,
    search,
    setSearch,
    scoreFilter,
    setScoreFilter,
    companyFilter,
    setCompanyFilter,
    sort,
    setSort,
    companies,
  } = useJobs();

  const [modalJob, setModalJob] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-text-secondary">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm">Loading jobs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-score-low font-mono text-sm">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 rounded-lg text-sm bg-accent text-white hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header jobs={jobs} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        <FilterBar
          search={search}
          setSearch={setSearch}
          scoreFilter={scoreFilter}
          setScoreFilter={setScoreFilter}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          sort={sort}
          setSort={setSort}
          companies={companies}
          resultCount={filtered.length}
        />

        {filtered.length > 0 ? (
          <JobGrid jobs={filtered} onOpenCoverLetter={setModalJob} />
        ) : (
          <EmptyState />
        )}
      </main>

      <Footer />

      {modalJob && (
        <CoverLetterModal job={modalJob} onClose={() => setModalJob(null)} />
      )}
    </div>
  );
}
