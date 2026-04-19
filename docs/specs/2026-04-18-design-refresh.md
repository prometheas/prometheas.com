# Design Refresh — Decision Record

**Date:** April 18, 2026
**Author:** John Lianoglou
**Status:** Accepted

This document captures the decisions and outcomes from the design refresh session for prometheas.com during its migration to Next.js. It records the three aesthetic directions explored, the rationale for the chosen direction, and the complete declared design system.

---

## Starting Point

The existing prometheas.com carried a Japanese aesthetic with red branding (`#C23B22`), Helvetica Neue typography, and slate gray tones. The site belongs to John Lianoglou — a humanistic technologist, software architect, and open source contributor whose identity draws on both Greek and Japanese cultural threads. The migration to Next.js provided an opportunity to revisit the visual language while preserving the site's core character.

---

## Directions Explored

### Direction A — "Attic Balance" (Greek-forward)

A structured, architectural approach leaning into classical Greek references. Georgia serif headlines at 3.5rem, bold uppercase logo with wide letter-spacing, and a Greek key border accent at the top of the page (4px repeating gradient). The hero used a two-column layout with text left and a geometric SVG hand+flame illustration right, rendered inside a circular shield motif with Greek key corner accents. A meander divider SVG separated the hero from a 3-column content section with red bottom borders on h2s.

**Verdict:** Too literal in its Greek ornamentation. The key borders, meander SVGs, and serif fonts announced the reference rather than letting it breathe.

### Direction B — "Wabi-Sabi Modern" (Japanese-forward)

A contemplative, airy approach with ultra-light typography (font-weight 200–400), asymmetric layouts, and generous whitespace. The logo sat at 0.85rem/weight 300. The hero used an asymmetric layout with a vertical text accent ("Prometheas — Bearer of Fire" in `writing-mode: vertical-rl`) and an organic, calligraphic hand SVG with an enso-like incomplete circle. Content used a 1.2fr/1fr asymmetric grid with h2s at 0.75rem uppercase and red dash prefixes. A red dot divider separated sections.

**Verdict:** Deeply Japanese in feel with risk of reading as too sparse. The asymmetry and vertical text pushed the aesthetic further than needed.

### Direction C — "Synthesis" (chosen)

A balanced blend — centered layout, neither asymmetric nor rigidly classical. Light Helvetica Neue typography, full-bleed photographic hero, gradient column dividers evoking Greek columns through Japanese restraint, and a single red accent color threaded throughout. Details in the sections below.

---

## The Decision: Direction C — Synthesis

Direction C won because it synthesizes the strengths of both explorations without over-committing to either cultural reference:

- **From A:** the structured, column-rhythm layout sensibility — without the literal Greek ornamentation (key borders, meander SVGs, serif fonts).
- **From B:** the light typography, generous whitespace, and contemplative tone — without the asymmetry or vertical text.
- **The key synthesis element** is the gradient column dividers: vertical lines evocative of Greek columns, achieved with the restraint and negative space characteristic of Japanese design.
- The red circle accents beside column headings are geometric (Greek) but minimal (Japanese).
- The single accent color (red) and cool slate gray hierarchy work across both aesthetics without privileging one.

The net effect is a site that feels like it belongs to someone with both Greek and Japanese cultural threads, without announcing either one.

---

## Hero Image

Three SVG illustration variants were explored for the hero:

1. **"Abstract Torch"** — minimal, iconic; the hand abstracted into a vessel/torch shape.
2. **"Offering Hand"** — a refined open palm with flame hovering above without touching.
3. **"Brandmark"** — a logo-quality geometric mark with fingers rendered as rectangular bars.

**Final decision:** none of the SVGs were used. A photographic hero image (`hero-hand.png`, 1920×1200) was chosen instead — an open hand, palm up, representing "the Promethean offering." It renders edge-to-edge with no padding, the top edge kissing the header gradient rule.

---

## Mobile Navigation

The mobile menu uses a "red curtain" concept:

- A full-viewport red overlay drops from the top of the screen using `translateY(-100%)` → `translateY(0)`.
- Transition: 500ms with `cubic-bezier(0.4, 0, 0.2, 1)`.
- Navigation links fade in with a staggered animation: first link at 150ms delay, each subsequent link adding 70ms. Each link animates `translateY(-20px)` → `0` and `opacity: 0` → `1`.
- White text on red background.
- Social icons fade in at 350ms delay.
- The hamburger icon animates from three bars to an X over 350ms with a cubic-bezier transition. Bars turn white when the menu is open.

---

## Declared Design System

### Color Palette

| Token     | Hex       | Usage                                     |
|-----------|-----------|--------------------------------------------|
| Red       | `#C23B22` | Primary accent, links, hover states, logo period, mobile nav background |
| Red hover | `#A83019` | Interactive hover state                    |
| Slate 900 | `#0f172a` | Primary text                               |
| Slate 700 | `#334155` | Nav text, secondary headings               |
| Slate 600 | `#475569` | Blockquote text                            |
| Slate 500 | `#64748b` | Body text, social icons default            |
| Slate 300 | `#cbd5e1` | Borders, subtle UI                         |
| Slate 200 | `#e2e8f0` | Dividers, column gradients, code borders   |
| Slate 100 | `#f1f5f9` | Section backgrounds, mobile dividers       |
| Slate 50  | `#f8fafc` | Code block backgrounds                     |

### Typography

**Font stack:** `"Helvetica Neue", Inter, -apple-system, sans-serif`

Helvetica Neue is served to macOS/iOS users. Inter (loaded via `next/font` from Google Fonts) provides cross-platform fallback. Anti-aliased rendering is enabled via `-webkit-font-smoothing: antialiased`.

#### Type Scale

| Element        | Size     | Weight | Letter-spacing | Notes                          |
|----------------|----------|--------|----------------|--------------------------------|
| Logo           | 1.1rem   | 600    | 0.18em         | Uppercase; period in bold 700  |
| Nav links      | 0.78rem  | 450    | 0.1em          | Uppercase, slate-700           |
| H1 (hero)      | 5rem     | 300    | —              | Mobile: 2.2rem; "John" in 600 |
| H2 (columns)   | 1.15rem  | 500    | —              | Red circle accent beside       |
| Body           | 1.05rem  | 300    | —              | Line-height 1.8, slate-500     |
| Columns        | 0.92rem  | —      | —              | Content within 3-col grid      |
| Labels/meta    | 0.8rem   | —      | 0.25em         | Uppercase, red subtitle        |
| Small/footnote | 0.75rem  | —      | 0.05em         | Footnote headings              |

### Spacing

| Area              | Desktop       | Mobile       |
|-------------------|---------------|--------------|
| Horizontal padding| 4.5rem        | 1.5rem (px-6)|
| Header            | py-7, gap-9   | —            |
| Hero text         | pt-12 / pb-20 | pt-8 / pb-12 |
| Columns           | py-10 / px-12 | py-8 / px-0  |
| Footer            | pt-10 / pb-12 | —            |
| Content max-width | 1200px        | —            |

### Layout

- **Desktop:** 3-column grid.
- **Mobile:** single column (breakpoint at `max-md` / 768px).
- **Column dividers:** 1px vertical gradient — `transparent 0%` → `slate-200 20%` → `slate-200 80%` → `transparent 100%`.
- **Mobile dividers:** horizontal `border-b slate-100` replaces vertical gradients.
- **Ornament divider:** flex row with two `flex-1` slate-200 lines flanking centered `· · ·` text.

### Interactions

| Element          | Behavior                                                                 |
|------------------|--------------------------------------------------------------------------|
| Link hover       | Color transitions to red, 200–300ms `transition-colors`                  |
| Link opacity     | `opacity: 0.7` on hover, `transition-opacity`                           |
| Nav underline    | Pseudo-element width `0` → `100%` on hover, 300ms                       |
| Mobile menu      | 500ms `translateY` with `cubic-bezier(0.4, 0, 0.2, 1)`                  |
| Mobile links     | Staggered: 150ms + index × 70ms, `translateY(-20px)` → `0`, opacity 0→1|
| Social icons     | Stagger at 350ms delay                                                   |
| Burger animation | 3-bar → X, 350ms cubic-bezier, bars turn white when open                |

### Blog Content (`.post-content`)

| Element     | Style                                                        |
|-------------|--------------------------------------------------------------|
| Paragraphs  | 1em margin top and bottom                                    |
| Links       | Red, no underline, `opacity: 0.7` on hover                  |
| Blockquotes | Red left border, slate-600 text                              |
| Inline code | `0.875em` font-size                                          |
| Pre blocks  | Slate-50 background, slate-200 border                        |
| Footnotes   | Slate-200 `border-top`, 3rem `margin-top`, uppercase heading (0.875rem, 0.05em tracking) |

### Logo

`Prometheas` in black + red bold period `.` + `com` in black. Semibold (600), uppercase, 0.18em letter-spacing. The period is rendered at weight 700 in the primary red.

### Social Icons

19×19px SVGs using `currentColor` fill. Default color is slate-500, transitioning to red on hover. Platforms: LinkedIn, GitHub, YouTube.

---

## Source Files

| File                          | Purpose                                    |
|-------------------------------|--------------------------------------------|
| `src/app/globals.css`         | Tailwind v4 theme tokens, post-content styles |
| `src/app/layout.tsx`          | Font configuration, root layout            |
| `src/app/page.tsx`            | Homepage with hero and 3-column section    |
| `src/components/Header.tsx`   | Header with gradient rule                  |
| `src/components/MobileNav.tsx` | Red curtain mobile navigation             |
| `src/components/Footer.tsx`   | Footer                                     |
| `src/components/SocialLinks.tsx` | Social icon SVGs                        |
| `src/components/PostExcerpt.tsx` | Blog card styling                       |
| `public/images/hero-hand.png` | Hero image (1920×1200)                     |
