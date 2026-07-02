# Tweh

*tweet, meh.*

A tiny Chrome/Arc extension that adds a one-click **"Not interested"** button to every
tweet's action row on x.com — no more clicking the "···" menu per post.

[![Available in the Chrome Web Store](https://img.shields.io/chrome-web-store/v/gimblpdhecjgflikgkojfahlgnlhiijg?label=Chrome%20Web%20Store&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/tweh/gimblpdhecjgflikgkojfahlgnlhiijg)

## Demo

**With Tweh** — one click on the button, and the post is gone:

![With Tweh — one click marks the post Not interested](https://github.com/yashvardhan-kukreja/tweh/releases/download/v1.0.0/demo-with-tweh.gif)

**Without Tweh** — the usual "···" → *Not interested in this post* dance:

![Without Tweh — clicking through the three-dot menu](https://github.com/yashvardhan-kukreja/tweh/releases/download/v1.0.0/demo-without-tweh.gif)

## How it works

Instead of touching X's private API (fragile, needs auth tokens), the button just drives
X's own UI: on click it opens the tweet's "···" menu behind the scenes and clicks the
real **"Not interested in this post"** item for you. You still get X's built-in **Undo**
toast, so a misclick is easy to reverse.

Zero dependencies, no build step, no special permissions — one content script and a bit of CSS.

## Install

### From the Chrome Web Store (recommended)

**[➕ Add Tweh to Chrome](https://chromewebstore.google.com/detail/tweh/gimblpdhecjgflikgkojfahlgnlhiijg)**

One click to install — and it auto-updates. Works in **Chrome, Arc, Brave, Edge**, and other
Chromium-based browsers.

### Manually (load unpacked — for development or before approval)

1. Download this repo (green **Code** button → *Download ZIP*, or grab `tweh.zip` from the
   [latest release](https://github.com/yashvardhan-kukreja/tweh/releases/latest)) and unzip it.
2. **Chrome:** open `chrome://extensions`, toggle **Developer mode** (top-right).
   **Arc:** open `arc://extensions` (or Extensions menu → Manage Extensions — Arc is Chromium-based).
3. Click **Load unpacked** and select the `tweh` folder.
4. Open [x.com](https://x.com) — you'll see a small circle-slash icon in each tweet's action row.

After editing the code, hit the **reload** icon on the extension card and refresh your x.com tab.

## Usage

Click the icon (next to the like button) on any tweet to mark it "Not interested" instantly.
It works on the home timeline, search results, and individual post pages. Profile pages are
skipped (X doesn't offer a "Not interested" option there), and promoted/ad posts without the
option are ignored silently.

## Files

- `manifest.json` — Manifest V3 config.
- `content.js` — the whole feature (~130 lines).
- `content.css` — button styling.
- `icon.png` — optional toolbar icon (Chrome falls back to a default if absent).

## License

[MIT](LICENSE)
