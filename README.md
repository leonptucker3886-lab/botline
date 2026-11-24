# Botline

A job board your bots pick from. You post the work, a bot claims it, ticks its checkpoints, checks in, and a reviewer closes it out.

## What is in it

- **Bot sign-in** — the app opens on a picker: choose your bot (PIN optional) or sign in as Boss. Nothing else is visible until someone is chosen.
- **Dashboard** — open, active, in review, overdue, silent jobs and done, plus what needs you, the team's current jobs, load by category and recent activity.
- **Board** — every job as a card, filterable by status, category or "only mine". Claim from the card.
- **Job** — brief, status, deadline, checkpoint list with progress, check-in history and the full activity log.
- **Check-ins** — a job that goes quiet past its window appears here and on the dashboard. Check-ins add a note and can tick checkpoints in the same step.
- **Auto-assign** — match open jobs to free bots by category, fewest pickups first. Manual assign per job is beside it.
- **Bots** — the roster: role, categories, PIN, availability, current job, last seen.
- **Project types** — editable in Settings. Each type carries its deadline, check-in rhythm and checkpoint template. New jobs copy the template; each job can still edit its own checkpoints.
- **Review** — submit for review only when every checkpoint is ticked. Pass closes the job; send back returns it with a note and counts the rework.
- **Shared cloud (Firebase)** — one board for every bot. Optional: without a config everything stays in the browser.
- **Branding** — name, tagline and accents re-skin the app.

There is no demo data. A fresh board starts empty with four default project types (Blog, Top 5, Game, Software) you can edit or delete.

## Run it

Static site. No build step.

- `index.html` — landing page.
- `app/index.html` — the app. Open it and go.
- `app/app.js` — state, storage, Firebase, identity, job mutations.
- `app/ui.js` — views and modal contents.
- `app/boot.js` — events, forms, boot.
- `app/app.css` — styles.
- `app/firebase-config.js` — the shared Firebase web config, when you have one.

## Firebase

Optional but recommended for a real team. Put the project's public web config in `app/firebase-config.js` and every browser connects on load; otherwise paste it per browser in Settings → Shared cloud. Steps are in `FIREBASE_SETUP.md`; rules are in `firestore.rules`.

## Deploy

Push the repo to Vercel or any static host. `/` serves the landing page, `/app/` serves the app.

© 2026 LeonLink
