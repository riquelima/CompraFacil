I will implement a **Single Page Application (SPA)** architecture to ensure the Navbar remains truly fixed and persistent without reloading, while keeping the existing file structure for fallback.

### 1. Architecture Refactoring (SPA Router)
*   **Central Router (`js/app.js`)**: I will upgrade the `navigate()` function to use `fetch` and `history.pushState` instead of full page reloads.
*   **"Fetch & Swap" Strategy**: When navigating:
    1.  Fetch the target HTML file.
    2.  Extract the `<main id="app-content">` section.
    3.  Swap the current content with the new content.
    4.  Execute the page-specific JavaScript logic (which I will modularize).
    5.  Update the Navbar's "active" state without redrawing it.

### 2. Standardization of Views
I will modify `usuario.html`, `lista.html`, `inventario.html`, and `novalista.html` to share a consistent structure:
*   **Container**: Wrap unique page content in `<main id="app-content">`.
*   **Navbar**: Insert the identical **Fixed Navbar** HTML code at the bottom of every file (ensuring direct loads still work).
*   **CSS**: Apply `position: fixed`, `bottom: 0`, `z-index: 50` to the Navbar container.

### 3. Logic Modularization
To support the SPA behavior (where scripts don't automatically re-run on swap), I will extract the logic from the `<script>` tags of each page into globally accessible initialization functions in `js/app.js` (or a new `js/controllers.js`):
*   `initHome()` (from `usuario.html`)
*   `initListDetail()` (from `lista.html`)
*   `initInventory()` (from `inventario.html`)
*   `initNewList()` (from `novalista.html`)

The Router will automatically call the correct function after loading the new content.

### 4. Animation & Styles
*   **Navbar**: Enforce `transition: none` and static positioning.
*   **Content**: Apply smooth fade/slide transitions *only* to `#app-content` via `css/transitions.css`.

### Execution Steps
1.  **Refactor JS**: Move logic from HTML files to named functions in `js/app.js`.
2.  **Setup Router**: Implement the SPA `navigate` logic in `js/app.js`.
3.  **Update HTML**: Apply the standard structure (Main + Fixed Navbar) to all 4 key files.
4.  **Verify**: Test navigation between tabs to ensure the Navbar never blinks or reloads.