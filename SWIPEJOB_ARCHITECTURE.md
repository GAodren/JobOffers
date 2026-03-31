# SwipeJob — Architecture & Design Document

## Overview
A Tinder-style job swiping app that displays AI-curated job opportunities as cards. The user swipes right to like or left to pass, then manages their liked offers through a simple pipeline tracker. The site is updated every 4 hours via an n8n pipeline that scrapes LinkedIn, analyzes offers with AI, and pushes a `jobs.json` to the repo.

**Live at:** Deployed on Vercel, auto-deploys from GitHub on each push.
**Data source:** `public/jobs.json` (updated daily by n8n workflow via GitHub API)

---

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Language:** JavaScript (JSX)
- **Animations:** Framer Motion (for swipe gestures)
- **Deployment:** Vercel (auto-deploy from GitHub)
- **Storage:** `public/swipes.json` on GitHub (synced via GitHub API, accessible from any device)
- **No backend needed** — purely static, reading from JSON files, writing swipes back to GitHub

---

## Project Structure

```
job-radar/
├── public/
│   └── jobs.json                  # Data file (updated by n8n)
├── src/
│   ├── main.jsx                   # Entry point
│   ├── App.jsx                    # Root component, routing
│   ├── components/
│   │   ├── SwipeView.jsx          # Main swipe interface
│   │   ├── JobCard.jsx            # Individual swipe card (detailed)
│   │   ├── SwipeButtons.jsx       # Like / Pass buttons (+ keyboard shortcuts)
│   │   ├── LikedList.jsx          # List of liked offers with actions
│   │   ├── LikedJobRow.jsx        # Single row in liked list
│   │   ├── Pipeline.jsx           # Kanban-style tracker
│   │   ├── PipelineColumn.jsx     # Single column (To Apply, Applied, Interview, Result)
│   │   ├── PipelineCard.jsx       # Compact job card in pipeline
│   │   ├── Header.jsx             # Navigation + stats
│   │   ├── CoverLetterModal.jsx   # Modal with cover letter + copy button
│   │   └── EmptyState.jsx         # When no more cards to swipe
│   ├── hooks/
│   │   ├── useJobs.js             # Fetch jobs.json, filter already swiped
│   │   └── useSwipeHistory.js     # Manage swipe state in localStorage
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

### Aesthetic: Clean, light, fast — a tool, not a portfolio
- **Light mode** — white/light gray background, clean and readable
- **Minimal UI** — no clutter, focus on the card
- **Accent color** — a single accent color for interactive elements (blue or indigo)
- **Typography** — clean sans-serif (DM Sans or similar), monospace for scores/stats
- **Card-centric** — the job card is the hero element, everything else is secondary
- **Smooth animations** — swipe gestures should feel satisfying (Framer Motion)

### Color Palette
```
Background:     #F8F9FA (light gray)
Card:           #FFFFFF (white)
Text primary:   #1A1A2E (dark)
Text secondary: #6B7280 (gray)
Accent:         #4F46E5 (indigo)
Like/Green:     #10B981
Pass/Red:       #EF4444
Score high:     #10B981 (green, 8-10)
Score mid:      #F59E0B (amber, 7)
```

---

## Views & Navigation

### 3 main views, accessible via top navigation tabs:

1. **Swipe** — Default view. Cards to swipe.
2. **Liked** — List of liked offers with Apply/Cover Letter actions.
3. **Pipeline** — Kanban tracker for application progress.

---

## Component Specifications

### Header
- App name: "SwipeJob" or "Job Radar"
- 3 navigation tabs: Swipe | Liked | Pipeline
- Stats: X new offers today, X liked, X applied
- Simple, thin, stays at the top

### SwipeView
- Shows one job card at a time, centered on screen
- Card stacked appearance (next card slightly visible behind)
- Swipe right = Like, swipe left = Pass
- Two buttons below card: ✗ Pass (red) | ✓ Like (green)
- Keyboard shortcuts: ← Pass, → Like
- Counter: "3 of 12 new offers"
- When all cards are swiped: EmptyState component ("All caught up! Check back later.")

### JobCard (the swipe card)
This is the main element. It must show ALL essential info to make a decision in 10 seconds.

Layout (top to bottom):
- **Score badge** (large, color-coded, top-left corner) + **/10** in smaller text
- **Job title** (bold, prominent)
- **Company name** + company URL link
- **Location** (city, country)
- **Contract type** (Full-time, Permanent, etc.)
- **Work type** (On-site, Remote, Hybrid)
- **Experience required** (Entry level, 2-3 years, etc.)
- **Salary** (if available, otherwise don't show)
- **Stack** — horizontal scrollable tags
- **Number of applicants** ("25 applicants" or "Over 200 applicants")
- **Date posted** (relative: "Today", "Yesterday", "3 days ago")
- **AI Comment** — 1-2 sentence summary from the AI (the "commentaire" field)
- **Link to offer** — small "View on LinkedIn" link

DO NOT show: points_positifs, points_negatifs (removed as discussed)

The card should be swipeable with touch/mouse drag (Framer Motion) and also via buttons.

### CoverLetterModal
- Triggered from Liked list or Pipeline
- Full-screen overlay with centered modal
- Header: job title + company
- Body: cover letter text, well-formatted
- Footer: "Copy to Clipboard" button (with "Copied!" feedback) + "Close"
- Click outside or Escape to close

### LikedList
- Simple list/table of all liked offers
- Each row shows: score, title, company, date liked
- Action buttons per row:
  - "Apply" → opens the LinkedIn/job URL in new tab
  - "Cover Letter" → opens CoverLetterModal
  - "Move to Applied" → moves to pipeline
- Sort by: date liked (newest first) or score

### Pipeline (Kanban)
- 4 columns: **To Apply** | **Applied** | **Interview** | **Result**
- Cards can be dragged between columns (or use dropdown to change status)
- Each card shows: score, title, company, date
- Click on a card → expand to see full details + cover letter
- Simple, functional, not overdesigned

---

## Data Shape (jobs.json)
Each job object from n8n:
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

## Swipes Storage (public/swipes.json on GitHub)
The site reads and writes swipe data to `public/swipes.json` via the GitHub API (using a personal access token stored as an environment variable in Vercel: `VITE_GITHUB_TOKEN`).

```json
{
  "https://linkedin.com/jobs/view/123": {
    "action": "liked",
    "timestamp": "2026-03-01T10:00:00Z",
    "status": "to_apply"
  },
  "https://linkedin.com/jobs/view/456": {
    "action": "passed",
    "timestamp": "2026-03-01T10:01:00Z"
  }
}
```

### How it works:
1. On page load: fetch `swipes.json` from GitHub (via raw URL or GitHub API)
2. On each swipe or status change: update the local state, then push the updated `swipes.json` to GitHub via the API (PUT to `/repos/GAodren/JobOffers/contents/public/swipes.json`)
3. This way the data is always synced and accessible from any device

### GitHub API write example:
```javascript
async function saveSwipes(swipes) {
  const content = btoa(JSON.stringify(swipes, null, 2));
  const current = await fetch('https://api.github.com/repos/GAodren/JobOffers/contents/public/swipes.json', {
    headers: { 'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
  });
  const { sha } = await current.json();
  
  await fetch('https://api.github.com/repos/GAodren/JobOffers/contents/public/swipes.json', {
    method: 'PUT',
    headers: {
      'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Update swipes',
      content,
      sha
    })
  });
}
```

### Important: 
- The GitHub token must have `repo` scope
- Store it as `VITE_GITHUB_TOKEN` in Vercel environment variables
- Rate limit: GitHub API allows 5000 requests/hour, more than enough
- Each swipe triggers a save, but debounce writes (wait 2 seconds after last action before pushing)

---

## Logic

### SwipeView logic (useJobs + useSwipeHistory)
1. Fetch `jobs.json` from `/jobs.json`
2. Fetch `swipes.json` from GitHub API
3. Filter out already swiped jobs (both liked and passed)
4. Show remaining jobs one by one, sorted by score (highest first)
5. On swipe right: save as "liked" with status "to_apply", push to GitHub
6. On swipe left: save as "passed", push to GitHub
7. Move to next card

### LikedList logic
1. Read swipes.json, filter jobs where action = "liked"
2. Cross-reference with jobs.json to get full job data
3. Display as list with actions

### Pipeline logic
1. Read swipes.json, filter jobs where action = "liked"
2. Group by status: to_apply, applied, interview, result
3. Display in Kanban columns
4. On status change: update swipes.json and push to GitHub

### Cover Letter Copy
- "Copy" button → `navigator.clipboard.writeText()` → button text changes to "Copied!" for 2s

---

## Responsive Design
- **Desktop:** Card centered, ~500px max width, comfortable reading
- **Mobile:** Full-width card, swipe gestures work naturally with touch
- **The app should feel like a mobile app even on desktop**

---

## Implementation Notes

### For Claude Code CLI
1. `npm create vite@latest job-radar -- --template react`
2. `npm install tailwindcss @tailwindcss/vite framer-motion`
3. Build components one by one: App → Header → SwipeView → JobCard → useJobs → useSwipeHistory → LikedList → Pipeline → CoverLetterModal
4. Use the existing jobs.json in public/ as test data
5. Make sure Vercel deployment works (just push to GitHub, Vercel auto-detects Vite)

### Key libraries
- **framer-motion**: for swipe gesture animations (drag, spring physics, exit animations)
- **tailwindcss**: for styling
- No other external dependencies needed. Keep it lean.

### Swipe implementation with Framer Motion
```jsx
// Concept for the swipe card
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, info) => {
    if (info.offset.x > 100) onLike();
    else if (info.offset.x < -100) onPass();
  }}
  animate={controls}
>
  <JobCard job={currentJob} />
</motion.div>
```

### Migration from current repo
- The current repo (GAodren/JobOffers) has the existing React site
- Replace the UI components but keep the same project structure
- Keep `jobs.json` in `public/` so n8n can still update it via GitHub API
- The n8n GitHub node path stays the same: `public/jobs.json`

### n8n Compatibility
- n8n pushes to `public/jobs.json` in the repo
- Vercel rebuilds automatically on each push
- No changes needed on the n8n side
