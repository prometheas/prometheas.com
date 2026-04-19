# DESIGN.md — Prometheas.com

## Overview

Prometheas.com is the personal website of John Lianoglou — a portfolio, blog, and digital identity built with Next.js 16 and Tailwind CSS v4. The design follows a philosophy called **Synthesis**: the fusion of Japanese minimalism (negative space, restraint, asymmetric balance) with classical Greek proportion (column rhythm, structured hierarchy, proportional thinking).

## Visual Theme & Atmosphere

The site is serene, precise, and architecturally structured. White canvas dominates. Zinc grays establish atmosphere and tonal depth. Red appears only as punctuation — interactive elements and accent marks. Hierarchy is communicated through hairline borders and typographic weight, never shadows or elevation. Every element earns its place; ornamentation is purposeful, never decorative.

The design is **not** brutalist, maximalist, corporate SaaS, or "generic tech startup." It belongs to a person, not a product.

## Color Palette & Roles

| Token | Hex | CSS Variable | Role | Usage |
|-------|-----|-------------|------|-------|
| Red | `#C23B22` | `--color-red` | Primary accent | Links, hover states, accent dots. As background: only for interactive overlays (mobile nav) and CTA buttons. Never for content regions. |
| Red Hover | `#A83019` | `--color-red-hover` | Accent hover | Darkened red for interactive feedback. Pairs only with red base. |
| Zinc 900 | `#18181b` | `--color-zinc-900` | Primary text | Headings, body text on light backgrounds. |
| Zinc 700 | `#3f3f46` | `--color-zinc-700` | Secondary text | Nav labels, subheadings, emphasized metadata. |
| Zinc 600 | `#52525b` | `--color-zinc-600` | Tertiary text | Descriptions, supporting copy, blockquotes. |
| Zinc 500 | `#71717a` | `--color-zinc-500` | Muted text | Captions, timestamps, disabled states. AA for large text only. |
| Zinc 300 | `#d4d4d8` | `--color-zinc-300` | Borders | Visible hairline rules and dividers. |
| Zinc 200 | `#e4e4e7` | `--color-zinc-200` | Subtle borders | Secondary borders, code block outlines. |
| Zinc 100 | `#f4f4f5` | `--color-zinc-100` | Surface | Alternate backgrounds, subtle differentiation. Not for code blocks (use zinc-50). |
| Zinc 50 | `#fafafa` | `--color-zinc-50` | Canvas tint | Near-white background when pure white is too stark. |

## Typography Rules

**Font stack:** `"Helvetica Neue", var(--font-inter), -apple-system, sans-serif`
Inter loaded via `next/font/google` as fallback for non-Apple platforms.

| Element | Size | Weight | Tracking | Transform |
|---------|------|--------|----------|-----------|
| Logo | 1.1rem | 600 | 0.18em | uppercase |
| Nav (desktop) | 0.78rem | 450 | 0.1em | uppercase |
| Nav (mobile) | 1.5rem | 300 | 0.2em | uppercase |
| Post title | 1.125rem | 500 | default | sentence case |
| Body text | 1rem | 400 | default | sentence case |
| Excerpt | 0.875rem | 300 | default | sentence case |
| Meta/dates | 0.75rem | 400 | wide | sentence case |
| Figcaptions | 0.875rem | 400 | default | sentence case |
| Categories | 0.75rem | 400 | wider | uppercase |

Uppercase + wide tracking: labels and navigation only. Never on body text, titles, or excerpts.

## Spacing

Base unit: `0.25rem` (4px). Key values from the Tailwind scale:

| Token | px | Usage |
|-------|-----|-------|
| 2 | 8 | Tight vertical gaps |
| 3 | 12 | List item spacing |
| 4 | 16 | Standard gap |
| 6 | 24 | Section padding, mobile horizontal padding |
| 8 | 32 | Component gaps, vertical spacing |
| 12 | 48 | Section breaks |

Container widths: 600px (narrow), **720px (reading/blog)**, 800px (standard), 1200px (wide). All `max-w-[Xpx] mx-auto`.
Horizontal padding: 72px (desktop) / 24px (mobile), switching at `md` (768px).

## Component Patterns

**Links:** `text-red no-underline`, hover: `opacity-70` (content links) or `text-red transition-colors` (nav links).

**Header:** Flex row, gradient bottom rule (red 60px → zinc-100). Logo: "Prometheas" + red bold dot + "com."

**Mobile Nav:** Fixed red overlay sliding from top (content-driven height, not full-viewport). Hamburger morphs to X. Nav links stagger in (70ms per item). White text on red background.

**Footer:** Centered, hairline top border (zinc-100). Social icons + copyright.

**Post Excerpt:** Article with bottom border (zinc-100). Meta row (date + category) above title link. Excerpt below.

**Blockquotes:** Red left border, zinc-600 text.

**Code blocks:** Pre with zinc-50 background, 1px zinc-200 border. Inline code at 0.875em.

## Depth & Elevation

This site intentionally uses **no shadows**. Visual hierarchy is established through:
- Hairline borders (1px, zinc-100 or zinc-200)
- Gradient rules (red accent fading to zinc)
- Typographic weight and color contrast
- Whitespace

Do not introduce box-shadow, ring-shadow, or elevation utilities.

## Do's and Don'ts

- **DO** use red exclusively for interactive or accent elements
- **DO** maintain generous whitespace — let content breathe
- **DO** use uppercase + tracking only for labels and navigation
- **DO** prefer borders and rules over shadows for separation
- **DO** keep the reading column narrow (~720px / 65-75 characters)
- **DO** use sentence case for all content text
- **DON'T** use red as a background for content areas or sections (permitted for interactive overlays and CTA buttons)
- **DON'T** introduce shadows, elevation, or floating elements
- **DON'T** use more than two font weights in a single component unless structurally justified (the Header uses three: 450 for nav, 600 for logo text, 700 for the logo dot)
- **DON'T** apply uppercase to body text, titles, or excerpts
- **DON'T** add decorative elements without clear functional purpose
- **DON'T** use warm grays — the palette is exclusively zinc

## Responsive Behavior

Primary breakpoint: **md (768px)**. Secondary: **sm (640px)** used in the photography gallery grid.

Below md: hamburger menu, 24px horizontal padding, vertical nav at 1.5rem light weight.
Above md: horizontal nav bar, 72px horizontal padding, social links visible in header.

Grid layouts: homepage uses `grid-cols-3 max-md:grid-cols-1`, portfolio index uses `grid-cols-2 max-md:grid-cols-1`, photography gallery uses `grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1`.

## References

For detailed specifications beyond this summary, consult:

- [Design Philosophy](docs/design/philosophy.md) — Synthesis aesthetic, pillars, anti-patterns
- [Color System](docs/design/colors.md) — Full token reference, usage rules, accessibility
- [Typography](docs/design/typography.md) — Complete type hierarchy, font loading, weight rationale
- [Visual Patterns](docs/design/components.md) — Reusable patterns with Tailwind classes and component index
- [Layout](docs/design/layout.md) — Spacing scale, containers, page structure, responsive behavior
- [Motion](docs/design/motion.md) — Duration scale, easing, animation patterns
- [Maintenance](docs/design/maintenance.md) — How to update and evolve these docs
- [Agent Prompt Guide](docs/design/prompts.md) — Quick color reference and example prompts
