# Job Radar — Architecture & Design Document

## Overview
A professional React dashboard that displays AI-curated job opportunities with auto-generated cover letters. The site is updated daily via an automated n8n pipeline that scrapes LinkedIn, analyzes offers with AI, and pushes a `jobs.json` to the repo.

**Live at:** Deployed on Vercel, auto-deploys from GitHub on each push.
**Data source:** `public/jobs.json` (updated daily by n8n workflow via GitHub API)

---

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Language:** JavaScript (JSX)
- **Deployment:** Vercel (auto-deploy from GitHub)
- **No backend needed** — the site is purely static, reading from a JSON file

---

## Project Structure

```
job-radar/
├── public/
│   └── jobs.json                  # Data file (updated by n8n)
├── src/
│   ├── main.jsx                   # Entry point
│   ├── App.jsx                    # Root component
│   ├── components/
│   │   ├── Header.jsx             # Brand, stats, live indicator
│   │   ├── FilterBar.jsx          # Search, score filter, company filter, sort
│   │   ├── JobGrid.jsx            # Grid layout of job cards
│   │   ├── JobCard.jsx            # Individual job card
│   │   ├── ScoreBadge.jsx         # Color-coded score display
│   │   ├── TagList.jsx            # Stack technology tags
│   │   ├── CoverLetterModal.jsx   # Modal with cover letter + copy button
│   │   ├── EmptyState.jsx         # When no jobs match filters
│   │   └── Footer.jsx             # Credits, automation info
│   ├── hooks/
│   │   └── useJobs.js             # Fetch & filter jobs.json
│   ├── utils/
│   │   └── helpers.js             # Date formatting, score colors, etc.
│   └── index.css                  # Tailwind imports + custom styles
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## Design Direction

### Aesthetic: "Engineering Dashboard meets Portfolio"
- **Dark mode** — dark slate/navy background, not pure black
- **Clean and minimal** — generous whitespace, no clutter
- **Professional accent color** — indigo/violet (#6c5ce7) for interactive elements
- **Monospace touches** — JetBrains Mono for scores, dates, stats (signals "this is automated")
- **Typography** — DM Sans for body text, clean and modern
- **Subtle depth** — soft borders, very subtle shadows, hover state transitions

### Color Palette
```
Background:     #0a0a0f (primary), #12121a (secondary), #16161f (cards)
Text:           #e8e8f0 (primary), #8888a8 (secondary), #55556a (muted)
Accent:         #6c5ce7 (indigo)
Score High:     #00d2a0 (green, score 8-10)
Score Mid:      #f5a623 (amber, score 7)
Score Low:      #e84393 (pink, score <7)
```

---

## Component Specifications

### Header
- Brand: "Job Radar" with a small radar/signal icon
- Subtitle: "Automated Job Intelligence — Powered by n8n & AI"
- Stats pills: total offers count, average score, last updated timestamp
- Live indicator: green pulsing dot + "Updated daily"

### FilterBar
- **Search input** — filters by keyword across title, company, stack, comments
- **Score filter** — buttons/pills: "All", "8+", "9+", "7+"
- **Company dropdown/filter** — extracted dynamically from job data
- **Sort** — "Newest first" (default), "Highest score", "Least applicants"

### JobCard
- Compact card in a responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Top: Score badge (large, color-coded) + job title (bold)
- Middle: Company name + location + date posted
- Stack: horizontal scrollable tag list
- Bottom row: applicant count + "Apply" button (links to LinkedIn) + "Cover Letter" button
- Hover: subtle lift + border glow

### ScoreBadge
- Large number in monospace font
- Background color based on score range
- "/10" in smaller muted text

### CoverLetterModal
- Full-screen overlay with centered modal
- Header: job title + company
- Body: cover letter text, well-formatted
- Footer: "Copy to Clipboard" button (with success feedback) + "Close"
- Click outside or Escape to close

### Footer
- "Built with n8n, AI, and React — Automated job intelligence by Aodren Gloux"
- Links to GitHub, LinkedIn

---

## Features

### Filtering Logic (useJobs hook)
1. Fetch `jobs.json` from `/jobs.json`
2. Parse and store in state
3. Apply filters in this order:
   - Keyword search (fuzzy match across title, company, stack, comments)
   - Score threshold
   - Company filter
4. Apply sort
5. Return filtered + sorted list

### Cover Letter Copy
- On click "Cover Letter" → open modal
- "Copy" button → `navigator.clipboard.writeText()` → button text changes to "Copied!" for 2s

### Responsive
- 3 columns on desktop (>1024px)
- 2 columns on tablet (>640px)
- 1 column on mobile

---

## Data Shape (jobs.json)
Each job object:
```json
{
  "id": "https://linkedin.com/jobs/view/...",
  "titre": "Software Engineer",
  "entreprise": "Company Name",
  "entreprise_url": "https://...",
  "localisation": "Singapore",
  "type_contrat": "Full-time",
  "type_travail": "On-site",
  "stack": "React, Node.js, Python",
  "salaire": "Non précisé",
  "experience_requise": "Entry level",
  "score": 8,
  "points_positifs": ["..."],
  "points_negatifs": ["..."],
  "commentaire": "...",
  "lien": "https://linkedin.com/jobs/view/...",
  "date_publication": "2026-02-18",
  "nb_candidats": "50 applicants",
  "date_ajout": "2026-02-18T10:06:42.633Z",
  "cover_letter": "Dear Hiring Team,\n\n..."
}
```

---

## Implementation Notes

### For Claude Code
When implementing this project:
1. `npm create vite@latest job-radar -- --template react`
2. `npm install tailwindcss @tailwindcss/vite` and configure
3. Build components one by one, starting with App → Header → useJobs → JobCard → FilterBar → Modal
4. Use the jobs.json from the current repo as test data in public/
5. Make sure Vercel deployment works (just push to GitHub, Vercel auto-detects Vite)

### Migration from current repo
- The current repo (GAodren/JobOffers) has just `index.html` + `jobs.json`
- Replace everything with the new React project
- Keep `jobs.json` in `public/` so n8n can still update it via GitHub API at the same path
- Update n8n node "Mise à jour site" file path if needed: `public/jobs.json` instead of `jobs.json`

### n8n Compatibility
- n8n pushes to `jobs.json` at root → need to verify the path after migration
- If Vercel serves from `dist/`, the `public/jobs.json` will be at root of deployed site
- The n8n GitHub node updates `public/jobs.json` in the repo, Vercel rebuilds automatically
