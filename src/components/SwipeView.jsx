import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import JobCard from "./JobCard";
import SwipeButtons from "./SwipeButtons";
import EmptyState from "./EmptyState";

export default function SwipeView({ jobs, onLike, onPass }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exiting, setExiting] = useState(null); // "left" | "right" | null

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, 0], [1, 0]);

  const currentJob = jobs[currentIndex];
  const nextJob = jobs[currentIndex + 1];

  const goNext = useCallback(() => {
    setCurrentIndex((i) => i + 1);
    setExiting(null);
    x.set(0);
  }, [x]);

  const handleLike = useCallback(() => {
    if (!currentJob) return;
    setExiting("right");
    animate(x, 500, { duration: 0.3 }).then(() => {
      onLike(currentJob.id);
      goNext();
    });
  }, [currentJob, onLike, goNext, x]);

  const handlePass = useCallback(() => {
    if (!currentJob) return;
    setExiting("left");
    animate(x, -500, { duration: 0.3 }).then(() => {
      onPass(currentJob.id);
      goNext();
    });
  }, [currentJob, onPass, goNext, x]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleLike();
      else if (e.key === "ArrowLeft") handlePass();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleLike, handlePass]);

  if (!currentJob) {
    return <EmptyState message="All caught up! Check back later." />;
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-8">
      {/* Counter */}
      <div className="text-sm text-text-muted font-mono mb-4">
        {currentIndex + 1} of {jobs.length} new offers
      </div>

      {/* Card stack */}
      <div className="relative w-full max-w-[500px]" style={{ minHeight: 420 }}>
        {/* Next card (behind) */}
        {nextJob && (
          <div className="absolute inset-0 flex items-start justify-center pt-2 scale-[0.97] opacity-50">
            <JobCard job={nextJob} />
          </div>
        )}

        {/* Current card (draggable) */}
        <motion.div
          className="relative z-10 cursor-grab active:cursor-grabbing"
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) {
              handleLike();
            } else if (info.offset.x < -100) {
              handlePass();
            } else {
              animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
            }
          }}
        >
          {/* Like/Pass overlay indicators */}
          <motion.div
            className="absolute top-6 right-6 z-20 px-4 py-2 rounded-xl border-2 border-like text-like font-bold text-xl rotate-12"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          <motion.div
            className="absolute top-6 left-6 z-20 px-4 py-2 rounded-xl border-2 border-pass text-pass font-bold text-xl -rotate-12"
            style={{ opacity: passOpacity }}
          >
            PASS
          </motion.div>

          <JobCard job={currentJob} />
        </motion.div>
      </div>

      <SwipeButtons onLike={handleLike} onPass={handlePass} />

      <p className="text-xs text-text-muted mt-3 font-mono">
        ← Pass &nbsp;|&nbsp; Like →
      </p>
    </div>
  );
}
