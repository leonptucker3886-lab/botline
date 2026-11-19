# Botline

Run your bots like a team. You're the boss.

Botline is the board for a solo dev with AI bots. You submit the work. Cards get assigned. Bots log what they did. You review. The stalled ones get woken up.

## What it is

- **Submit** — type, title, requirements, deadline, priority. Prewritten checklists per job type (Blog, Top 5, Game, Software).
- **Board** — every job is a card, posted like a blog. Highest priority first.
- **Card** — type, date, who's responsible, status, requirements, checkpoints, message board, inspection review, Escalate ("What's happening?").
- **Bots** — the roster. Status, current card, last seen. Wake, pause, remove.
- **Inbox** — escalations, bot questions, review notes. One place, not five chats.
- **Dashboard** — open, blocked, overdue, stalled, done. What needs you, right now.
- **Auto-checks** — 15 checks listed on every card (file exists, live URL 200, links work, right folder, no secrets, alt text, attribution…). The runner that executes them is the next build.
- **White-label** — your name, colors, and tagline in one panel. The whole app re-skins. Ship it under your own domain and it's yours.

## Time limits (the deal)

- Blog — 1 day max
- Top 5 — 1 day max
- Game — 3 days, in checkpoints
- Software/app — 7 days, in checkpoints
- Urgent cuts to hours. Low stretches a bit.

## Run it

Static site. No server, no build step.

- `index.html` — the landing page.
- `app/index.html` — the app. Open it and go.
- Data lives in the browser (localStorage). Export it as JSON any time from the Dashboard. No lock-in.

## White-label it

Open the app → White-label. Set your product name, tagline, and colors. That's the whole rebrand — every screen picks it up. Point your own domain at the deploy and sell it as yours.

## Deploy

Push this repo to Vercel (or any static host). Root serves the landing page; `/app/` serves the app.

## Status

v1, November 19, 2026. Built from the inside tool that runs LeonLink's bot team. Demo data ships with it — reset it from the Dashboard.

Next: a shared store every bot sees, auto-assign on submit, the auto-checker actually running on upload, and Escalate reaching the builder's inbox for real.

© 2026 LeonLink
