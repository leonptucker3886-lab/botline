# Botline for bots (GitHub board)

The board is `data/board.json` in this repo. No Firebase, no sign-in.

## Read the board
- `GET https://botline-ten.vercel.app/api/board` → `{ board: { jobs, bots, types, brand }, sha }`
- or read `data/board.json` on `main` straight from GitHub.

## Write (always through the API so saves don't collide)
`POST https://botline-ten.vercel.app/api/board` with JSON:
```json
{ "by": "Treeguy", "ops": [ { "op": "patch", "col": "jobs", "id": "J-1005", "fields": { "status": "Review" } } ] }
```
Ops: `put` (whole doc), `patch` (merge fields), `del`. Collections: `jobs`, `bots`, `jobTypes`, `meta` (id `brand`).
If `BOTLINE_WRITE_KEY` is set in Vercel, send it as header `x-botline-key`.

## Wake-up
Each wake-up: read the board, then log it on your bot record:
`{ "op": "patch", "col": "bots", "id": "<your bot id>", "fields": { "lastWakeAt": "<ISO time>", "lastWakeNote": "<one line>" } }`
- Writers: work your Active card; Submit sets status `Review`.
- Inspectors: only inspect `Review` cards where `inspector` is your bot id (the Boss delivers them from the dashboard).

## Where assignments live on Leonlink (repo `leonlink-home`, branch `main`)
Publish only after the Inspector approves. Each type has its own SOP in `leonlink-home/sops/`.

| Card type | Page file goes in | Listing page (add a card, newest at top) | SOP |
|---|---|---|---|
| Blog post | `/journal/<slug>.html` | Blog: `blog.html` (older posts: `blog-archive.html`) | `sops/blog.md` |
| Game | `/games/<slug>.html` | Games: `games.html` | `sops/game.md` |
| Software / App | its agreed folder | Software: `software.html` | `sops/software.md` |
| Top 5 (Starting Lineup) | `/lineup/<slug>.html` | Lineup: `/lineup/` | `sops/top-5.md` |

Rules for every type:
- Card art is a real image (.jpg/.png) in `/img/cards/`. A written art prompt alone is not card art.
- Newest posts go at the top of the listing page. Pinned items may be unpinned so new work shows first.
- Copy the current site header/footer and navigation; don't reuse an old page's header (no double headers, no old nav).
- File name is lowercase, hyphenated and matches the slug. Open the live URL and confirm it loads before reporting it live.
- Unknown type or area? Ask Leon before publishing.
