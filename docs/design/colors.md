# Color System

Color on Prometheas.com serves two roles: zinc grays establish atmosphere and hierarchy, while red delivers punctuation and interactivity. The palette is intentionally narrow -- a disciplined set of tokens that prevents color drift and keeps the site visually coherent.

---

## Token Reference

| Token Name | Hex | CSS Variable | Semantic Role | Usage Rule |
|------------|-----|--------------|---------------|------------|
| Red | `#C23B22` | `--color-red` | Primary accent | Interactive elements -- links, hover states, accent dots, active indicators. As background: permitted for interactive overlays (mobile nav) and CTA buttons. Never as background for content regions, cards, or sections. |
| Red Hover | `#A83019` | `--color-red-hover` | Accent hover state | Darkened red for hover/active feedback on interactive elements. Pair exclusively with `--color-red` base states. |
| Zinc 900 | `#18181b` | `--color-zinc-900` | Primary text | Headings and body text on light backgrounds. The darkest neutral in the system. |
| Zinc 700 | `#3f3f46` | `--color-zinc-700` | Secondary text | Subheadings, emphasized metadata, navigation labels. Slightly softer than 900 for secondary hierarchy. |
| Zinc 600 | `#52525b` | `--color-zinc-600` | Tertiary text | Descriptions, supporting copy, timestamps. A workhorse for text that should be present but not dominant. |
| Zinc 500 | `#71717a` | `--color-zinc-500` | Muted text | Placeholders, disabled states, captions, footnotes. The lightest text token safe for extended reading. |
| Zinc 300 | `#d4d4d8` | `--color-zinc-300` | Borders | Hairline rules, dividers, input borders. Visible on white backgrounds without being heavy. |
| Zinc 200 | `#e4e4e7` | `--color-zinc-200` | Subtle borders | Secondary borders, table rules, separator lines. Lighter than 300 for contexts where borders should nearly disappear. |
| Zinc 100 | `#f4f4f5` | `--color-zinc-100` | Surface | Alternate row backgrounds, subtle surface differentiation against white. |
| Zinc 50 | `#fafafa` | `--color-zinc-50` | Canvas tint / Code bg | Code block backgrounds (`<pre>`), page-level background tint when pure white is too stark. |

---

## Usage Rules

**Red tokens (`--color-red`, `--color-red-hover`)**
Red is reserved for elements that invite interaction or demand attention. Links, buttons, the logo dot, navigation hover states, and focus rings. Red backgrounds are permitted in two contexts: interactive overlays (the mobile navigation menu) and CTA buttons (the contact form submit). Red must never fill content areas, appear as a background behind text blocks or cards, or be used decoratively. If red appears, the user should be able to click it or it should be marking something active.

**Dark zincs (`--color-zinc-900`, `--color-zinc-700`)**
These are text colors. Zinc 900 is for primary content -- headings and body paragraphs. Zinc 700 is for secondary elements that need to be legible but should not compete with primary text. Do not use these as background colors.

**Mid zincs (`--color-zinc-600`, `--color-zinc-500`)**
Supporting text tiers. Zinc 600 handles descriptions and metadata that accompany primary content. Zinc 500 is the floor for readable text -- anything lighter risks failing accessibility thresholds on white backgrounds.

**Light zincs (`--color-zinc-300`, `--color-zinc-200`)**
Border and rule colors exclusively. These should never be used for text. Zinc 300 is the default for visible borders; Zinc 200 is for borders that should be felt more than seen.

**Surface zincs (`--color-zinc-100`, `--color-zinc-50`)**
Background tints for subtle surface differentiation. Zinc 100 provides gentle contrast against white for alternate row backgrounds or card surfaces. Zinc 50 is the code block background color and a near-white page tint.

---

## Accessibility

WCAG 2.1 contrast ratios for key combinations (against white `#FFFFFF`):

| Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|------------|------------|-------|---------|----------|
| Zinc 900 (`#18181b`) | White | 17.57:1 | Pass | Pass |
| Zinc 700 (`#3f3f46`) | White | 9.81:1 | Pass | Pass |
| Zinc 600 (`#52525b`) | White | 7.22:1 | Pass | Pass |
| Zinc 500 (`#71717a`) | White | 4.60:1 | Pass | Pass (large text) |
| Red (`#C23B22`) | White | 5.33:1 | Pass | Pass (large text) |
| Zinc 900 (`#18181b`) | Zinc 100 (`#f4f4f5`) | 16.40:1 | Pass | Pass |

**Key constraints:** Zinc 500 and Red pass AA for normal text but fall short of AAA -- they meet AAA only for large text (18px+ or 14px bold). Body copy should use Zinc 900, 700, or 600 for full AAA compliance. Red text should be limited to links and interactive labels where the element's role provides additional context beyond color alone.

---

## Red Scale

The full red scale is available for fine-grained accent control. Brand red (600) and hover red (700) are the primary interactive tokens; the remaining stops are available for tints, tones, and dark mode inversions.

| Step | Hex | Notes |
|------|-----|-------|
| 50 | `#fdf3f1` | Lightest tint |
| 100 | `#fce3de` | |
| 200 | `#f9cbc2` | |
| 300 | `#f2a496` | |
| 400 | `#ea7661` | |
| 500 | `#df4e34` | |
| 600 | `#C23B22` | **Brand red** (`--color-red`) |
| 700 | `#A83019` | **Hover red** (`--color-red-hover`) |
| 800 | `#812818` | |
| 900 | `#672418` | |
| 950 | `#3e1109` | Darkest tone |

---

## Dark Mode

Dark mode is implemented via a `data-theme="dark"` attribute on `<html>`. Each semantic CSS variable is remapped in the dark theme scope. The inversion strategy preserves semantic roles -- the darkest text token in light mode maps to the lightest in dark mode -- while maintaining equivalent contrast ratios against dark backgrounds.

**Semantic variable mappings (dark theme):**

| Semantic Role | Light value | Dark value |
|---------------|-------------|------------|
| Primary text | `zinc-900` (`#18181b`) | `zinc-50` (`#fafafa`) |
| Secondary text | `zinc-700` (`#3f3f46`) | `zinc-300` (`#d4d4d8`) |
| Tertiary text | `zinc-600` (`#52525b`) | `zinc-400` (`#a1a1aa`) |
| Muted text | `zinc-500` (`#71717a`) | `zinc-500` (`#71717a`) |
| Borders | `zinc-300` (`#d4d4d8`) | `zinc-700` (`#3f3f46`) |
| Subtle borders | `zinc-200` (`#e4e4e7`) | `zinc-800` (`#27272a`) |
| Surface | `zinc-100` (`#f4f4f5`) | `zinc-800` (`#27272a`) |
| Canvas tint / Code bg | `zinc-50` (`#fafafa`) | `zinc-950` (`#09090b`) |
| Page background | `white` (`#ffffff`) | `zinc-900` (`#18181b`) |
| Brand red | `#C23B22` | `#C23B22` (unchanged) |
| Red hover | `#A83019` | `#A83019` (unchanged) |

**Note:** `zinc-800` (`#27272a`) and `zinc-950` (`#09090b`) are dark mode tokens. They do not appear in light mode design, but are valid design system values for dark surface and background layers.
