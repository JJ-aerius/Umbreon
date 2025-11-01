Disclaimer: This webpage is intended solely for demonstration purposes; therefore, all information presented herein should not be considered accurate or reliable.

# Umbreon - Swiss Very Fast Drones

A modern, fully responsive static website built with HTML, CSS, and vanilla JavaScript. Features a SpaceX/Rocket Lab-inspired design with a deep dark blue theme.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with full-screen slide-in mobile menu
- **Interactive Speed Intelligence Module**: Dynamic data visualization with speed calculator
- **Accessible**: WCAG AA compliant with keyboard navigation, focus management, and screen reader support
- **Performance Optimized**: Lazy loading, minimal dependencies, lightweight codebase
- **Form Integration**: Ready for form endpoint integration with client-side validation

## 📁 Project Structure

```
├── index.html              # Homepage with hero, speed intelligence, and highlights
├── about.html              # Company info, team, and gallery with lightbox
├── umbreon-1.html          # Product specifications and features
├── business-inquiry.html   # Business contact form
├── careers.html            # Job listings and application form
├── investors.html          # Investment information and contact form
├── privacy-terms.html      # Privacy policy and terms & conditions
├── 404.html                # Custom 404 page
├── partials/
│   ├── header.html         # Site header (injected via JS)
│   └── footer.html         # Site footer (injected via JS)
├── assets/
│   ├── css/
│   │   ├── reset.css       # Modern CSS reset
│   │   └── styles.css      # Main stylesheet with design system
│   ├── js/
│   │   ├── main.js         # Core functionality and form handling
│   │   └── nav.js          # Navigation, mobile menu, and focus trap
│   └── img/
│       ├── favicon.svg     # Site favicon
│       └── *.svg           # Placeholder images
└── README.md               # This file
```

## 🎨 Design System

### Colors
```css
--bg: #0a1024;           /* Background */
--bg-2: #0e1633;         /* Secondary background */
--text: #e8ecff;         /* Primary text */
--muted: #a8b2d1;        /* Muted text */
--accent: #4da3ff;       /* Primary accent (blue) */
--accent-2: #5fe1ff;     /* Secondary accent (cyan) */
--border: #1e2a55;       /* Border color */
```

### Typography
- Font: Inter or system-ui fallback
- Responsive scaling with `clamp()`
- Heading weights: 600-700
- Body weight: 400

### Layout
- Container max-width: 1200px
- Section padding: `clamp(3rem, 6vw, 6rem)`
- Card border-radius: 16px
- Responsive grids with auto-fit

## 🛠️ Running Locally

### Option 1: Python HTTP Server
```bash
# Navigate to project directory
cd path/to/Umbreon-1

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

### Option 2: Node.js (http-server)
```bash
# Install globally
npm install -g http-server

# Run in project directory
http-server -p 8000

# Open browser to http://localhost:8000
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📝 Customization

### Updating Navigation & Footer
Edit the shared header and footer in one place:
- Header: `partials/header.html`
- Footer: `partials/footer.html`

Changes automatically apply to all pages via JavaScript injection.

### Enabling Forms (Form Backend)
1. Set up your form backend service (e.g., Formspree, Netlify Forms, custom API)
2. Create a form endpoint
3. Open `assets/js/main.js`
4. Replace the placeholder text with your actual endpoints:
   ```javascript
   const FORMSPREE_ENDPOINTS = {
     business: "INSERT_FORMSPREE_LINK_HERE",
     careers: "INSERT_FORMSPREE_LINK_HERE",
     investors: "INSERT_FORMSPREE_LINK_HERE"
   };
   ```

Each form (Business Inquiry, Careers, Investors) uses its own dedicated endpoint identified by the `data-formspree` attribute.

### Editing Speed Intelligence Data
The speed bands, aircraft references, and drone data are stored as a JavaScript object in `assets/js/main.js`:

```javascript
const SPEED_DATA = {
  bands: [ /* Speed level definitions */ ],
  aircraft: [ /* Reference aircraft */ ],
  relativeSpeeds: [ /* Speed comparisons with examples */ ],
  drones: [ /* Drone speed records */ ]
};
```

Edit this object to update the Interactive Speed Intelligence module on the homepage.

### Replacing Placeholder Images
Replace the SVG files in `assets/img/` with your own images:
- `hero.svg` - Homepage hero background
- `product.svg` - Product feature images
- `team-placeholder.svg` - Team member photos
- `gallery-placeholder.svg` - Gallery images

Maintain the same filenames or update references in the HTML.

## 🌐 Deploying to GitHub Pages

1. **Create a GitHub repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/umbreon.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select branch `main` and folder `/ (root)`
   - Click "Save"

3. **Access your site**:
   - Your site will be available at: `https://yourusername.github.io/umbreon/`
   - Allow a few minutes for initial deployment

4. **Custom Domain (Optional)**:
   - Add a `CNAME` file with your domain
   - Configure DNS with your domain provider
   - Add custom domain in GitHub Pages settings

## ♿ Accessibility Features

- **Semantic HTML**: Proper landmarks and heading hierarchy
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Focus Trap**: Mobile menu traps focus for keyboard users
- **ARIA Attributes**: Dynamic aria-expanded, aria-invalid, aria-live regions
- **Skip Link**: Jump to main content
- **Alt Text**: Descriptive alt attributes on all images
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Reduced Motion**: Respects `prefers-reduced-motion` preference

## 🎯 Performance

- **Minimal Dependencies**: No frameworks, vanilla JS only
- **Lazy Loading**: Images load as needed
- **Preload Critical Assets**: Fonts and hero assets preloaded
- **Efficient CSS**: Single minified stylesheet
- **Lightweight JS**: ~15KB total JavaScript (unminified)

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Copyright © 2025 Umbreon. All rights reserved.

## 🤝 Contact


---

Built with ❤️ in Switzerland
