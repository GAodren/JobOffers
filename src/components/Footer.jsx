export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
        <p>
          Built with n8n, AI, and React — Automated job intelligence by{" "}
          <span className="text-text-secondary">Aodren Gloux</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/GAodren"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/aodren-gloux"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
