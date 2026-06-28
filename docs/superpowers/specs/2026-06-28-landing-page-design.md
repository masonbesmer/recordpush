# Landing Page Design — recordpush

**Date:** 2026-06-28  
**Scope:** Static landing page at `/` (no functional auth, routing, or data)

---

## Overview

Replace the TanStack Start boilerplate home page with a vinyl-release-tracker landing page. Dark vinyl aesthetic (charcoal + amber + cream). All CTAs are placeholder `<a href="#">` links — no routes wired yet.

---

## Visual Direction

- **Background:** `#1a1a1a` charcoal
- **Primary text:** `#f5e6c8` warm cream
- **Muted text:** `#a89a7c`
- **Accent:** `#c49a3a` amber (buttons, highlights, numbered steps)
- **Typography:** Fraunces serif for headings, Manrope sans for body (both already loaded)
- **Cards:** dark glass panels with `rgba(255,255,255,0.05)` bg, `rgba(245,230,200,0.1)` border

Header and Footer retain existing teal theme — only content zone between them goes dark.

---

## Files

| File | Action |
|---|---|
| `src/routes/index.tsx` | Replace starter content with landing page component |
| `src/styles/landing.css` | New — scoped `.landing-*` CSS, side-effect imported in route |

No changes to `styles.css`, `Header.tsx`, `Footer.tsx`, or `__root.tsx`.

---

## Page Sections

### 1. Hero

Full-bleed dark section with radial amber glow at top center.

- Kicker: `"Early Access"`
- Heading (Fraunces, ~5rem): `"Never miss a press."`
- Subtext: `"Track vinyl releases across your favorite stores. Get notified the moment new pressings drop."`
- CTAs:
  - `Sign Up Free` — amber filled pill button (`<a href="#">`)
  - `Browse Stores` — ghost pill button (`<a href="#">`)

### 2. How It Works

3-step horizontal row (stacks to column on mobile).

| Step | Label | Description |
|---|---|---|
| 1 | Sign Up | Create a free account in seconds |
| 2 | Pick Stores | Choose which stores to monitor |
| 3 | Get Notified | Receive alerts when releases drop |

Steps connected by a subtle horizontal line (hidden on mobile).

### 3. Feature Highlights

3-column card grid (stacks to 1 col on mobile).

| Card | Description |
|---|---|
| Track New Releases | Monitor store pages for new vinyl pressings as they're listed |
| Instant Alerts | Get notified by email or in-app the moment a release appears |
| Wishlist | Save records you're hunting so you never lose track |

Each card: amber icon box, bold title, muted description text.

### 4. Tracked Stores

Section heading: `"We watch the stores you care about."`

2×2 chip grid (4 items):
- Discogs
- Music Direct
- Acoustic Sounds
- Plaid Room

Each chip: store name, placeholder dot icon, hover amber border. No links.

### 5. Coming Soon

Centered amber-bordered box.

- Kicker: `"Coming Soon"`
- Heading: `"recordpush is in early access."`
- Body: `"Join the waitlist to be first in line when we launch."`
- CTA: `Join Waitlist` — amber filled button (`<a href="#">`)

---

## CSS Scoping

All rules in `src/styles/landing.css` use `.landing-*` prefix:

```
.landing-root        — root wrapper, dark bg, light text
.landing-wrap        — max-width container (matches page-wrap width)
.landing-hero        — hero section with radial glow
.landing-section     — standard section padding + top border
.landing-kicker      — uppercase amber label
.landing-heading     — Fraunces serif heading
.landing-subtext     — muted cream body text
.landing-btn-primary — amber filled pill
.landing-btn-secondary — ghost pill
.landing-card        — dark glass card
.landing-card-icon   — amber icon box
.landing-step-num    — amber outlined circle number
.landing-store-chip  — store tile
.landing-coming-soon — centered bordered teaser box
```

Imported as side-effect in `index.tsx`: `import '../styles/landing.css'`

---

## Out of Scope

- Auth routes (`/signup`, `/login`)
- Store tracking pages
- Waitlist form submission
- Header/Footer restyling
- Any backend/database changes
