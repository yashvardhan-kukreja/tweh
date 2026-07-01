# Tweh

*tweet, meh.*

A tiny Chrome/Arc extension that adds a one-click **"Not interested"** button to every
tweet's action row on x.com — no more clicking the "···" menu per post.

## Demo

**With Tweh** — one click on the button, and the post is gone:

https://github.com/yashvardhan-kukreja/tweh/releases/download/v1.0.0/demo-with-tweh.mp4

**Without Tweh** — the usual "···" → *Not interested in this post* dance:

https://github.com/yashvardhan-kukreja/tweh/releases/download/v1.0.0/demo-without-tweh.mp4

## How it works

Instead of touching X's private API (fragile, needs auth tokens), the button just drives
X's own UI: on click it opens the tweet's "···" menu behind the scenes and clicks the
real **"Not interested in this post"** item for you. You still get X's built-in **Undo**
toast, so a misclick is easy to reverse.

Zero dependencies, no build step, no special permissions — one content script and a bit of CSS.

## Install (load unpacked)

1. **Chrome:** open `chrome://extensions`, toggle **Developer mode** (top-right).
   **Arc:** open `arc://extensions` (or Extensions menu → Manage Extensions — Arc is Chromium-based).
2. Click **Load unpacked** and select this `tweh` folder.
3. Open [x.com](https://x.com) — you'll see a small circle-slash icon in each tweet's action row.

After editing the code, hit the **reload** icon on the extension card and refresh your x.com tab.

## Usage

Click the icon (next to the like button) on any tweet to mark it "Not interested" instantly.
It works on the home timeline, profiles, search results, and replies. Promoted/ad posts that
have no "Not interested" option are skipped silently.

## Files

- `manifest.json` — Manifest V3 config.
- `content.js` — the whole feature (~130 lines).
- `content.css` — button styling.
- `icon.png` — optional toolbar icon (Chrome falls back to a default if absent).

## License

[MIT](LICENSE)
