# Ajjappa Gheewari — Luxury Editorial Personal Portfolio

A modern, fully responsive personal portfolio designed for **Ajjappa Gheewari**, a **Bachelor of Computer Applications (BCA)** student. Built with semantic HTML5, modern CSS3 (custom properties, glassmorphism, responsive grid), and lightweight vanilla JavaScript with zero third-party framework dependencies.

---

## ✨ Features & Highlights

- **Luxury Minimal Aesthetics**: Dark theme featuring deep black (`#0A0A0A`), rich dark brown (`#1A120B`), card surfaces (`#17110C`), and gold gradients (`#D4AF37` → `#F5C542` → `#B8860B`).
- **Editorial Typography**: Pairing *Playfair Display* for serif headings with *Inter* for body readability.
- **Glassmorphism Navbar**: Sticky header with backdrop blur, golden monogram emblem, animated underline hover states, active section scrollspy, and mobile drawer menu.
- **Interactive Hero Canvas**: Floating golden particle physics system with mouse avoidance and gentle drift.
- **Dynamic Typing Animation**: Smooth typewriter effect cycling through roles (*BCA Student*, *Aspiring Web Developer*, *Problem Solver*, *Software Enthusiast*).
- **Animated Counters**: Scroll-triggered numerical counters for completed projects, technologies learned, and certifications.
- **Technical Skills Arsenal**: Categorized skill groups (Core Programming, Web Development, Database & Systems, Developer Tools) with animated progress bars.
- **Featured Projects Grid**: 4 project cards with lift micro-interactions, 3D perspective mouse tilt, tech badges, and direct links.
- **Vertical Milestones Timeline**: Education and certifications timeline with golden spine and glowing milestone nodes.
- **Validated Contact Form**: Real-time client-side validation, live character counter, submission loading state, and toast feedback.
- **Back to Top Progress Ring**: Circular SVG progress bar showing dynamic page scroll percentage.
- **Accessibility & Performance**: Keyboard accessible (`:focus-visible`), `prefers-reduced-motion` compliance, lightweight SVG vectors, and lazy-loading.

---

## 📂 File Structure

```text
PORTFOLIO/
├── index.html                  # Main semantic HTML structure
├── style.css                   # Custom CSS styling & 8px design system
├── script.js                   # Vanilla JS interactivity & animations
├── README.md                   # Documentation & customization guide
└── assets/
    ├── favicon.svg             # Luxury gold "AG" monogram browser favicon
    ├── profile-placeholder.svg # Profile placeholder with glowing gold frame
    ├── project-1.svg           # Preview for CampusCore (Academic Portal)
    ├── project-2.svg           # Preview for Aura (Luxury Portfolio)
    ├── project-3.svg           # Preview for Aura Cart (E-Commerce Storefront)
    ├── project-4.svg           # Preview for AlgoLens (DSA Visualizer)
    └── resume.pdf              # Placeholder resume document
```

---

## 🎨 How to Customize

### 1. Colors & Theme
All colors are centralized as CSS custom properties at the top of [`style.css`](style.css#L16-L70). You can modify them to suit any new palette:

```css
:root {
  /* Change the primary background tones */
  --bg-deep: #0A0A0A;        /* Default: Deep Black */
  --bg-brown: #1A120B;       /* Default: Rich Dark Brown */
  --bg-surface: #17110C;     /* Default: Card Surface */

  /* Change the gold accents */
  --gold-primary: #D4AF37;   /* Default: Golden Yellow */
  --gold-light: #F5C542;     /* Default: Secondary Gold */
  --warm-brown: #8B5E3C;     /* Default: Warm Brown */

  /* Text colors */
  --text-heading: #F5F0E6;   /* Headings */
  --text-body: #B8AE9C;      /* Body text */
}
```

### 2. Profile Photo
To replace the default placeholder with your real portrait:
1. Save your photo into the `assets/` folder (e.g. `assets/my-photo.jpg`).
2. Open [`index.html`](index.html) and locate the `<div class="profile-image-container">` inside the `#hero` section:
   ```html
   <img src="assets/my-photo.jpg" alt="Ajjappa Gheewari - BCA Student & Web Developer" class="profile-img" width="400" height="480">
   ```

### 3. Replacing the Resume
1. Place your actual resume PDF in the `assets/` folder as `resume.pdf` (or any filename you prefer).
2. The download buttons in [`index.html`](index.html) link to `assets/resume.pdf` with `download="Ajjappa_Gheewari_Resume.pdf"`.

### 4. Updating Personal Bio & Social Links
In [`index.html`](index.html):
- **Hero & Navbar**: Update the social profiles for GitHub, LinkedIn, and Email in the `.social-links` and `.contact-items-list` sections.
- **Typing Roles**: If you want to change the roles typed in the hero section, edit the `roles` array in [`script.js`](script.js#L198-L203):
  ```javascript
  const roles = [
    'BCA Student',
    'Aspiring Web Developer',
    'Full-Stack Developer',
    'Tech Explorer'
  ];
  ```

### 5. Modifying Projects
In [`index.html`](index.html), search for `<section id="projects">`. Each project card contains:
- `project-img`: Image src path (e.g., `assets/project-1.svg` or a screenshot).
- `project-title`: Name of your project.
- `project-desc`: Description of what problem it solves and what technologies you used.
- `project-tags`: Badges for technologies (e.g., `<span class="tag">Java</span>`).
- Links for `Live Demo` and `GitHub`.

### 6. Connecting the Contact Form
By default, the contact form validates all fields and provides feedback with an animated toast notification. To transmit emails to your inbox:
- **Option A (Formspree)**:
  Change `<form id="contactForm">` to:
  ```html
  <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ```
- **Option B (EmailJS or Web3Forms)**:
  Integrate their lightweight snippet inside the `initContactForm` submit handler in [`script.js`](script.js).

---

## 🚀 Running Locally

1. Simply double-click `index.html` to open it in your web browser.
2. Or use VS Code's **Live Server** extension:
   - Right-click `index.html` in VS Code → select **"Open with Live Server"**.
3. Or run a lightweight local HTTP server with Python or Node.js:
   ```bash
   # Using Python
   python -m http.server 3000

   # Or using Node npx
   npx serve .
   ```
   Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to GitHub Pages

1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
2. Go to your repository settings on GitHub → **Pages** → under **Branch**, choose `main` / `root` and click **Save**.
3. Your live luxury portfolio will be active at `https://YOUR_USERNAME.github.io/portfolio/`!

---

&copy; 2026 Ajjappa Gheewari. Designed & Engineered with precision.
