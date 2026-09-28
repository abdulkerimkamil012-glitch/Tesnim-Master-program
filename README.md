# የተስኒም ማስተር ፕሮግራም (Ye-Tesnim Master Program)

An Amharic-only, glassmorphism-styled daily program tracker: meals, daily
reminders, and any custom program you add — each fully editable, with a
dedicated **Calendar / Statistics / Edit** detail view per program,
motivating daily and weekly reports, and editable reference pages
(prohibited foods, notices, and any you add).

This is a plain static site (HTML/CSS/JS built with Vite). **Nothing in
it depends on Claude or any Claude-only feature** — no in-chat API calls,
no artifact-only storage. It runs anywhere a static site runs (your own
phone via `npm run dev`, or any static host once built).

## What it does

- Shows the correct programs for **today's weekday automatically**.
- One tap **✓** marks a program done for that day.
- Every card also shows its own **weekly overview strip** (Mon–Sun,
  always the real current week) — tap any day in it to tick that day
  directly — plus a footer with its streak, this week's %, and 📅/📊
  shortcuts straight into that program's Calendar/Statistics tab.
- Tap a program's **name/description** (or its 📅/📊 shortcut) to open
  its own **detail view**:
  - **ቀን መቁጠሪያ (Calendar)** — a month grid: filled = done, red outline =
    missed, plain outline = still upcoming, plus its current streak and
    full description.
  - **ስታትስቲክስ (Statistics)** — a 7-day trend row, current streak, and
    percentage completed **today / this week / this month / this year /
    all-time (since you started it)**.
  - **አርትዕ (Edit)** — the *full* editor: category, type (single ✓ or
    master/checklist with its own sub-items), name, description, and
    which days it appears on. Delete it from here too.
- **✎ on the card** is a *fast* edit (name + description only) that asks
  "today only" or "every time" — for quick day-of tweaks. **🗑** deletes
  it (with a 5-second **Undo**).
- **＋** adds a new program. Field order: **category → type (single or
  master, with its own sub-item list) → name → description → days**.
- Long ingredient lines (joined with "+") now render as **bullet
  points**, not one dense paragraph.
- **"የቀን ሪፖርት"**: today's %, streak, what's left vs. done.
- **"ሳምንታዊ ሪፖርት"**: a 7-day bar chart, weekly streak, "needs attention" list.
- **ገፆች (Pages)**: read-only reference pages — **የተከለከሉ ምግቦች**
  (prohibited foods) and **ማሳሰቢያ** (notices) ship by default, but every
  page has its own ✎ to rewrite its full text, 🗑 to delete it (with
  Undo), and a **＋ ገፅ** button adds as many new read-only pages as you
  like (e.g. a "shopping list" or "doctor's notes" page).
- **🗑 Recycle Bin** (⚙ Settings → ቆሻሻ መጣያ): every program or page you
  delete — from the card's 🗑, the Edit tab's delete, or a page's 🗑 —
  is kept here **permanently** (in `localStorage`, not just the 5-second
  Undo toast) until you tap **♻ መልስ** to restore it or **🗑 ለዘላለም ሰርዝ**
  to remove it for good. A "ባዶ አድርግ" button empties the whole bin at
  once. Restoring a built-in meal/reminder/page puts it back exactly as
  it was when deleted.
- **⚙ Settings**: export/import a full backup (now includes pages and
  the Recycle Bin too), and an optional daily reminder.
- Installable — "Add to Home Screen" on Android/Chrome (a minimal,
  no-cache service worker is included just to satisfy that checklist;
  see `public/sw.js`'s comment for why it deliberately caches nothing).
- Light/dark theme toggle (◐), remembers your choice.
- Everything is saved in the browser's `localStorage` — nothing is sent
  to a server. **Use the Export button regularly** — clearing browser
  data erases everything on that device.

## The fix for "editing data.js didn't reach phones that already used the app"

Previously, once a phone opened the app once, `data.js` was never read
again — a typo fix in the code never reached that phone. Now, **every
time the app loads**, it re-checks `data.js` and refreshes any meal,
reminder, or page **that the person has never personally edited from
within the app**. The moment someone edits something themselves (saving
an Edit-tab change, or a quick-edit "every time"), that one item becomes
theirs — later `data.js` fixes won't silently overwrite their own
wording. Their tick history is never touched by any of this. See the
`syncSeedPrograms` / `syncSeedPages` comments in `src/main.js`.

## About the daily reminder

Uses the browser's own Notification permission, checked once a minute
while the app is open. Browsers don't allow a website to notify while
fully closed without a real backend/push server, so this only fires
while the tab is open (or backgrounded on some phones). A true
"closed-app" push notification needs a small backend — ask if you want
that built later.

## Project structure

```
tesnim-master-program/
├── index.html            # Page shell: header, all sheets/panels, detail view markup
├── package.json           # Dependencies + npm scripts
├── vite.config.js         # Build tool config (relative paths for any host)
├── netlify.toml           # Netlify build settings (auto-detected)
├── .env.example           # Placeholder — no keys currently required
├── .gitignore
├── public/
│   ├── favicon.svg        # Browser tab icon / app logo mark
│   ├── manifest.webmanifest  # Lets phones "Add to Home Screen"
│   └── sw.js               # No-cache service worker (installability only)
└── src/
    ├── main.js            # All app logic: programs, pages, detail view, reports, sheets
    ├── data.js            # Starter meals/reminders/pages — see the sync note above
    └── style.css          # Colours, fonts, layout
```

Once the app has run once, everything (meals, reminders, pages, and any
you add) lives in `localStorage` as editable objects. `data.js` stays
the source of truth for anything not yet personally edited (see the fix
above) — it's not just a "first run only" file anymore.

## Install and run locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Creates a static, ready-to-host site in `dist/`. Preview it with:

```bash
npm run preview
```

## Deploy to Vercel

1. Push this project to a GitHub (or GitLab/Bitbucket) repository.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import that repository.
3. Vercel auto-detects Vite. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. You'll get a live `https://your-project.vercel.app` URL in about a minute.
5. Every future push to the repo redeploys automatically.

## Deploy to Netlify

1. Push this project to a GitHub (or GitLab/Bitbucket) repository.
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import an existing project**.
3. Pick the repository. Netlify reads the included `netlify.toml`, so build command (`npm run build`) and publish folder (`dist`) are already set.
4. Click **Deploy site**. You'll get a live `https://your-site.netlify.app` URL shortly after.
5. Every future push to the repo redeploys automatically.

*(No environment variables are needed for either platform — this app has no backend.)*

## Where to edit things

- **Starter meal/reminder/page text** → `src/data.js`. A fix here reaches
  everyone who hasn't personally edited that item (see the fix note above).
- **The ማሳሰቢያ (notices) page** ships with placeholder text asking you to
  fill it in — either edit `src/data.js` directly, or open the ማሳሰቢያ
  pill in the app and tap ✎.
- **Colours** → the `:root { ... }` block at the top of `src/style.css`.
- **App name / logo / browser tab title** → `index.html` (all marked with comments).
- **Fonts** → the Google Fonts `<link>` in `index.html`, plus the `font-family` line in `src/style.css`.

## What changed in this rebuild (from the previous version)

- **New: every card in the main list now shows its own weekly overview**
  — a Mon–Sun strip of days (always the real current week, independent
  of the ‹/› day-nav arrows), amber-outlined for a day it's scheduled
  on, filled solid once done, and a gold ring on today. Tap any day in
  that strip to tick it directly, no need to navigate the whole app to
  that day first. Below it, a quick footer shows 🔥 this program's
  streak, ✓ this week's %, and two shortcuts — 📅 and 📊 — that jump
  straight into that program's Calendar/Statistics tab.
- **New: persistent Recycle Bin.** Deleting a program or page used to
  only give you a 5-second Undo toast — after that it was gone for
  good (or, for a built-in meal/reminder/page, it would actually
  **silently come back** the next time the app loaded, which was a
  real bug: `syncSeedPrograms`/`syncSeedPages` re-adds any built-in
  item that isn't personally customized, with no memory that you'd
  just deleted it). Both are fixed now: every delete moves the item
  into a dedicated **🗑 ቆሻሻ መጣያ** page (⚙ Settings), where it stays
  until you restore it or delete it forever — and a small
  "permanently removed" id list stops built-in items from reappearing
  on their own. See the `trash`/`removedSeedIds` comments in
  `src/main.js` if you want the details.
- **Full edit, not just name/desc**: the new per-program **Edit tab**
  lets you change category, type (single/master), sub-items, and days —
  the old ✎ only changed name/description.
- **Fixed**: `data.js` text fixes now reach phones that already used the
  app (see the dedicated section above) — as long as that item hasn't
  been personally customized.
- **New detail view** per program: **Calendar** (month grid + streak +
  description), **Statistics** (7-day trend + today/week/month/
  year/all-time %), **Edit** (see above).
- **Reordered** the add-program form: category → type (+ sub-items) →
  name → description → days.
- **Bulleted** ingredient lists instead of one dense paragraph.
- **Generalized "prohibited foods" into a "ገፆች" (Pages) system**: any
  number of read-only reference pages, each with its own ✎ full-text
  edit and 🗑 delete; added a **ማሳሰቢያ** (notices) page by request.
- **Undo** (5 seconds) after deleting a program or a page.
- **Installable** — manifest + a deliberately-empty service worker for
  "Add to Home Screen", without risking a stale-content cache.
- **New app logo** (checkmark growing from a leaf, in a ring) replacing
  the previous mark — see the `<svg class="logo">` comment in `index.html`.
- `main.js` reorganized into clearly-commented sections (seed sync,
  pages, detail view tabs, backup) instead of one dense block, so future
  edits are easier to locate.
- Kept from before: seed migration from older single-file versions,
  export/import backup (now includes pages), optional daily reminder,
  light/dark theme, 100%-day celebration animation.

## What I deliberately left out (tell me if you want any of these)

- **Priority / start date / end date / archive** fields per program (seen
  in the reference screenshots) — not requested in the brief; easy to
  add to the Edit tab if wanted.
- **Automatic cloud backup** — still manual export/import; a real
  backend would be needed for automatic, cross-device backup.
- **True closed-app push notifications** — needs a small backend (see
  "About the daily reminder" above).
