import { useState } from "react";
import { motion } from "framer-motion";
import { formatRelativeDate } from "../utils/helpers";

const STATUSES = ["to_apply", "applied", "interview", "result"];

export default function PipelineCard({
  job,
  swipeData,
  currentStatus,
  onStatusChange,
  onOpenCoverLetter,
  onDismiss,
}) {
  const [showConfirmDismiss, setShowConfirmDismiss] = useState(false);
  const statusIndex = STATUSES.indexOf(currentStatus);
  const canMoveLeft = statusIndex > 0;
  const canMoveRight = statusIndex < STATUSES.length - 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", job.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="bg-bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-accent/30 transition-all cursor-grab active:cursor-grabbing group"
    >
      {/* Title + Company */}
      <div className="mb-3">
        <h4 className="font-semibold text-sm text-text-primary leading-snug line-clamp-2">
          {job.titre}
        </h4>
        <p className="text-xs text-text-secondary mt-1">
          {job.entreprise}
        </p>
        {job.localisation && (
          <p className="text-xs text-text-muted mt-0.5">
            {job.localisation}
          </p>
        )}
      </div>

      {/* Date */}
      <div className="text-xs text-text-muted font-mono mb-3">
        {formatRelativeDate(swipeData?.timestamp)}
      </div>

      {/* Move arrows */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => canMoveLeft && onStatusChange(job.id, STATUSES[statusIndex - 1])}
          disabled={!canMoveLeft}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${
            canMoveLeft
              ? "bg-bg-overlay hover:bg-border text-text-secondary border border-border"
              : "bg-bg-overlay/50 text-text-muted/40 border border-transparent cursor-not-allowed"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => canMoveRight && onStatusChange(job.id, STATUSES[statusIndex + 1])}
          disabled={!canMoveRight}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${
            canMoveRight
              ? "bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20"
              : "bg-bg-overlay/50 text-text-muted/40 border border-transparent cursor-not-allowed"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <a
          href={job.lien}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent-hover transition-colors text-center"
        >
          Open Offer
        </a>
        {job.cover_letter && (
          <button
            onClick={() => onOpenCoverLetter(job)}
            className="flex-1 py-2 rounded-lg text-xs font-medium bg-bg-overlay text-text-secondary hover:bg-border border border-border transition-colors cursor-pointer"
          >
            Cover Letter
          </button>
        )}
      </div>

      {/* Dismiss */}
      <div className="mt-2">
        {showConfirmDismiss ? (
          <div className="flex gap-2">
            <button
              onClick={() => onDismiss(job.id)}
              className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-pass/10 text-pass hover:bg-pass/20 border border-pass/20 transition-colors cursor-pointer"
            >
              Confirm dismiss
            </button>
            <button
              onClick={() => setShowConfirmDismiss(false)}
              className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-bg-overlay text-text-muted hover:bg-border border border-border transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmDismiss(true)}
            className="w-full py-1.5 rounded-lg text-xs text-text-muted hover:text-pass hover:bg-pass/5 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>
    </motion.div>
  );
}
