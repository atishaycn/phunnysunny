# phunnysunny operating brief

## Purpose

`phunnysunny` is a personal bio and curated local project index for the strongest projects in `/Users/sa/Developer`.

## Important files

- `index.html` contains the page structure and project data markup.
- `styles.css` owns the visual system, responsive layout, motion-ready states, and per-project card themes/icons.
- `script.js` adds GSAP-enhanced interactions with safe no-JS fallbacks.
- `vercel.json` keeps the static deployment simple and domain-friendly.

## Run and verify

- Local preview: `npx serve .` or any static file server from the repo root.
- Quick static check: open `index.html` through a local server and inspect the console.
- Deploy: `vercel --prod` from the repo root after GitHub changes are pushed.

## Current brief

Keep this as a simple, fun bio page with a curated `/Users/sa/Developer` project list and one short sentence per retained project. The curated grid is labeled "Ongoing experiments" and each retained project card should keep a distinct `data-project`, `data-icon`, color theme, and background motif in CSS. Do not show every local folder: remove duplicate branch copies, temporary scratch builds, incomplete concept variants, and generic experiments unless the user asks for a full inventory. Real Ones, Skills, Pet Zoo, and `game2` are the launched-project showcases near the top of the page. Keep the launched showcase as a simple auto-advancing centered card list on tablet/desktop, with the active card centered and left/right neighbors partially visible and translucent; stack the cards plainly on small phones. Real Ones should keep its App Store download link, store screenshots, and local `real_ones` repo description aligned. Skills is hosted at `https://skills.phunnysunny.com/` from `/Users/sa/Developer/skills_final` and should use the public skills marketplace/GitHub import/install prompt framing from that repo. Pet Zoo is hosted at `https://petzoo.phunnysunny.com/` from `/Users/sa/Developer/petsPark` and should use the Pets Park/Petdex/Codex pets framing from that repo. `game2` is hosted at `https://game.phunnysunny.com/` as Bug Blaster: Swarm Run and should use facts from `/Users/sa/Developer/game2`. Prefer small static changes unless the site needs a real build pipeline.
