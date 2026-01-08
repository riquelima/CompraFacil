I will implement the requested changes to standardize `configuracoes.html` and update the icon system to use the provided images.

### 1. Refactor `configuracoes.html`
*   **Structure**: I will wrap the header and content in the standard `#app-content` container and place the **Fixed Navbar** outside, ensuring consistent behavior with other pages.
*   **Logic Extraction**: I will move the inline `init()` and `handleLogout()` scripts from `configuracoes.html` to a new `initSettings()` function in `js/app.js`.
*   **Cleanup**: I will fix the duplicate `</body>` tags found in the file.

### 2. Update Icon System (`novalista.html` & `js/app.js`)
*   **Icon Replacement**: In `novalista.html`, I will replace the 8 `material-symbols-outlined` spans with `<img>` tags using the specific Flaticon URLs provided.
*   **Value Update**: I will update the radio button `value` attributes to store the **Image URL** instead of the icon name. This ensures the database saves the correct image reference.
*   **Rendering Logic**: I will update `initHome()` in `js/app.js` to intelligently render the list icon:
    *   **If it's a URL**: Render an `<img>` tag.
    *   **If it's a name** (legacy data): Render the original `<span>` with the Material Symbol.
*   **Styling**: I will ensure the images are properly sized and positioned within the selection cards and the home list cards.

### 3. Update Router (`js/app.js`)
*   I will register the `'configuracoes.html'` route in the `initPageLogic` function to call `initSettings()` when navigated to.

This approach guarantees that both new lists (with images) and old lists (with symbols) work perfectly, and the Settings page becomes a fully integrated part of the SPA.