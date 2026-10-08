# phunnysunny operating brief

## Purpose

`phunnysunny` is a personal bio and curated local project index for the strongest projects in `/Users/sa/Developer`.

## Important files

- `index.html` contains the page structure and project data markup.
- `home.css` owns the homepage visual system: violet palette tokens (light and dark), bento, reels gallery, carousel, and per-project card shades. It self-hosts Outfit from `assets/fonts/`.
- `styles.css` owns the TikTok review surface, Postshort, demo, and legal pages. Homepage rules must not go back into it.
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

The homepage leads with the creator work: AI-made video channels and the tools behind them (hero, "The creator stack" bento, and a reels gallery using real frames from `social_media_manager/Reels Manager/films`). The whole homepage uses one violet hue family (lavender, lilac, orchid, plum) with `--accent` as the only interactive color; do not reintroduce other accent hues. Below the creator sections it stays a curated `/Users/sa/Developer` project list with one short sentence per retained project. The curated grid is labeled "Ongoing experiments" and each retained project card keeps a distinct `data-project`, `data-icon`, and its own violet-family shade in CSS. Keep homepage links to `/postshort`, `/privacy`, and `/tos`; the Google OAuth app depends on them. Do not show every local folder: remove duplicate branch copies, temporary scratch builds, incomplete concept variants, and generic experiments unless the user asks for a full inventory. Real Ones, Skills, Dark Mode Everywhere, Pet Zoo, and `game2` are the launched-project showcases near the top of the page. Keep the launched showcase as a simple auto-advancing centered card list on tablet/desktop, with the active card centered and left/right neighbors partially visible and translucent; stack the cards plainly on small phones. Real Ones should keep its App Store download link, store screenshots, and local `real_ones` repo description aligned. Skills is hosted at `https://skills.phunnysunny.com/` from `/Users/sa/Developer/skills_final` and should use the public skills marketplace/GitHub import/install prompt framing from that repo. Dark Mode Everywhere is a public Chrome extension repo at `https://github.com/atishaycn/darkmodeeverywhere` and should use the default-on dark mode plus per-site toggle framing. Pet Zoo is hosted at `https://petzoo.phunnysunny.com/` from `/Users/sa/Developer/petsPark` and should use the Pets Park/Petdex/Codex pets framing from that repo. `game2` is hosted at `https://game.phunnysunny.com/` as Bug Blaster: Swarm Run and should use facts from `/Users/sa/Developer/game2`. Prefer small static changes unless the site needs a real build pipeline.

The `/tiktok` page should read as a public creator tool, not a personal/internal automation page. Keep the first screen as an app dashboard: connect TikTok, create/upload slideshow media, preview caption and disclosure, then submit through the sandbox demo flow. The sandbox demo can use the sample slideshow button for reviewer recordings without requiring file upload. Reviewer-facing copy should clearly mention Login Kit, `user.info.basic`, Content Posting API, `video.publish`, public creator use, privacy, and data deletion.
