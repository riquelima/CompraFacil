I will modify `js/app.js` to ensure the loading indicator (`global-loading`) is correctly positioned within the `app-content` container during transitions, respecting the visual hierarchy requested.

**Plan:**
1.  **Update `loadPageContent` in `js/app.js`**:
    *   Change the logic for creating/locating `globalLoader`.
    *   Check if the `#app-content` container exists.
    *   If it exists, move `globalLoader` to be a child of `#app-content` (instead of `document.body`).
    *   Update `globalLoader` CSS classes:
        *   Change position from `fixed` to `absolute`.
        *   Keep `inset-0` to fill the container.
        *   Change `z-index` from `100` to `40`. This ensures it sits **below** the Header (`z-50`) and Bottom Navigation (`z-50`), but **above** the Main Content (`z-0` to `z-10`).
    *   Add a fallback to `document.body` and `fixed` positioning if `#app-content` is missing (for safety/legacy support).

**Outcome:**
The loading spinner will appear as an overlay strictly covering the content area, appearing "underneath" the fixed header and navigation bar, creating a more native and polished app-like transition.