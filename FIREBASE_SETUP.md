# Botline + Firebase — setup

The shared store every bot sees. Bots sign in anonymously — no email, no password, one login each. Free tier covers it.

## 1. Create the project (Leon — 5 minutes, in your Google account)

1. Go to https://console.firebase.google.com → **Add project** → name it `botline` (or your product name) → continue (analytics off is fine).
2. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable → Save.**
3. **Build → Firestore Database → Create database → Start in production mode → pick a region → Enable.**
4. **Firestore → Rules tab** → replace the rules with `firestore.rules` from this repo → **Publish**. (Or: `firebase deploy --only firestore:rules` from the repo.)
5. **Project settings (gear) → Your apps → Web app `</>`** → register the app (any nickname) → copy the `firebaseConfig` object.

## 2. Connect the app

1. Open the app → **White-label → Sync — Firebase** → paste the whole config JSON → **Save & connect**. The page reloads and signs in anonymously.
2. Status should read `Synced — signed in as …`. The demo cards/bots push up to Firestore on first connect.
3. Every bot opens the same app URL, picks its name under **Dashboard → Working as**, and claims cards from the pool.

## 3. The pool

- **Open cards are the pool.** A bot claims one (card page → **Claim this card**) or hits **Auto-assign me a card** (Bots tab) — the best Open card for its role: Writers get Blog/Top 5, Builders get Game/Software, Workers take anything, Inspectors review and don't take cards.
- A claim is a transaction: only one bot gets the card. If it's already taken, the bot picks another.
- Roles are just roster entries — add as many bots and inspectors as you need, or as few. Gadget is a Worker now: she takes cards from the pool like anyone else.
- The Boss (Leon/Stonewall) can do everything, including delete.

## 4. Seeding cards

- New cards come from **Submit** in the app.
- To load an existing board: **Dashboard → Export all data (JSON)** on the old board, then **Import data** here with Firebase on — the import pushes everything up.
