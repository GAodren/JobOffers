import { useState, useMemo } from "react";
import { useJobs } from "./hooks/useJobs";
import { useSwipeHistory } from "./hooks/useSwipeHistory";
import Header from "./components/Header";
import SwipeView from "./components/SwipeView";
import LikedList from "./components/LikedList";
import Pipeline from "./components/Pipeline";
import CoverLetterModal from "./components/CoverLetterModal";

export default function App() {
  const { jobs, loading: jobsLoading, error } = useJobs();
  const {
    swipes,
    loading: swipesLoading,
    swipedIds,
    likedIds,
    recordSwipe,
    updateStatus,
  } = useSwipeHistory();

  const [activeTab, setActiveTab] = useState("swipe");
  const [modalJob, setModalJob] = useState(null);

  const loading = jobsLoading || swipesLoading;

  const unswipedJobs = useMemo(() => {
    return jobs
      .filter((job) => !swipedIds.includes(job.id))
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [jobs, swipedIds]);

  const stats = useMemo(() => {
    const applied = Object.values(swipes).filter(
      (s) => s.action === "liked" && s.status === "applied"
    ).length;
    return {
      newOffers: unswipedJobs.length,
      liked: likedIds.length,
      applied,
    };
  }, [unswipedJobs, likedIds, swipes]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="flex items-center gap-3 text-text-secondary">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <p className="text-pass font-mono text-sm">Error: {error}</p>
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
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stats={stats}
      />

      {activeTab === "swipe" && (
        <SwipeView
          jobs={unswipedJobs}
          onLike={(id) => recordSwipe(id, "liked")}
          onPass={(id) => recordSwipe(id, "passed")}
        />
      )}

      {activeTab === "liked" && (
        <LikedList
          jobs={jobs}
          swipes={swipes}
          onOpenCoverLetter={setModalJob}
          onUpdateStatus={updateStatus}
        />
      )}

      {activeTab === "pipeline" && (
        <Pipeline
          jobs={jobs}
          swipes={swipes}
          onUpdateStatus={updateStatus}
          onOpenCoverLetter={setModalJob}
        />
      )}

      {modalJob && (
        <CoverLetterModal job={modalJob} onClose={() => setModalJob(null)} />
      )}
    </div>
  );
}
