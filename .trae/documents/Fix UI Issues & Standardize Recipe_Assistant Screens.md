I will implement the requested fixes and standardizations across the application.

### 1. Update `js/app.js`
*   **Remove "Cheia"**: I will remove the conditional rendering of the "Cheia" span in `initHome`.
*   **Improve "List Not Found"**: Instead of an `alert()`, I will render a friendly "List Not Found" state within the `#app-content` container, including a "Back to Home" button.
*   **Add Logic for Assistant & Recipe**: I will migrate the logic from `assistente.html` and `receita.html` into `initAssistant()` and `initRecipe()` functions in `app.js`.
*   **Global Recipes Data**: I will move the hardcoded `recipes` object to `app.js` so it can be accessed by the Recipe Detail view.

### 2. Standardize `assistente.html`
*   **SPA Structure**: I will wrap the main content in `#app-content` and place the standard **Fixed Navbar** outside.
*   **Color Consistency**: I will update the Tailwind configuration to use `#FFD23F` for `nb-yellow`/`accent-yellow`, ensuring consistency with the Home screen.
*   **Logic Removal**: I will remove the inline scripts, relying on `app.js`.

### 3. Standardize `receita.html`
*   **SPA Structure**: I will apply the standard `#app-content` wrapper and **Fixed Navbar** (solving the "Navbar positioning" issue).
*   **Remove "Marcar como Feita"**: I will delete the "Marcar como Feita" button from the footer.
*   **Color Consistency**: I will update the Tailwind configuration to use `#FFD23F` for yellow.
*   **Logic Removal**: I will remove the inline scripts.

### 4. Verification
*   I will verify that navigation between all screens works without reloading.
*   I will verify that the yellow color is consistent.
*   I will verify that the "Cheia" label is gone.
*   I will verify that invalid list IDs show a proper error message.