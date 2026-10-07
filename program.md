# phunnysunny operating brief

## Purpose

`phunnysunny` is a personal bio and curated local project index for the strongest projects in `/Users/sa/Developer`.

## Important files

- `index.html` contains the page structure and project data markup.
- `styles.css` owns the visual system, responsive layout, motion-ready states, and per-project card themes/icons.
- `script.js` adds GSAP-enhanced interactions with safe no-JS fallbacks.
- `vercel.json` keeps the static deployment simple and domain-friendly.
- `tiktok.html` and `tiktok.js` provide the public TikTok creator tool review surface at `/tiktok`.

## Run and verify

- Local preview: `npx serve .` or any static file server from the repo root.
- Quick static check: open `index.html` through a local server and inspect the console.
- Instagram Reel API dry run: store `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`, and `INSTAGRAM_USERNAME` in ignored `.env`, then run `npm run ig:post-reel -- --video-url=https://example.com/video.mp4 --caption="Test caption"`. Add `--publish` only when intentionally posting live.
- Deploy: `vercel --prod` from the repo root after GitHub changes are pushed.
- TikTok review surface: open `/tiktok`, connect the sandbox demo account, upload/select media, preview caption details, and submit the sandbox publish request.

## Current brief

Keep this as a simple, fun bio page with a curated `/Users/sa/Developer` project list and one short sentence per retained project. The curated grid is labeled "Ongoing experiments" and each retained project card should keep a distinct `data-project`, `data-icon`, color theme, and background motif in CSS. Do not show every local folder: remove duplicate branch copies, temporary scratch builds, incomplete concept variants, and generic experiments unless the user asks for a full inventory. Real Ones, Skills, Dark Mode Everywhere, Pet Zoo, and `game2` are the launched-project showcases near the top of the page. Keep the launched showcase as a simple auto-advancing centered card list on tablet/desktop, with the active card centered and left/right neighbors partially visible and translucent; stack the cards plainly on small phones. Real Ones should keep its App Store download link, store screenshots, and local `real_ones` repo description aligned. Skills is hosted at `https://skills.phunnysunny.com/` from `/Users/sa/Developer/skills_final` and should use the public skills marketplace/GitHub import/install prompt framing from that repo. Dark Mode Everywhere is a public Chrome extension repo at `https://github.com/atishaycn/darkmodeeverywhere` and should use the default-on dark mode plus per-site toggle framing. Pet Zoo is hosted at `https://petzoo.phunnysunny.com/` from `/Users/sa/Developer/petsPark` and should use the Pets Park/Petdex/Codex pets framing from that repo. `game2` is hosted at `https://game.phunnysunny.com/` as Bug Blaster: Swarm Run and should use facts from `/Users/sa/Developer/game2`. Prefer small static changes unless the site needs a real build pipeline.

The `/tiktok` page should read as a public creator tool, not a personal/internal automation page. Keep the first screen as an app dashboard: connect TikTok, create/upload slideshow media, preview caption and disclosure, then submit through the sandbox demo flow. The sandbox demo can use the sample slideshow button for reviewer recordings without requiring file upload. Reviewer-facing copy should clearly mention Login Kit, `user.info.basic`, Content Posting API, `video.publish`, public creator use, privacy, and data deletion.
