# Contributing to Genshin Showcase

First off, thank you for taking the time to contribute! 🎉  
Whether you're adding a new character, fixing a bug, or improving the code, all contributions are welcome.

> **Note:** This project uses HoYoverse/miHoYo assets for educational purposes only. Please do not contribute any copyrighted assets you do not have the right to distribute.

---

## 📋 Table of Contents

- [Setting Up the Dev Environment](#-setting-up-the-dev-environment)
- [Adding a New Character](#-adding-a-new-character)
- [Bug Reports & Feature Requests](#-bug-reports--feature-requests)
- [Code Style & Pull Request Process](#-code-style--pull-request-process)

---

## 🛠 Setting Up the Dev Environment

### Prerequisites

- Node.js `>=20.19.0` or `>=22.12.0`
- npm

### Steps

1. **Fork** the repository on GitHub.

2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/genshin-showcase.git
   cd genshin-showcase
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Add the font** — since `GenshinFont.ttf` is not included in the repo, place it manually at:
   ```
   src/assets/fonts/GenshinFont.ttf
   ```

5. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/genshin-showcase/](http://localhost:5173/genshin-showcase/) in your browser.

6. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## 🎨 Adding a New Character

Adding a character involves a few coordinated steps across multiple files. Follow this checklist carefully.

### 1. Prepare Assets

Place the following files in the appropriate folders under `public/assets/`:

| Asset | Path | Notes |
|---|---|---|
| Background | `public/assets/backgrounds/newchar-bg.webp` | Use `.webp` for performance |
| Character splash | `public/assets/characters/newchar.png` | Transparent background |
| Header text | `public/assets/ui/newchar-header.png` | |
| Subheader text | `public/assets/ui/newchar-subheader.png` | |
| Sidebar icon | `public/assets/ui/newchar-sidebar.png` | |
| Sidebar icon (glow) | `public/assets/ui/newchar-sidebar-glow.png` | Hover state |
| Nameplate | `public/assets/ui/newchar-nameplate.png` | Tooltip on sidebar hover |
| Backtext layer 1 | `public/assets/backtexts/newchar-1.png` | |
| Backtext layer 2 | `public/assets/backtexts/newchar-2.png` | |

### 2. Register Image Paths

In `src/constants/images.ts`, add entries for all your new assets:

```ts
newchar_bg: '/assets/backgrounds/newchar-bg.webp',
newchar_img: '/assets/characters/newchar.png',
newchar_header: '/assets/ui/newchar-header.png',
newchar_subheader: '/assets/ui/newchar-subheader.png',
newchar_backtext1: '/assets/backtexts/newchar-1.png',
newchar_backtext2: '/assets/backtexts/newchar-2.png',
newchar_sidebar: '/assets/ui/newchar-sidebar.png',
newchar_sidebar_glow: '/assets/ui/newchar-sidebar-glow.png',
newchar_nameplate: '/assets/ui/newchar-nameplate.png',
```

### 3. Add Character Data

In `src/constants/characterData.ts`, add a new entry to the `charactersData` array:

```ts
{
  id: 'newchar',
  name: 'New Character',
  bg: images.newchar_bg,
  character: images.newchar_img,
  header: images.newchar_header,
  subheader: images.newchar_subheader,
  backtext1: images.newchar_backtext1,
  backtext2: images.newchar_backtext2,
  sidebar: images.newchar_sidebar,
  sidebarGlow: images.newchar_sidebar_glow,
  nameplate: images.newchar_nameplate,
},
```

### 4. Configure Animations

In `src/config/characterAnimations.ts`, add a new entry to `animationConfigs`.  
All `x` and `y` values are based on a **1920×1080** canvas and are auto-scaled at runtime.

```ts
newchar: {
  background: {
    initial: { x: 720, y: 405, scale: 1.75 },
    step1:   { x: -720, y: -405 },
    step2:   { x: 0, y: 0, scale: 1 },
    delays:    { step1: 0.1, step2: 0.3 },
    durations: { step1: 1, step2: 1 },
    transformOrigin: 'center center',
  },
  character:  { initial: {...}, step1: {...}, step2: {...}, ... },
  header:     { initial: {...}, step1: {...}, step2: {...}, ... },
  subheader:  { initial: {...}, step1: {...}, step2: {...}, ... },
  backtext1:  { initial: {...}, step1: {...}, step2: {...}, ... },
  backtext2:  { initial: {...}, step1: {...}, step2: {...}, ... },
},
```

Refer to existing characters like `citlali` or `keqing` as a reference for values.

### 5. Add Character Stats

In `src/components/DetailsModal.tsx`, add an entry to the `characterDetails` object:

```ts
newchar: {
  name: 'New Character',
  title: 'Their Title',
  element: 'Pyro',
  weapon: 'Sword',
  stats: {
    hp: '13000',
    atk: '340',
    def: '800',
    critRate: '5%',
    critDmg: '50%',
    elementalMastery: '0',
    energyRecharge: '100%',
  },
  artifacts: {
    set1: { piece: '4-Piece Set', artifact: 'Artifact Set Name' },
    set2: { piece: '2-Piece Set', artifact: 'Another Artifact Set' },
  },
},
```

### 6. Add to Preload List *(optional but recommended)*

In `src/App.tsx`, add the new character's assets to the `imagesToPreload` array so they load before the showcase begins.

---

## 🐛 Bug Reports & Feature Requests

### Reporting a Bug

1. **Search existing issues** first to avoid duplicates.
2. Open a new issue and include:
   - A clear and descriptive title
   - Steps to reproduce the bug
   - Expected vs. actual behavior
   - Screenshots or screen recordings if applicable
   - Your browser and OS

### Requesting a Feature

1. Open a new issue with the `enhancement` label.
2. Describe the feature and why it would be useful.
3. If it involves a new character, check the [Adding a New Character](#-adding-a-new-character) section first — it may already be straightforward to do yourself!

---

## 🧹 Code Style & Pull Request Process

### Code Style

- This project uses **TypeScript** with strict mode enabled — avoid `any` types where possible.
- Follow the existing component and hook patterns (functional components, custom hooks for logic).
- Keep animation configs in `characterAnimations.ts` — don't hardcode GSAP values inside components.
- Use the centralized `images.ts` for all asset paths.

### Submitting a Pull Request

1. Make sure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Run a build to check for type errors before submitting:
   ```bash
   npm run build
   ```

3. Write a clear PR description covering:
   - **What** you changed
   - **Why** you made the change
   - Any **screenshots** for visual changes

4. Open the PR against the `main` branch and wait for a review.

---

## 💬 Questions?

Feel free to open a [Discussion](https://github.com/VawnDyu/genshin-showcase/discussions) or reach out via GitHub issues. Contributions of all sizes are appreciated!
