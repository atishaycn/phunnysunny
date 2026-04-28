# phunnysunny operating brief

## Purpose

`phunnysunny` is a personal bio and local project index for the projects in `/Users/sa/Developer`.

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

Keep this as a simple, fun bio page with a complete `/Users/sa/Developer` project list and one short sentence per project. Prefer small static changes unless the site needs a real build pipeline.
