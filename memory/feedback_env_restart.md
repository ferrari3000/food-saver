---
name: Backend restart on .env changes
description: User must manually restart the backend when .env is updated — node --watch does not detect .env changes
type: feedback
---

Always remind the user to restart the backend manually after editing `.env`.

**Why:** `node --watch` only monitors `.js` files, not `.env`. If the user updates `.env` and the server doesn't restart, env vars will be stale and cause confusing errors (e.g. "Missing API key" even though the key is set).

**How to apply:** Any time we add or change a `.env` value, remind the user: "You'll need to restart the backend manually for this to take effect — `node --watch` doesn't pick up `.env` changes."
