# instafolio 📸✨
> **A high-craft developer portfolio web application built with the authentic UX, interaction physics, and design language of Instagram.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.x-green?style=flat-square&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

## 🌟 Overview

**instafolio** re-imagines the traditional developer portfolio as an authentic mobile-first Instagram web application. It combines interactive feed posts, high-framerate multi-slide carousels, full-screen segmented education stories with board exam marks, a searchable project explore grid with Supabase integration, an Instagram Direct Messages contact center, and an interactive voice-activated intro screen (*"Khul Ja Sim Sim"*).

Built by **Pratik S Pawar** ([@pratik_pawar_0204](https://instagram.com/pratik_pawar_0204)).

---

## 🚀 Key Features

### 1. 🎙️ Voice & Interactive Intro (*"Khul Ja Sim Sim"*)
- **Web Speech API Recognition**: Listens for the phrase *"Khul Ja Sim Sim"* with phonetic fallback parsing, Levenshtein distance tolerance, and Hindi/English linguistic roots.
- **Microphone State Management**: Visual pulsing audio indicator with non-blocking graceful fallback to tap-to-open.
- **Reel / Story Swipe-Up Transition**: Authentic spring flick upward (`translateY(-100%)`) with full reduced-motion accessibility support.
- **Replay Capability**: Tap the `instafolio` header wordmark at any time to replay the opening experience.

### 2. 🎓 Education Journey Story Bar & Viewer
- **Milestones**: School (1st – 10th SSC) → Junior College (11th & 12th HSC) → BSc Computer Science → MSc Information Technology.
- **12 Curated Slides**: High-resolution photo memory collages paired with detailed academic retrospectives.
- **Board & University Scores**: Displays SSC (80.80%), HSC (51.38%), BSc CS (CGPA 7.75), and MSc IT (CGPA 7.58) subject grades.
- **Interaction Physics**:
  - Segmented progress bars with `requestAnimationFrame` timing.
  - Left 35% tap to rewind, right 65% tap to advance.
  - **Press & Hold**: Pauses progress instantly; releasing resumes timing.
  - Keyboard shortcuts (`←`, `→`, `Space` for pause/play, `Escape` to close).
  - Quick emoji reactions with particle confetti and direct reply form.
  - Gradient rings indicate unviewed stories; turns muted grey once viewed.

### 3. 📱 Authentically Styled Feed Posts
- **Post 1: Academic & Life Collage Carousel** (`1-1.jpg`, `1-2.jpeg`, `1-3.jpg` with touch swipe, dot indicators, and chevron navigation).
- **Post 2: Ruia College MSc IT & Campus Memories** (`2-1.jpg`, `2-2.jpg`, `2-3.jpg` high-res photo gallery).
- **Post 3: Wispr Flow Engineering & Product Pitch** (*"Bolega India, tabhi toh aage badhega India"* - voice-first accessibility and Indian multilingual ergonomics).
- **Post 4: Open to Work & Opportunity Roles** (Full-Stack Engineer, Frontend/UI-UX, Backend & APIs, Freelance MVPs with 1-click email copy & confetti).
- **Social Feed Interactions**:
  - Double-tap anywhere on cards to trigger an animated floating heart ❤️.
  - Live local state persistence for Likes, Bookmarks, and Comments synced via custom browser events.
  - Expandable multi-line captions and clickable hashtags.

### 4. 🔍 Search & Explore Grid
- Instagram Explore-style dynamic staggered grid with tall and square tile spans.
- Real-time search query filtering by project title, skill keywords, or categories.
- Horizontally scrollable category pills (*Machine Learning, Cybersecurity, Web Development, Full-Stack*).
- Full project detail modal with architecture deep-dive slides, live demo links, and GitHub repository shortcuts.

### 5. 💬 Instagram Direct Messages (DM Inbox)
- Full-page Direct Message screen modeled after Instagram's official messaging interface.
- 1-click quick inquiry chips (*"👋 Hi Pratik, open for a chat?"*, *"💼 We have an open role for you"*).
- Direct deep links for WhatsApp (`+91-8928260115`), Gmail (`pratikpawar0222@gmail.com`), LinkedIn, GitHub, and external portfolio.

### 6. 👤 Profile Tab
- Authentic profile header displaying `@pratik_pawar_0204`, verified badge, posts count, follower metrics, and bio.
- Quick story highlights shortcuts.
- Tab switcher for Project Grid view and Saved/Bookmarked posts.

---

## 🛠️ Architecture & Tech Stack

```
insta-folio/
├── public/                 # Static assets (story memories, post images, favicons)
│   ├── posts/              # Carousel gallery photography
│   └── favicon.svg         # Instagram branded vector icon
├── src/
│   ├── __tests__/          # Automated Vitest unit and integration test suites
│   ├── components/         # Modular, accessible React UI components
│   │   ├── BottomNav.tsx   # Fixed viewport 4-tab bottom navigation
│   │   ├── ErrorBoundary.tsx # Production error catching & recovery UI
│   │   ├── Header.tsx      # Sticky Instagram header with theme toggle
│   │   ├── PostCard.tsx    # Feed post card with double-tap like & comments
│   │   ├── ProfileTab.tsx  # User profile tab with stats and project grid
│   │   ├── SearchExplore.tsx # Explore grid with live search & filters
│   │   ├── StoryBar.tsx    # Stories tray with unviewed gradient rings
│   │   ├── StoryModal.tsx  # Fullscreen story viewer modal
│   │   └── VoiceIntroOverlay.tsx # Web Speech API voice-first entry
│   ├── data/               # Strongly-typed data models and offline fallbacks
│   ├── hooks/              # Reusable state, Supabase data fetching & storage sync
│   ├── lib/                # Supabase client and formatting utilities
│   ├── App.tsx             # Main application orchestrator & tab routing
│   └── main.tsx            # React 19 root bootstrap wrapped in ErrorBoundary
└── vite.config.ts          # Vite build config with manual chunk optimization
```

### Core Technologies
- **Runtime & UI**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS + CSS Variables
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Instagram Direct SVG paths
- **Database & Cloud**: [Supabase](https://supabase.com/) (stale-while-revalidate pattern with zero-flash offline fallback)
- **Speech**: Browser native Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`)
- **Testing**: [Vitest](https://vitest.dev/) (unit tests, data integrity, formatting & storage validation)
- **Linting**: [Oxlint](https://oxc.rs/) (high-speed Rust-based linter)
- **Bundler**: [Vite 8](https://vitejs.dev/) with optimized Rollup code splitting

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (Node 20+ / 24+ recommended)
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/PratikPawar020403/insta-folio.git
cd insta-folio

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory (or copy `.env.example`):

```bash
cp .env.example .env
```

Populate with your Supabase credentials (optional — the app includes rich default offline data):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🧪 Testing & Code Quality

```bash
# Run automated Vitest test suite
npm test

# Run Oxlint static analysis
npm run lint

# Run TypeScript type check and production bundle build
npm run build
```

---

## 📦 Production Build & Optimization

The build process enforces modular chunk separation so that core vendor libraries and icons are cached separately from application code:

```
dist/
├── index.html                      # HTML entry with preconnected Google Fonts
├── assets/
│   ├── vendor-[hash].js            # React 19 & React-DOM runtime
│   ├── supabase-[hash].js          # Supabase client SDK
│   ├── icons-[hash].js             # Lucide icon set
│   ├── index-[hash].js             # Application code bundle
│   └── index-[hash].css            # Minified Tailwind styles
```

---

## 🔒 Security Audit & Hardening

- **Zero Credentials Committed**: `.env` and local secrets are excluded via `.gitignore`.
- **Zero Vulnerabilities**: Verified through `npm audit` (0 vulnerabilities found).
- **Safe External Navigation**: All outbound links use `rel="noopener noreferrer"`.
- **Error Boundaries**: Uncaught rendering exceptions are safely intercepted by `<ErrorBoundary />`, preventing blank screens.
- **Sanitized Audio Cleanup**: Speech recognition instances and timers are deterministically aborted on unmount to prevent memory leaks.

---

## 👤 Author

**Pratik S Pawar**
- **Instagram**: [@pratik_pawar_0204](https://instagram.com/pratik_pawar_0204)
- **LinkedIn**: [pratik-s-pawar](https://www.linkedin.com/in/pratik-s-pawar-780443358/)
- **GitHub**: [@PratikPawar020403](https://github.com/PratikPawar020403)
- **Portfolio**: [psp-02-portfolio.netlify.app](https://psp-02-portfolio.netlify.app/)
- **Email**: pratikpawar0222@gmail.com
- **Phone / WhatsApp**: +91-8928260115

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
