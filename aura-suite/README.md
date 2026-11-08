# Aura Suite: Skycast (weather) and Taskly (to-do)

Two independent static sites. No build step, no API keys, no cost. Installable as apps (PWA) and work offline after the first visit.

## 0. One-click run
- Windows: double-click `start.bat`
- Mac: double-click `start.command` (first time: right-click > Open)
- Linux: run `./start.sh`
It starts a local server and opens a page with both apps. Needs Python (preinstalled on Mac/Linux) or Node.js; otherwise it opens the files directly.

## 1. Run locally
- Easiest: double-click `skycast/index.html` or `taskly/index.html`. (Offline install and caching only work over http, see below.)
- Local server (recommended): install Node.js LTS from nodejs.org, then:
  `npx serve skycast` (and `npx serve taskly` in another terminal), then open the printed URL.

## 2. Put it on GitHub
1. Install Git (git-scm.com) and make a free account at github.com.
2. On github.com click New repository. Name it `skycast`. Leave it empty (no README). Repeat for `taskly`.
3. In a terminal:
   ```
   cd skycast
   git init
   git add .
   git commit -m "feat: initial release"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/skycast.git
   git push -u origin main
   ```
   Repeat inside the `taskly` folder with its own repository URL.

## 3. Deploy on Netlify (free)
Option A, fastest: go to app.netlify.com/drop and drag the folder in.
Option B, auto-deploy: Netlify > Add new site > Import an existing project > GitHub > pick the repo.
Build command: leave empty. Publish directory: `.`  Then Deploy.
After this, every `git push` redeploys the site automatically. Rename the site under Site configuration > Change site name.

## 4. Custom domain (optional)
Netlify > Domain management > Add a domain. HTTPS is free and automatic.

## 5. Updating later
Edit `index.html`, then `git add . && git commit -m "fix: ..." && git push`.

## Notes
- Weather data: Open-Meteo (free, no key, non-commercial use only).
- Taskly keeps data in your browser. Use Export for backups; clearing browser data deletes tasks.
- Install on phone: open the live URL, then Share/Menu > Add to Home Screen.

## AI features (optional, free)
1. Get a free key at aistudio.google.com.
2. Deploy through GitHub (Netlify > Import from GitHub). Drag-and-drop may not build functions.
3. Netlify > Site configuration > Environment variables > add `GEMINI_API_KEY`. Redeploy.
Without a key, both apps use built-in rule-based answers. Optional: `GEMINI_MODEL` to change the model.
Test locally with `cd skycast && npx netlify-cli dev`.

## Tests and CI
`npm test` checks files, script syntax and the AI function. GitHub Actions runs it on every push (`.github/workflows/ci.yml`).
Push the whole `aura-suite` folder as one repo and create two Netlify sites from it, setting Base directory to `skycast` or `taskly`.
