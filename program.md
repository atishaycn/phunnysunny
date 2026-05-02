# phunnysunny operating brief

## Purpose

`phunnysunny` is a personal bio and curated local project index for the strongest projects in `/Users/sa/Developer`.

## Important files

- `index.html` contains the page structure and project data markup.
- `styles.css` owns the visual system, responsive layout, and motion-ready states.
- `script.js` adds GSAP-enhanced interactions with safe no-JS fallbacks.
- `vercel.json` keeps the static deployment simple and domain-friendly.

## Run and verify

- Local preview: `npx serve .` or any static file server from the repo root.
- Quick static check: open `index.html` through a local server and inspect the console.
- Deploy: `vercel --prod` from the repo root after GitHub changes are pushed.

## Current brief

Keep this as a simple, fun bio page with a curated `/Users/sa/Developer` project list and one short sentence per retained project. Do not show every local folder: remove duplicate branch copies, temporary scratch builds, incomplete concept variants, and generic experiments unless the user asks for a full inventory. Real Ones and `game2` are the launched-project showcases and should sit beside each other near the top of the page. Real Ones should keep its App Store download link, store screenshots, and local `real_ones` repo description aligned. `game2` is hosted at `https://game.phunnysunny.com/` as Bug Blaster: Swarm Run and should use facts from `/Users/sa/Developer/game2`. Prefer small static changes unless the site needs a real build pipeline.
