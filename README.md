# ✨ Genshin Showcase

A fan-made interactive character showcase inspired by Genshin Impact's gacha pull reveal animations. Built with React, TypeScript, GSAP, and Tailwind CSS.

> **Disclaimer:** All character artwork, assets, and visual elements are the property of HoYoverse/miHoYo. This project is created solely for educational and practice purposes and is not intended for commercial use.

---

## 🌐 Live Demo

[View on GitHub Pages](https://vawndyu.github.io/genshin-showcase/)

---

## 🖼️ Features

- **Animated character reveals** — cinematic multi-step GSAP animations for each character's entrance
- **Multi-character support** — currently showcasing Keqing, Citlali, Chiori, and Skirk
- **Character sidebar** — scroll through characters with smooth navigation and nameplate tooltips
- **Responsive layout** — maintains a 1920×1080 aspect ratio and scales gracefully across all screen sizes
- **Details modal** — slide-in panel displaying each character's base stats and artifact recommendations
- **Info modal** — disclaimer overlay with a smooth scale-in animation
- **Asset preloader** — loading screen with an animated progress bar that preloads all images before reveal
- **Custom GenshinFont** — uses the official-style font for an authentic feel
- **Hover effects** — glowing sidebar icons and button highlight states

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [GSAP 3](https://gsap.com/) | Animation engine |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |

---

## 📁 Project Structure

```
genshin-showcase/
├── public/
│   ├── assets/
│   │   ├── backgrounds/       # Character background images (.webp)
│   │   ├── characters/        # Character splash art (.png)
│   │   ├── backtexts/         # Decorative background text layers (.png)
│   │   ├── ui/                # UI elements: sidebar, buttons, nameplates, modals
│   │   └── particles/         # Particle effects (e.g. Keqing thunder)
│   └── logo.png
│
└── src/
    ├── assets/
    │   └── fonts/             # Place GenshinFont.ttf here
    │
    ├── components/
    │   ├── KeqingShowcase.tsx  # Main showcase layout & orchestrator
    │   ├── CharacterSidebar.tsx
    │   ├── TopBar.tsx
    │   ├── DetailsButton.tsx
    │   ├── DetailsModal.tsx
    │   ├── InfoModal.tsx
    │   └── LoadingScreen.tsx
    │
    ├── config/
    │   └── characterAnimations.ts  # Per-character GSAP animation configs
    │
    ├── constants/
    │   ├── characterData.ts        # Character metadata & asset references
    │   └── images.ts               # Centralized image path constants
    │
    ├── hooks/
    │   ├── useShowcaseAnimations.ts
    │   └── useResponsiveLayout.ts
    │
    ├── utils/
    │   └── animations.ts           # GSAP animation functions
    │
    ├── App.tsx
    ├── App.css
    └── main.tsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=20.19.0` or `>=22.12.0`
- npm

### Installation

```bash
git clone https://github.com/VawnDyu/genshin-showcase.git
cd genshin-showcase
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173/genshin-showcase/](http://localhost:5173/genshin-showcase/) in your browser.

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 🎨 Adding a New Character

1. **Add assets** to `public/assets/` (background, character, header, subheader, backtexts, sidebar, sidebar-glow, nameplate).

2. **Register image paths** in `src/constants/images.ts`:
   ```ts
   newchar_bg: '/assets/backgrounds/newchar-bg.webp',
   newchar_img: '/assets/characters/newchar.png',
   // ...etc
   ```

3. **Add character data** in `src/constants/characterData.ts`:
   ```ts
   {
     id: 'newchar',
     name: 'New Character',
     bg: images.newchar_bg,
     // ...etc
   }
   ```

4. **Configure animations** in `src/config/characterAnimations.ts` by adding a new entry to `animationConfigs`:
   ```ts
   newchar: {
     background: { initial: {...}, step1: {...}, step2: {...} },
     character:  { initial: {...}, step1: {...}, step2: {...} },
     header:     { initial: {...}, step1: {...}, step2: {...} },
     subheader:  { initial: {...}, step1: {...}, step2: {...} },
     backtext1:  { initial: {...}, step1: {...}, step2: {...} },
     backtext2:  { initial: {...}, step1: {...}, step2: {...} },
   }
   ```

5. **Add character stats** in `src/components/DetailsModal.tsx` under `characterDetails`.

---

## ⚙️ Animation System

Each character's reveal plays in **two steps** driven by a `AnimationConfig` object:

```
initial → step1 → step2
```

- **`initial`** — where the element starts (often off-screen or scaled down)
- **`step1`** — intermediate position (e.g. overshooting, zooming out, or flying through)
- **`step2`** — final resting position on screen

All position values (`x`, `y`) are defined at **1920×1080** and automatically scaled by `getUniformScale()` at runtime for responsive behavior.

---

## 📜 License

This project is open source for educational purposes. All Genshin Impact assets belong to **HoYoverse/miHoYo**.