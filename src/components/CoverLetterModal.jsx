import { useState, useEffect, useCallback } from "react";
import jsPDF from "jspdf";

function generateCoverLetterPDF(job) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 25;
  const marginRight = 25;
  const contentWidth = pageWidth - marginLeft - marginRight;
  let y = 25;

  const dark = [40, 40, 40];
  const medium = [100, 100, 100];
  const accent = [79, 70, 229]; // #4F46E5

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...dark);
  doc.text("Aodren Gloux", pageWidth / 2, y, { align: "center" });
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...medium);
  const contactLine = "aodren.gloux@gmail.com  |  linkedin.com/in/aodren-gloux  |  github.com/GAodren";
  doc.text(contactLine, pageWidth / 2, y, { align: "center" });
  y += 6;

  doc.setDrawColor(...accent);
  doc.setLineWidth(0.6);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 12;

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...dark);
  doc.text(dateStr, marginLeft, y);
  y += 14;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Dear Hiring Team,", marginLeft, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...dark);
  const lineHeight = 5;

  const paragraphs = job.cover_letter.split(/\n\n+/);
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;
    const lines = doc.splitTextToSize(trimmed, contentWidth);
    for (const line of lines) {
      if (y + lineHeight > pageHeight - 30) {
        doc.addPage();
        y = 25;
      }
      doc.text(line, marginLeft, y);
      y += lineHeight;
    }
    y += 4;
  }

  y += 6;
  if (y + 20 > pageHeight - 20) {
    doc.addPage();
    y = 25;
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Sincerely,", marginLeft, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Aodren Gloux", marginLeft, y);

  const companyName = job.entreprise.replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`Cover_Letter_${companyName}.pdf`);
}

export default function CoverLetterModal({ job, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(job.cover_letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = job.cover_letter;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-semibold text-text-primary">{job.titre}</h2>
          <p className="text-sm text-text-secondary">{job.entreprise}</p>
        </div>

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <pre className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed font-sans">
            {job.cover_letter}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-text-secondary bg-bg-overlay hover:bg-border border border-border transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => generateCoverLetterPDF(job)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-bg-overlay hover:bg-border text-text-primary border border-border transition-colors cursor-pointer"
          >
            Download PDF
          </button>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              copied
                ? "bg-like text-white"
                : "bg-accent hover:bg-accent-hover text-white"
            }`}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
