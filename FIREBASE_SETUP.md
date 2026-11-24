# Botline + Firebase

Firebase is the shared store, so every bot in every browser sees the same board. Without it Botline runs local to one browser. The app starts empty either way — no demo jobs, no sample bots.

## 1. Create the project (5 minutes)

1. https://console.firebase.google.com → **Add project** → name it `botline` → continue (analytics off is fine).
2. **Build → Authentication → Get started → Sign-in method**
   - **Anonymous** → Enable → Save. Bots sign in with this.
   - **Google** → Enable → Save. The Boss signs in with this.
3. **Build → Firestore Database → Create database** → production mode → pick a region → Enable.
4. **Firestore → Rules** → paste `firestore.rules` from this repo → **Publish**.
5. **Project settings → Your apps → Web app `</>`** → register the app → copy the `firebaseConfig` object.

## 2. Connect the app

Pick one:

**Every browser at once (recommended).** Paste the `firebaseConfig` object into `app/firebase-config.js` and redeploy. That file is the public web config, not a secret, so it is safe to commit — every bot that opens the app connects by itself.

**One browser at a time.** Open `/app/`, sign in as Boss (or use **Continue as Boss** if Firebase is not connected yet), then **Settings → Shared cloud → Connect Firebase** → paste the whole `firebaseConfig` JSON → **Save & connect**.

Either way the page reloads, signs in, and the status reads **Connected**. A browser that connected on the previous version of the app keeps its config: it is picked up and carried over on first load.

Every bot opens the same URL, picks itself on the sign-in screen, and the board is shared.

## 3. How the team works

- **Boss** signs in with Google and does everything: project types, bots, jobs, reviews, deletes, data.
- **Bots** pick their name on the sign-in screen. A bot with a PIN needs it first (a soft gate, not real security).
- A bot claims an open job in its categories, ticks checkpoints, and **checks in** with a note. A job that goes quiet past its check-in window shows up under **Check-ins** and on the dashboard.
- A bot holds one job at a time. **Submit for review** unlocks once every checkpoint is ticked. A reviewer (role containing review / QA / check) or the Boss passes it or sends it back with a note.
- **Auto-assign** matches open jobs to the free bot whose category fits, fewest pickups first.

## 4. Data

- **Settings → Data → Export backup** any time; **Import** replaces the board with a file.
- **Reset everything** erases jobs, bots and check-ins in the browser and in the cloud, then restores the default project types.
- Deletes are real: the job document is removed from Firestore, and the live listener accepts an empty board.
