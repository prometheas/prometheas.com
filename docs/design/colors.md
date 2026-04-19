# Color System

Color on Prometheas.com serves two roles: slate grays establish atmosphere and hierarchy, while red delivers punctuation and interactivity. The palette is intentionally narrow -- a disciplined set of tokens that prevents color drift and keeps the site visually coherent.

---

## Token Reference

| Token Name | Hex | CSS Variable | Semantic Role | Usage Rule |
|------------|-----|--------------|---------------|------------|
| Red | `#C23B22` | `--color-red` | Primary accent | Interactive elements -- links, hover states, accent dots, active indicators. As background: permitted for interactive overlays (mobile nav) and CTA buttons. Never as background for content regions, cards, or sections. |
| Red Hover | `#A83019` | `--color-red-hover` | Accent hover state | Darkened red for hover/active feedback on interactive elements. Pair exclusively with `--color-red` base states. |
| Slate 900 | `#0f172a` | `--color-slate-900` | Primary text | Headings and body text on light backgrounds. The darkest neutral in the system. |
| Slate 700 | `#334155` | `--color-slate-700` | Secondary text | Subheadings, emphasized metadata, navigation labels. Slightly softer than 900 for secondary hierarchy. |
| Slate 600 | `#475569` | `--color-slate-600` | Tertiary text | Descriptions, supporting copy, timestamps. A workhorse for text that should be present but not dominant. |
| Slate 500 | `#64748b` | `--color-slate-500` | Muted text | Placeholders, disabled states, captions, footnotes. The lightest text token safe for extended reading. |
| Slate 300 | `#cbd5e1` | `--color-slate-300` | Borders | Hairline rules, dividers, input borders. Visible on white backgrounds without being heavy. |
| Slate 200 | `#e2e8f0` | `--color-slate-200` | Subtle borders | Secondary borders, table rules, separator lines. Lighter than 300 for contexts where borders should nearly disappear. |
| Slate 100 | `#f1f5f9` | `--color-slate-100` | Surface | Alternate row backgrounds, subtle surface differentiation against white. |
| Slate 50 | `#f8fafc` | `--color-slate-50` | Canvas tint / Code bg | Code block backgrounds (`<pre>`), page-level background tint when pure white is too stark. |

---

## Usage Rules

**Red tokens (`--color-red`, `--color-red-hover`)**
Red is reserved for elements that invite interaction or demand attention. Links, buttons, the logo dot, navigation hover states, and focus rings. Red backgrounds are permitted in two contexts: interactive overlays (the mobile navigation menu) and CTA buttons (the contact form submit). Red must never fill content areas, appear as a background behind text blocks or cards, or be used decoratively. If red appears, the user should be able to click it or it should be marking something active.

**Dark slates (`--color-slate-900`, `--color-slate-700`)**
These are text colors. Slate 900 is for primary content -- headings and body paragraphs. Slate 700 is for secondary elements that need to be legible but should not compete with primary text. Do not use these as background colors.

**Mid slates (`--color-slate-600`, `--color-slate-500`)**
Supporting text tiers. Slate 600 handles descriptions and metadata that accompany primary content. Slate 500 is the floor for readable text -- anything lighter risks failing accessibility thresholds on white backgrounds.

**Light slates (`--color-slate-300`, `--color-slate-200`)**
Border and rule colors exclusively. These should never be used for text. Slate 300 is the default for visible borders; Slate 200 is for borders that should be felt more than seen.

**Surface slates (`--color-slate-100`, `--color-slate-50`)**
Background tints for subtle surface differentiation. Slate 100 provides gentle contrast against white for alternate row backgrounds or card surfaces. Slate 50 is the code block background color and a near-white page tint.

---

## Accessibility

WCAG 2.1 contrast ratios for key combinations (against white `#FFFFFF`):

| Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|------------|------------|-------|---------|----------|
| Slate 900 (`#0f172a`) | White | 17.85:1 | Pass | Pass |
| Slate 700 (`#334155`) | White | 10.35:1 | Pass | Pass |
| Slate 600 (`#475569`) | White | 7.58:1 | Pass | Pass |
| Slate 500 (`#64748b`) | White | 4.76:1 | Pass | Pass (large text) |
| Red (`#C23B22`) | White | 5.33:1 | Pass | Pass (large text) |
| Slate 900 (`#0f172a`) | Slate 100 (`#f1f5f9`) | 16.30:1 | Pass | Pass |

**Key constraints:** Slate 500 and Red pass AA for normal text but fall short of AAA -- they meet AAA only for large text (18px+ or 14px bold). Body copy should use Slate 900, 700, or 600 for full AAA compliance. Red text should be limited to links and interactive labels where the element's role provides additional context beyond color alone.

---

## Dark Mode

Dark mode tokens are not yet defined. This section is reserved for future implementation. When dark mode is introduced, each token above will receive a corresponding dark variant. The inversion strategy should preserve the same semantic roles -- e.g., the darkest text token in light mode maps to the lightest text token in dark mode -- while maintaining equivalent contrast ratios.
