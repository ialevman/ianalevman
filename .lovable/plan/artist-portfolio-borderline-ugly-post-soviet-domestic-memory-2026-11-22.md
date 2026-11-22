# Artist portfolio — "borderline ugly", post-Soviet domestic memory

An artist's portfolio where the artworks are the hero, wrapped in quiet textures inspired by bottle glass, a wall carpet and a down shawl, used only as hints.

## Pages
- **Works (home, /)** — a slightly off-grid gallery of artworks with label-style captions (title, year, medium, size). Images fade in gently.
- **Work detail (/works/$slug)** — large image, label caption, short text, and a clear **Acquire** button opening a frosted-glass panel.
- **Acquire panel** — simple inquiry form (name, email, message, chosen work). For now it confirms on screen; sending real emails can be added later.
- **About (/about)** — bio, CV-style list, contact. The carpet ornament shows most here.
- Header: frosted glass bar with a deliberately too-large artist name, plain underlined links. Footer with faint carpet ornament.

Placeholder artist name and ~8 sample artworks (generated abstract images) until you send the real ones.

## Visual language
- **Base:** warm off-white like old paper/wool, near-black text.
- **Accents (muted):** bottle green, carpet burgundy, ochre, dusty blue, soft grey.
- **Glass:** blurred, faint green tint, thin bright edge, slow shimmer — top bar, Acquire panel, dialogs; slight distortion on hover.
- **Carpet:** symmetrical ornament at ~4% opacity in empty areas only, never behind artworks.
- **Shawl:** fine lace-like line dividers, borders and a lace loading state.
- **Type:** an awkward grotesk with character for display (e.g. "Bricolage Grotesque" or "Unbounded") plus a small condensed face for labels (e.g. "Barlow Condensed"), tiny caps, thin rules.
- **Ugly-on-purpose:** a few offset items, mismatched alignment, raw underlines. Navigation and Acquire stay clear.
- Motion minimal and off with reduced motion. No literal bottles, carpets, matryoshkas, stars or Cyrillic.

## Technical details
- TanStack routes: `index.tsx`, `works.$slug.tsx`, `about.tsx`, each with its own head() meta.
- Artwork data in a local `src/data/works.ts` module.
- Tokens (oklch) and `@utility glass`, `lace-divider`, `carpet-bg` in `src/styles.css`; ornaments as inline SVG data patterns.
- Fonts via `<link>` in `__root.tsx`; Acquire panel built on shadcn Sheet/Dialog.
- Sample images via the image generator, stored as assets.
