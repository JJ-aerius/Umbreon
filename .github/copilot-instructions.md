# Copilot Instructions - Umbreon Website

## Project Overview
Umbreon is a static website for Swiss-built very fast drones, built with vanilla HTML, CSS, and JavaScript. The design follows a SpaceX/Rocket Lab-inspired aesthetic with a black background and cyan accent colors (`--accent: #0ea5e9`). **No frameworks, no build tools** — just modern web standards.

## Architecture

### Partials Injection System
The site uses client-side HTML injection for shared components:
- `partials/header.html` and `partials/footer.html` are fetched via `fetch()` in `main.js`
- Placeholders: `<div id="header-placeholder"></div>` and `<div id="footer-placeholder"></div>`
- Navigation is re-initialized after injection by dynamically loading `nav.js`
- **Critical:** All HTML files must include both placeholder divs and load `main.js` before closing `</body>`

### Multi-Endpoint Form System
Forms use a **specific Formspree endpoint per form type** (not a single shared endpoint):
```javascript
const FORMSPREE_ENDPOINTS = {
  business: "https://formspree.io/f/xdkwbqkz",
  careers: "https://formspree.io/f/mblzwnld",
  investors: "https://formspree.io/f/mldpzqdp"
};
```
- Forms identify themselves via `data-formspree="business|careers|investors"` attribute
- If endpoint is empty/missing, form shows disabled state with notice
- Never consolidate to a single endpoint — each form requires its own

### Navigation Pattern
- **Desktop:** Sticky header with dropdown for "About" submenu (`about.html#about-us`, `#team`, `#gallery`)
- **Mobile:** Full-screen overlay slides in from right (Rocket Lab style)
- Active page highlighting uses `aria-current="page"` and `.active` class
- Focus trap implementation in `nav.js` ensures keyboard users can't escape menu

## Design System (CSS Variables)

```css
--bg: #000000           /* Pure black background */
--bg-2: #0a0a0a         /* Section alternates */
--text: #ffffff         /* Primary text */
--text-dim: #b0b0b0     /* Body copy */
--accent: #0ea5e9       /* Cyan primary (links, CTAs) */
--accent-2: #38bdf8     /* Lighter cyan */
--border: #1a1a1a       /* Subtle borders */
--radius: 4px           /* Sharp, minimal rounding */
```

Typography uses `clamp()` for fluid scaling. Avoid hardcoded `px` sizes for text.

## Key Features & Implementation Patterns

### Interactive Speed Intelligence Module (`index.html`)
- Data is **never hardcoded in HTML** — all content lives in `SPEED_DATA` object in `main.js`
- Three tabs: Speed Levels, Reference Aircraft, Relative to Sound
- Interactive slider (0-35,000 km/h) calculates Mach and highlights speed bands
- To update data, edit the `SPEED_DATA` object (lines ~7-57 in `main.js`)

### Form Validation & Submission
- Real-time validation on blur/input events
- Inline error messages with `aria-invalid` and `aria-live` for screen readers
- Honeypot field (hidden) for spam protection
- Success state replaces entire form with thank-you message
- All forms must include: `required`, `minlength`, `type="email"` attributes for native validation

### Accessibility Requirements (WCAG AA)
- Skip link always present: `<a href="#main-content" class="skip-link">`
- Focus trap in mobile menu (Tab/Shift+Tab cycles through menu items only)
- Escape key closes mobile menu and lightbox
- `aria-expanded`, `aria-haspopup`, `aria-invalid` managed dynamically via JS
- Respects `prefers-reduced-motion` for animations

## File Structure Conventions

```
├── index.html              # Homepage with hero + Speed Intelligence
├── about.html              # Team section includes Advisory Board below main team
├── umbreon-1.html          # Product specs
├── business-inquiry.html   # Has intro text ABOVE form (not below)
├── careers.html, investors.html, privacy-terms.html, 404.html
├── partials/               # Injected via JS (never edit HTML directly)
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── reset.css       # Never modify (modern CSS reset)
│   │   └── styles.css      # Single source of truth for all styling
│   ├── js/
│   │   ├── main.js         # Core: partials, forms, Speed Intelligence, lightbox
│   │   └── nav.js          # Mobile menu, focus trap, scroll effects
│   └── img/                # SVG placeholders + favicon
```

## Development Workflow

### Local Testing
```powershell
# Option 1: Python (most common)
python -m http.server 8000

# Option 2: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

**Always test locally** — no static file serving means partials won't load (CORS issues).

### Adding New Pages
1. Copy `index.html` structure (header/footer placeholders, CSS/JS links)
2. Include `<script src="assets/js/main.js"></script>` before `</body>`
3. Add page link to `partials/header.html` (both desktop `.nav-list` and mobile `.nav-mobile-list`)
4. Follow semantic HTML: `<main id="main-content">`, proper heading hierarchy

### Modifying Shared Components
- **Header/Footer:** Edit `partials/header.html` or `partials/footer.html` — changes apply to all pages
- **Styles:** Only edit `assets/css/styles.css` (never inline styles except for rare one-offs)
- **Navigation:** Changes in `partials/header.html` must be mirrored in mobile nav section

## Critical "Gotchas"

1. **Never remove `data-formspree` attribute** from forms — it's how `main.js` determines which endpoint to use
2. **Button styling:** Homepage hero buttons use `btn-secondary` (outline style), not `btn-primary`
3. **Team section:** Advisory Board section goes **below** main team grid in `about.html`
4. **LinkedIn links:** Use `target="_blank" rel="noopener noreferrer"` for external links
5. **Mobile menu:** Focus trap is essential — removing `trapFocus()` breaks keyboard accessibility

## Testing Checklist Before Commits
- [ ] All pages load header/footer correctly
- [ ] Mobile menu slides in from right, closes on Escape/overlay click
- [ ] Forms show correct endpoint or disabled state
- [ ] Speed Intelligence slider updates Mach calculation
- [ ] Gallery lightbox opens/closes (about.html)
- [ ] Active page highlighted in nav (desktop + mobile)
- [ ] No console errors in browser DevTools

## Project Philosophy
- **Static-first:** No server-side rendering, no build step, deployable to GitHub Pages as-is
- **Vanilla JS:** Avoid introducing dependencies — modern browser APIs are sufficient
- **Accessibility is non-negotiable:** Every interactive element must be keyboard-accessible
- **Design consistency:** All pages follow the same SpaceX-inspired aesthetic

---

*Last updated: October 18, 2025 | See `CHANGES_2025-10-18.md` for recent updates*
