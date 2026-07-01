// Disinterested — adds a one-click "Not interested" button to X.com tweets.
// It drives X's own UI: opens the "···" menu behind the scenes and clicks the
// existing "Not interested in this post" item. No API, no tokens, no permissions.

(() => {
  "use strict";

  // Text of the menu item to click. Kept here so it's easy to tweak if X
  // changes wording, or to translate for a non-English UI.
  const MENU_ITEM_TEXT = "Not interested";

  const MARKER = "disinterestedAttached"; // dataset flag guarding duplicates

  // Muted "no entry" / block glyph, styled via content.css.
  const ICON_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">' +
    '<g><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10' +
    "S17.514 2 12 2zm0 2c1.847 0 3.545.634 4.9 1.686L5.686 16.9A7.951 7.951 0 0 1 4 12c0-4.411 3.589-8 8-8zm0 16a7.951 7.951 0 0 1-4.9-1.686L18.314 7.1A7.951 7.951 0 0 1 20 12c0 4.411-3.589 8-8 8z\"></path></g></svg>";

  // First path segments that are X routes/features, not user handles.
  const NON_PROFILE_ROUTES = new Set([
    "home", "explore", "notifications", "messages", "search", "settings",
    "i", "compose", "hashtag", "bookmarks", "lists", "communities", "jobs",
    "tos", "privacy", "following", "followers",
  ]);

  // Profile pages (/user, /user/with_replies, /user/media, ...) don't offer a
  // "Not interested" option, so we skip the button there. Tweet detail pages
  // (/user/status/123) and the home/search/etc. feeds keep it.
  function isProfilePage() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return false;
    if (NON_PROFILE_ROUTES.has(parts[0])) return false;
    if (parts.includes("status")) return false;
    return true;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Wait for a node matching `selector` to appear (menu renders async).
  async function waitFor(selector, { timeout = 1000, interval = 20 } = {}) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const el = document.querySelector(selector);
      if (el) return el;
      await sleep(interval);
    }
    return null;
  }

  function closeAnyMenu() {
    document.body.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
  }

  async function markNotInterested(article) {
    const caret = article.querySelector('button[data-testid="caret"]');
    if (!caret) return;

    caret.click();

    const menu = await waitFor('div[data-testid="Dropdown"]');
    if (!menu) {
      closeAnyMenu();
      return;
    }

    const items = menu.querySelectorAll('[role="menuitem"]');
    const target = Array.from(items).find((item) =>
      (item.textContent || "").includes(MENU_ITEM_TEXT)
    );

    if (target) {
      target.click();
    } else {
      // e.g. promoted/ad posts have no such option — bail out cleanly.
      closeAnyMenu();
    }
  }

  function buildButton(article) {
    const btn = document.createElement("button");
    btn.className = "disinterested-btn";
    btn.type = "button";
    btn.title = "Not interested";
    btn.setAttribute("aria-label", "Not interested");
    btn.innerHTML = ICON_SVG;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      markNotInterested(article);
    });

    return btn;
  }

  function injectInto(article) {
    if (article.dataset[MARKER]) return;

    // The action row (reply/retweet/like/bookmark) is a role="group" container.
    const actionBar = article.querySelector('div[role="group"]');
    if (!actionBar) return; // some articles (e.g. hidden state) have none yet

    article.dataset[MARKER] = "1";
    actionBar.appendChild(buildButton(article));
  }

  function scan() {
    if (isProfilePage()) return; // no "Not interested" option on profiles
    document
      .querySelectorAll('article[data-testid="tweet"]')
      .forEach(injectInto);
  }

  // Debounced observer covers infinite scroll and SPA navigation.
  let pending = null;
  const observer = new MutationObserver(() => {
    if (pending) return;
    pending = setTimeout(() => {
      pending = null;
      scan();
    }, 150);
  });

  observer.observe(document.body, { childList: true, subtree: true });
  scan();
})();
