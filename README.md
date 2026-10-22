# Ajjappa Gheewari — Luxury Editorial Personal Portfolio (React + Firebase)

A modern, fully responsive personal portfolio designed for **Ajjappa Gheewari**, a **Bachelor of Computer Applications (BCA)** student. Built with **React 18**, **Vite**, semantic HTML5, modern CSS3 (custom properties, glassmorphism, responsive grid), and **Google Firebase Firestore** integration for the contact inquiries section.

---

## ✨ Features & Highlights

- **React Component Architecture**: Modularized into reusable, accessible functional components (`Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Education`, `Contact`, `Footer`, `Preloader`).
- **Google Firebase Firestore Integration**: Live transmission of contact messages to Cloud Firestore with timestamp and metadata, plus a seamless local storage demo fallback for local development.
- **Luxury Minimal Aesthetics**: Dark theme featuring deep black (`#0A0A0A`), rich dark brown (`#1A120B`), card surfaces (`#17110C`), and gold gradients (`#D4AF37` → `#F5C542` → `#B8860B`).
- **Editorial Typography**: Pairing *Playfair Display* for serif headings with *Inter* for body readability.
- **Glassmorphism Navbar**: Sticky header with backdrop blur, golden monogram emblem, animated underline hover states, active section scrollspy, and mobile drawer menu.
- **Interactive Hero Canvas**: Floating golden particle physics system with mouse avoidance and gentle drift.
- **Dynamic Typing Animation**: Smooth typewriter effect cycling through roles (*BCA Student*, *Aspiring Web Developer*, *Problem Solver*, *Software Enthusiast*).
- **Animated Counters**: Viewport-triggered numerical counters for completed projects, technologies mastered, and certifications.
- **Technical Skills Arsenal**: Categorized skill groups (Core Programming, Web Development, Database & Data, Tools & Workflow) with animated progress bars.
- **Featured Projects Grid**: 4 project cards with 3D perspective mouse tilt, tech badges, and direct links.
- **Vertical Milestones Timeline**: Education and certifications timeline with golden spine and glowing milestone nodes.
- **Validated Contact Form**: Real-time client-side validation, live character counter (0/500), submission loading spinner, and toast feedback.
- **Back to Top Progress Ring**: Circular SVG progress bar showing dynamic page scroll percentage.
- **Accessibility & Performance**: Keyboard accessible (`:focus-visible`), `prefers-reduced-motion` compliance, lightweight SVG vectors, and lazy-loading.

---

## 📂 File Structure

```text
PORTFOLIO/
├── index.html                      # Vite HTML root mounting React
├── style.css                       # Custom CSS styling & 8px design system
├── vite.config.js                  # Vite bundler configuration
├── package.json                    # Project dependencies (React, Vite, Firebase)
├── .env.example                    # Firebase environment variable template
├── public/
│   └── assets/                     # Static media, icons, and placeholder resume
├── src/
│   ├── main.jsx                    # React application entry point
│   ├── App.jsx                     # Root application component
│   ├── firebase.js                 # Modular Firebase Web SDK & Firestore service
│   ├── data/
│   │   └── portfolioData.js        # Centralized portfolio data (bio, skills, projects)
│   └── components/
│       ├── Preloader.jsx           # Luxury monogram loading screen
│       ├── Navbar.jsx              # Sticky navigation & mobile drawer
│       ├── Hero.jsx                # Hero section with animated typewriter
│       ├── ParticlesCanvas.jsx     # Floating gold particle physics simulation
│       ├── About.jsx               # Bio story & animated counters
│       ├── Skills.jsx              # Categorized skills with animated progress bars
│       ├── Projects.jsx            # Project cards with 3D perspective tilt
│       ├── Education.jsx           # Vertical milestone timeline & certifications
│       ├── Contact.jsx             # Firebase-backed contact form with validation
│       ├── Footer.jsx              # Footer & circular scroll progress button
│       └── ToastNotification.jsx   # Floating luxury alert pop-up
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## 🔥 Connecting Firebase Firestore

The contact section uses the official Firebase Modular Web SDK (`firebase/firestore`).

1. Open your [Firebase Console](https://console.firebase.google.com/) and create a new project (or select an existing one).
2. Add a **Web App** to your project to obtain your configuration keys.
3. In the Firebase Console, go to **Firestore Database** and click **Create Database**.
4. In your project root, create a file named `.env.local`:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
5. Restart the dev server (`npm run dev`). When submitted, inquiries will automatically be stored in your Cloud Firestore database under the `contacts` collection!

*Note: If no Firebase keys are configured, the app automatically runs in a development demo mode, storing messages locally so the user experience is always functional.*
