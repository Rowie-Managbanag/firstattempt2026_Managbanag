# Alumni Hub - University Alumni Networking Platform

![SolidJS](https://img.shields.io/badge/SolidJS-v1.8-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-green) ![Vite](https://img.shields.io/badge/Vite-v8.0-purple)

A modern, responsive web application for university alumni networking, event management, and mentorship matching. Built with **SolidJS**, **TypeScript**, and **Vite** for blazing-fast performance.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Features

### Alumni Features
- ✅ User authentication and registration
- ✅ Dashboard with quick action cards
- ✅ Upcoming events browsing
- ✅ Alumni directory with search/filter
- ✅ Mentorship matching system
- ✅ Notification center
- ✅ Personal profile management
- ✅ Event RSVP and check-in

### Admin Features
- ✅ Admin dashboard with analytics
- ✅ Event creation and management
- ✅ Alumni verification queue
- ✅ User management
- ✅ System analytics and reports

## Tech Stack

**Frontend:**
- [SolidJS](https://solidjs.com) - Reactive JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vite.dev) - Next-generation build tool
- Vanilla CSS - Lightweight styling (no frameworks)

**Tools & Development:**
- Git & GitHub
- VS Code with GitHub Copilot
- Node.js v18 LTS

**Deployment Ready:**
- Client-side state management (no backend database required)
- localStorage for data persistence
- Production build optimization with Vite

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js LTS](https://nodejs.org/) (v18+)
- npm or yarn package manager
- Git

### Setup Steps

1. **Clone the Repository**
```bash
git clone <your-repo-link>
cd appdevvvvv

## PWA Integration (feature/pwa-ready)

### Master Prompt
```
My framework is SolidJS make it pwa also don't forget to add a manifest link to index.html and enable PWA dev mode in vite.config.ts so the manifest and service worker are available during vite dev
```

### What I changed
- `public/manifest.webmanifest` — added a minimal web manifest so browsers can detect and install the app.
- `index.html` — added `<link rel="manifest" href="/manifest.webmanifest">` and `<meta name="theme-color">` so the manifest is discoverable.
- `public/sw.js` — added a static service worker (precaching, runtime caching, navigation fallback) so offline behavior works in dev and production.
- `public/offline.html` — added an offline fallback page served by the SW for navigation requests when offline.
- `src/index.tsx` — added service worker registration (`navigator.serviceWorker.register('/sw.js')`).
- `package.json` / `vite.config.ts` — attempted a plugin-based approach with `vite-plugin-pwa`, but reverted that change due to a dependency conflict (see notes below).

### Hallucinations / Errors I fixed manually
- Assumed `vite-plugin-pwa@^0.15.x` would be compatible with Vite 8; `npm install` failed with an `ERESOLVE` dependency conflict because that plugin version expects Vite ^3 or ^4. Fix: removed the plugin and implemented a static `sw.js` served from `public/` and registered it manually.
- The plugin approach would have allowed `devOptions.enabled` so the SW/manifest are injected during `vite dev`. Because of the compatibility issue, I used the static `public/` approach which ensures `/manifest.webmanifest` and `/sw.js` are available in dev (Vite serves `public/` files as-is).
- Ensured the service worker is registered in `src/index.tsx` and added `public/offline.html` to give a clear fallback when offline.
- Note: offline support requires the service worker to be active; disabling/unregistering it in DevTools will prevent offline operation.

### How to push these changes to your feature branch
Run these commands locally to create the branch, commit, and push the updated files:
```bash
git checkout -b feature/pwa-ready
git add README.md public/manifest.webmanifest public/sw.js public/offline.html src/index.tsx index.html package.json vite.config.ts
git commit -m "feat(pwa): add manifest, static service worker and offline fallback; revert incompatible plugin"
git push origin feature/pwa-ready
```

If you want me to instead attempt a plugin-based setup (`vite-plugin-pwa`) I can try to find a compatible plugin version or suggest upgrading/downgrading Vite; let me know which approach you prefer.

---

