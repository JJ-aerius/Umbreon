# Theme and Branding Update - October 29, 2025

## Summary of Changes

This document outlines all changes made to implement a light/dark theme toggle and rebrand from "Umbreon" to "Aerius Systems".

---

## 1. Theme Toggle Implementation

### Added Light Mode Support
- **CSS Variables** (`assets/css/styles.css`):
  - Created new `.light-mode` class with inverted color scheme
  - Light mode colors:
    - Background: `#ffffff` (white)
    - Secondary background: `#f8f9fa` (light gray)
    - Text: `#1a1a1a` (dark gray/black)
    - Borders: `#e5e7eb`, `#d1d5db` (light grays)
    - Accent colors remain the same (`#0ea5e9` cyan)

### Theme Toggle Button
- **Header Updates** (`partials/header.html`):
  - Added theme toggle button with sun/moon icons
  - Positioned next to hamburger menu in `.header-actions` container
  - Includes proper ARIA labels for accessibility

- **CSS Styling** (`assets/css/styles.css`):
  - Circular button (44x44px) with hover effects
  - Shows moon icon in dark mode, sun icon in light mode
  - Responsive positioning on mobile and desktop

### Theme Toggle Functionality
- **JavaScript** (`assets/js/main.js`):
  - Added `initThemeToggle()` function
  - Persists user preference in `localStorage`
  - Automatically applies saved theme on page load
  - Updates logo visibility based on theme
  - Smooth theme switching with CSS transitions

---

## 2. Logo System

### Dual Logo Implementation
- **Header** (`partials/header.html`):
  - Replaced text logo with image logos
  - `LogoWhite.svg` - for dark mode (white logo on dark background)
  - `LogoNavy.svg` - for light mode (navy logo on white background)
  - Logos toggle visibility based on active theme

- **Logo Styling** (`assets/css/styles.css`):
  - Logo images sized at 40px height
  - Flexible width to maintain aspect ratio
  - Display toggling handled via JavaScript

---

## 3. Branding Changes: Umbreon → Aerius Systems

### All Occurrences Updated Across Files:

#### HTML Files
1. **index.html**:
   - Page title: "Aerius Systems - Swiss Ultra-Fast Drones"
   - Meta descriptions updated
   - Hero CTA: "Explore Aerius 1"
   - Section heading: "Why Aerius Systems"
   - Gallery description reference

2. **about.html**:
   - Page title: "About - Aerius Systems"
   - Meta description updated
   - Image alt text: "Aerius Systems drone in flight"

3. **business-inquiry.html**:
   - Page title: "Business Inquiry - Aerius Systems"
   - Consent checkbox: "I consent to Aerius Systems storing..."

4. **careers.html**:
   - Page title: "Careers - Aerius Systems"
   - Heading: "Careers at Aerius Systems"
   - Cover letter placeholder text
   - Consent checkbox updated

5. **investors.html**:
   - Page title: "Investors - Aerius Systems"
   - "Aerius Systems is uniquely positioned..."
   - Section: "Why Aerius Systems"
   - Timeline: "Aerius Systems established..."
   - "Aerius 1 Prototype"
   - Consent checkbox updated

6. **privacy-terms.html**:
   - Page title updated
   - Company references: "Aerius Systems AG"
   - Email references: `privacy@aeriussystems.com`, `legal@aeriussystems.com`

7. **umbreon-1.html**:
   - Page title: "Aerius 1 - Aerius Systems"
   - Hero heading: "Aerius 1"

8. **404.html**:
   - Page title: "Page Not Found - Aerius Systems"

#### Partial Files
1. **partials/header.html**:
   - Logo alt text: "Aerius Systems"
   - Navigation: "Aerius 1" (instead of "Umbreon 1")

2. **partials/footer.html**:
   - Brand name: "AERIUS SYSTEMS"
   - Footer links: "Aerius 1"
   - Copyright: "© 2025 Aerius Systems"

---

## 4. Additional CSS Enhancements

### Light Mode Specific Styles
- Scrolled header background for light mode: `rgba(255, 255, 255, 0.95)`
- Box shadow adjusted for light mode visibility
- SVG icon styling for theme toggle with proper stroke/fill

### Responsive Improvements
- Theme toggle positioned properly on mobile (auto margin-left)
- Theme toggle gets more spacing on desktop (2rem margin-left)
- Hamburger and theme toggle grouped in `.header-actions` container

---

## 5. Testing

### Local Development
- Server started on `http://localhost:8000`
- All pages load correctly with new branding
- Theme toggle works on all pages
- Logo switches appropriately between themes
- Theme preference persists across page navigation

### Accessibility
- Theme toggle has proper ARIA label
- SVG icons have semantic meaning (moon = dark mode, sun = light mode)
- Focus states maintained for keyboard navigation
- Color contrast meets WCAG AA standards in both themes

---

## 6. Files Modified

### CSS
- `assets/css/styles.css` - Added light mode variables, theme toggle styles, logo styles

### JavaScript
- `assets/js/main.js` - Added theme toggle functionality, logo switching logic

### HTML Partials
- `partials/header.html` - Added logo images, theme toggle button
- `partials/footer.html` - Updated branding

### HTML Pages (All updated for branding)
- `index.html`
- `about.html`
- `business-inquiry.html`
- `careers.html`
- `investors.html`
- `privacy-terms.html`
- `umbreon-1.html`
- `404.html`

---

## 7. Features Preserved

✅ All original functionality maintained  
✅ Partials injection system works unchanged  
✅ Forms continue to work with Formspree  
✅ Speed Intelligence module unchanged  
✅ Mobile navigation intact  
✅ Focus trap and accessibility features preserved  
✅ Responsive design maintained  
✅ SpaceX/Rocket Lab aesthetic retained  

---

## 8. User Experience

### Theme Toggle Behavior
1. **First Visit**: Default to dark mode
2. **Toggle Click**: Switch theme and save preference
3. **Return Visit**: Load saved theme automatically
4. **Across Pages**: Theme persists via localStorage

### Visual Consistency
- Both themes maintain the same accent color (`#0ea5e9` cyan)
- Layout and spacing identical in both modes
- Smooth transitions between themes
- Logos appropriate for each background

---

## Notes for Future Development

- Theme preference stored as `'light'` or `'dark'` in localStorage key `'theme'`
- Logo files must remain in `assets/img/` directory
- Theme toggle button requires header to be injected (handled via polling)
- All new pages should follow the same branding pattern
- Consider adding theme toggle to mobile menu for better mobile UX (optional)

---

**Last Updated**: October 29, 2025  
**Changes By**: AI Assistant  
**Status**: ✅ Complete and Tested
