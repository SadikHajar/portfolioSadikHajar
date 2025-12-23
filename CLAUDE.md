# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Hajar Sadik, built with vanilla HTML, CSS, and JavaScript. The site is a single-page application (SPA) featuring a responsive design with a neomorphic (soft UI) design system, dark/light mode toggle, and dynamic theme color switching.

## Architecture

### Single-Page Application Structure

The site uses hash-based routing to navigate between sections without page reloads. All sections (`#home`, `#about`, `#services`, `#portfolio`, `#contact`) are present in `index.html` with `.section` class. JavaScript handles:
- Showing/hiding sections via `.active` and `.hide` classes
- Updating navigation state
- Managing URL hash changes

See `js/main.js:30-69` for the navigation implementation.

### Styling System

**Neomorphic Design**: The site uses CSS custom properties for shadows and colors defined in `css/style.css:4-22` (light mode) and `css/style.css:25-40` (dark mode).

**Key CSS Classes**:
- `.outer-shadow`: Raised element appearance
- `.inner-shadow`: Pressed/inset element appearance
- `.hover-in-shadow`: Transitions to inner-shadow on hover

**Theme System**:
- 5 color themes in `css/skins/color-1.css` through `color-5.css`
- Theme switching via `js/style-switcher.js:17-26`
- Dark/light mode toggle in `js/style-switcher.js:29-42`

### JavaScript Modules

All scripts use IIFE (Immediately Invoked Function Expressions) to avoid global scope pollution:

1. **Navigation Menu** (`js/main.js:2-70`): Hamburger menu, section routing, fade effects
2. **About Tabs** (`js/main.js:73-87`): Skills, Experience, Projects, Education tabs
3. **Portfolio Filter** (`js/main.js:94-262`): Gallery filtering and popup viewer
4. **Style Switcher** (`js/style-switcher.js`): Theme colors and dark/light mode
5. **Auto-typing Animation** (`js/autoTypingAnimation.js`): Uses typed.js library for about section
6. **Animations** (`js/animation.js`, `js/glassmorphism-animation.js`): Visual effects

### Content Structure

**Personal Information**:
- CV/Resume: `Cv.pdf` (newer, Sept 2025) and `CV.pdf` (older)
- Profile images in `img/` directory
- Social links: GitHub, Twitter, Instagram, LinkedIn (lines 130-134 in index.html)

**Sections**:
- Home: Hero with typing animation
- About: Tabs for Skills, Experience, Projects, Education
- Services: Certifications showcase
- Portfolio: Para-university activities
- Contact: Contact form and info

## Development Workflow

### File Organization

```
/
├── index.html          # Main HTML file with all sections
├── css/
│   ├── style.css       # Main styles, CSS variables
│   ├── responsive.css  # Media queries
│   ├── font-awesome.css
│   ├── style-switcher.css
│   └── skins/          # Theme color variations
├── js/
│   ├── main.js         # Core navigation & interactions
│   ├── style-switcher.js
│   ├── autoTypingAnimation.js
│   ├── animation.js
│   └── glassmorphism-animation.js
├── img/                # Profile and portfolio images
├── webfonts/           # Font Awesome fonts
└── project-content/    # Screenshots for documentation
```

### Making Changes

**Adding/Editing Content**:
- All content is in `index.html`
- Skills: Lines 166-244
- Experience: Lines 253-307
- Projects: Lines 314-438
- Education: Lines 441-479
- Certifications: Lines 507-569
- Para-university: Lines 597-653

**Styling Changes**:
- Modify CSS custom properties in `:root` (light mode) or `body.dark` (dark mode) in `css/style.css`
- Neomorphic shadows controlled by `--outer-shadow` and `--inner-shadow` variables
- Main theme color is `--skin-color`

**Adding New Theme Colors**:
1. Create `css/skins/color-X.css` with `:root{--skin-color: #HEXCODE;}`
2. Add `<link>` tag in `index.html` head with `title="color-X"`
3. Add color picker button in the style switcher (index.html:795-799)

**JavaScript Modifications**:
- Each module is self-contained in an IIFE
- Avoid polluting global scope
- Use event delegation for dynamic elements

### Testing Locally

No build process required. Simply open `index.html` in a browser or use a local server:

```bash
python -m http.server 8000
# or
npx serve
```

Then navigate to `http://localhost:8000`

## Key Behaviors

### Section Navigation
- Clicking nav links updates URL hash and shows corresponding section
- Only one section has `.active` class at a time
- Fade-out effect applied during transitions (300ms)

### Portfolio Popup
- Expects `data-screenshots` attribute on portfolio images (comma-separated URLs)
- Shows navigation buttons only if multiple screenshots exist
- Project details optional via `.portfolio-item-details` element

### About Section Animation
- Auto-typing text configured in `js/autoTypingAnimation.js:3-4`
- Uses typed.js library (loaded via CDN in index.html:806)
- Modify the strings array to change introduction text

### Theme Persistence
- Currently no localStorage implementation
- Theme resets on page reload
- To add persistence, modify `js/style-switcher.js` to save/load from localStorage

## External Dependencies

Loaded from CDN:
- Font Awesome (CSS for icons)
- jQuery 3.1.0 (for typed.js)
- Typed.js 1.1.4 (typing animation)
- VanillaTilt.js (card tilt effects, inline in index.html:814-827)
- SMTP.js (for email functionality, index.html:812)

## Contact Form

Form in index.html:704-729 is currently non-functional:
- No action/method specified
- SMTP.js loaded but not configured
- Requires email service setup or backend integration

## Common Modifications

**Update Personal Info**:
- Name/bio: `js/autoTypingAnimation.js:4`
- Skills: `index.html:166-244`
- Social links: `index.html:130-134`

**Add Experience/Project**:
1. Copy existing `.timeline-item` div
2. Update dates, title, description
3. Follow existing HTML structure

**Change Default Theme**:
- Modify which color CSS has `disabled` attribute in `index.html:13-20`
- Default is color-4 (line 19 has no `disabled`)

**Toggle Dark Mode by Default**:
- Add/remove `dark` class on `<body>` tag (index.html:24)
