# Austin Carson — Portfolio Site Handoff
**Date:** May 14, 2026  
**URL:** austincarson.dev  
**Stack:** React 18 · Vite · TypeScript · Tailwind CSS · CSS Modules · Framer Motion (available) · `@fontsource/*`

---

## What This Is

Single-page portfolio site for Austin Carson — Design Engineer, Creative Technologist, Baddie. Showcases selected work with a refined editorial aesthetic: cream/sage palette, Instrument Serif display type, subtle parallax, and grain texture.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (SPA, no router) |
| Build | Vite |
| Types | TypeScript (strict) |
| Styling | Tailwind CSS + CSS Modules per component |
| Fonts | Instrument Serif (display), Plus Jakarta Sans (body), JetBrains Mono (mono) |
| Hosting | Vercel |

---

## File Map

```
src/
├── App.tsx                    # Root — theme toggle, dark mode, layout order
├── main.tsx
├── styles/
│   └── globals.css            # Design tokens, base reset, keyframe animations
├── components/
│   ├── Hero.tsx / .module.css         # Hero section with parallax + blur-focus name
│   ├── HeroDivider.tsx / .module.css  # Ledger-ruled divider strip between Hero → Projects
│   ├── Projects.tsx / .module.css     # Featured card + 3-col grid
│   ├── ProjectCard.tsx                # (used inside Projects)
│   ├── Footer.tsx / .module.css       # Links + copyright
│   └── ThemeToggle.tsx / .module.css  # Light/dark toggle
└── data/
    └── projects.ts            # All project entries live here — edit this file only
```

---

## Design Tokens (`src/styles/globals.css`)

### Colors
| Token | Light | Dark |
|---|---|---|
| `--color-bg` | `#F4F3EF` | `#141412` |
| `--color-bg-secondary` | `#ECEAE4` | `#1E1D1A` |
| `--color-bg-sage` | `#E8E6DF` | `#1A1917` |
| `--color-accent` | `#2A7EB8` | `#5BAEEA` |
| `--color-text-primary` | `#1A1814` | `#F0EDE8` |
| `--color-text-secondary` | `#4A4740` | `#A8A49E` |
| `--color-text-tertiary` | `#8A8680` | `#706C66` |

### Typography
| Token | Value |
|---|---|
| `--font-serif` | Instrument Serif |
| `--font-sans` | Plus Jakarta Sans |
| `--font-mono` | JetBrains Mono |
| `--fs-hero` | `clamp(5rem, 16vw, 11.5rem)` |

### Layout
- Max content width: `680px` (projects: up to `1120px`)
- Border radius scale: `--radius-xs` 6px → `--radius-lg` 32px

---

## Hero Section

**File:** `src/components/Hero.tsx`

### Name treatment
```
AUSTIN          ← small mono uppercase, letter-spaced, tertiary color
Carson          ← massive Instrument Serif italic, accent-tinted
```
The `<h1>` starts at `blur(12px) / opacity: 0.35` on page load. A `scroll` listener tracks the name's viewport position and sharpens it to `blur(0) / opacity: 1` as the user scrolls down — focus arrives exactly when the eye lands on the name.

### Parallax
- Artwork drifts up at `0.22×` scroll speed (separate GPU layer)
- Ambient glow counter-drifts at `−0.08×`
- Scroll cue fades + slides down within the first 80px of scroll

### Eyebrow
Three labels separated by `·` on desktop, stacked line-by-line on mobile (≤520px):
```
DESIGN ENGINEER · CREATIVE TECHNOLOGIST · BADDIE
```

---

## HeroDivider

**File:** `src/components/HeroDivider.tsx`

Three stacked layers that bridge Hero (cream `--color-bg`) into Projects (sage `--color-bg-sage`):

1. **Cap** — double architectural rule (2px line + 2px gap + 1px hairline)
2. **Ruled band** — 80px ledger paper: horizontal lines every 8px, vertical columns every 40px
3. **Sage shelf** — 64px solid sage block with inset top shadow for depth

---

## Projects

**File:** `src/data/projects.ts` ← **only file you need to edit for content changes**

Each entry has five required fields + two optional:

```ts
{
  title: string       // Card heading
  label: string       // Pill tag (e.g. "App", "Tool", "Site")
  date: string        // Shown in meta row
  description: string // Body copy
  learned: string     // "Takeaway" callout block
  url: string         // External link
  screenshot?: string // Path under /public/screenshots/
}
```

First project in the array = **featured card** (full-width, 2-col layout).  
Remaining projects = **3-col grid** (2-col at 920px, 1-col at 680px).

---

## Dark Mode

Controlled via `class="dark"` on `<html>`. State lives in `App.tsx`, persisted to `localStorage`. Toggled with a View Transition for a smooth crossfade. All color tokens automatically swap — no component-level dark overrides needed.

---

## Adding a Project

Edit `src/data/projects.ts` — add an object at the desired array position. First position = featured.

```ts
{
  title: 'My New Project',
  label: 'App',
  date: 'Jun 2026',
  description: 'What it does.',
  learned: 'What you learned.',
  url: 'https://example.com',
  screenshot: '/screenshots/my-new-project.png',  // optional
}
```

Drop the screenshot PNG/GIF into `public/screenshots/`.

---

## Validation (run before shipping)

```bash
npm run build       # tsc type check + Vite production build
npm run typecheck   # standalone tsc --noEmit
npm run lint        # ESLint across src/**/*.{ts,tsx}
```

All three must pass. There are no automated tests — `npm run test` is a placeholder.

---

## Contact / Socials

Managed in `src/components/Footer.tsx`:
- LinkedIn: `linkedin.com/in/austincarson`
- GitHub: `github.com/austncarsn`
- Email: `austncarsn@gmail.com`

---

## Known Constraints

- **Single-page only** — no router, no additional pages without architectural change
- **No new dependencies** without approval — the current bundle is lean
- **680px max-width** must be preserved across main sections
- `Inter` font is not used — `Plus Jakarta Sans` is the sans-serif; don't swap them
- `.hero-name` class is intentionally kept on `.nameItalic` — don't consolidate into the `h1` rule
