# Dark Mode — Design Spec

**Date:** April 19, 2026
**Status:** Approved
**Branch:** `spike/dark-mode`

---

## Summary

Add dark mode to prometheas.com with system preference tracking and a manual three-state override (System / Light / Dark). The dark theme uses Tailwind's **zinc** palette as the neutral base and shifts the brand red one step lighter for contrast on dark backgrounds.

---

## Color System Changes

### Palette Migration: Slate → Zinc

Replace all slate tokens with the standard Tailwind **zinc** palette (50–950). Zinc has ~5% average saturation (vs slate's 35%), producing a near-neutral canvas that lets the brand red own the color.

| Step | Zinc Hex  | Role (light) | Role (dark) |
|------|-----------|--------------|-------------|
| 50   | `#fafafa` | Page bg      | —           |
| 100  | `#f4f4f5` | Section bg, code bg | —     |
| 200  | `#e4e4e7` | Borders, dividers | —      |
| 300  | `#d4d4d8` | Subtle decorative | —      |
| 400  | `#a1a1aa` | Muted text   | Secondary text |
| 500  | `#71717a` | Body text     | Muted text  |
| 600  | `#52525b` | —            | —           |
| 700  | `#3f3f46` | —            | Borders, dividers |
| 800  | `#27272a` | —            | Surfaces (cards, header) |
| 900  | `#18181b` | —            | Page bg     |
| 950  | `#09090b` | —            | Deepest dark |

### Red Scale (New)

A full 50–950 red scale at hue 9°, with `#C23B22` pinned at step 600 and `#A83019` pinned at step 700.

| Step | Hex       | Usage |
|------|-----------|-------|
| 50   | `#fdf3f1` | Tinted backgrounds |
| 100  | `#fce3de` | Light tinted surfaces |
| 200  | `#f9cbc2` | Borders, subtle accents |
| 300  | `#f2a496` | Icons, secondary accents |
| 400  | `#ea7661` | Dark mode hover state |
| 500  | `#df4e34` | Dark mode primary accent |
| 600  | `#C23B22` | Brand primary (pinned) |
| 700  | `#A83019` | Light mode hover (pinned) |
| 800  | `#812818` | Dark pressed states |
| 900  | `#672418` | Dark surfaces with red tint |
| 950  | `#3e1109` | Deepest red-tinted dark |

### Semantic CSS Variables

Defined in `globals.css`, swapped by `.dark` class on `<html>`.

| Token | Light | Dark |
|-------|-------|------|
| `--bg-base` | zinc-50 (`#fafafa`) | zinc-900 (`#18181b`) |
| `--bg-surface` | white (`#ffffff`) | zinc-800 (`#27272a`) |
| `--bg-muted` | zinc-100 (`#f4f4f5`) | zinc-800 (`#27272a`) |
| `--text-primary` | zinc-900 (`#18181b`) | zinc-100 (`#f4f4f5`) |
| `--text-secondary` | zinc-500 (`#71717a`) | zinc-400 (`#a1a1aa`) |
| `--text-muted` | zinc-400 (`#a1a1aa`) | zinc-500 (`#71717a`) |
| `--border` | zinc-200 (`#e4e4e7`) | zinc-700 (`#3f3f46`) |
| `--border-subtle` | zinc-100 (`#f4f4f5`) | zinc-800 (`#27272a`) |
| `--accent` | red-600 (`#C23B22`) | red-500 (`#df4e34`) |
| `--accent-hover` | red-700 (`#A83019`) | red-400 (`#ea7661`) |

---

## Theme Provider Architecture

### ThemeProvider Component

Client component wrapping `{children}` in `layout.tsx`.

- Reads preference from `localStorage` key `theme` (values: `system`, `light`, `dark`)
- Defaults to `system` on first visit
- In `system` mode, listens to `window.matchMedia('(prefers-color-scheme: dark)')` changes
- Sets/removes `.dark` class on `<html>` element
- Exposes `{ theme, resolvedTheme, setTheme }` via React context
  - `theme`: the stored preference (`system` | `light` | `dark`)
  - `resolvedTheme`: the effective theme (`light` | `dark`)
  - `setTheme(value)`: updates localStorage and applies immediately

### FOUC Prevention

A synchronous inline `<script>` in `<head>` (before CSS loads):

```
Read localStorage.theme
If "dark" → add .dark to <html>
If "system" or absent → check matchMedia('(prefers-color-scheme: dark)')
  If matches → add .dark to <html>
Otherwise → do nothing (light is the default)
```

This runs before first paint, so the page never flashes the wrong theme.

### Tailwind v4 Dark Mode Configuration

Configure class-based dark mode in `globals.css`:

```css
@variant dark (&:where(.dark, .dark *));
```

This enables `dark:` utilities throughout the codebase.

---

## Theme Toggle

Three-state cycle button: Sun (light) → Moon (dark) → Monitor (system).

- **Desktop:** Sits in the header nav bar, alongside existing nav links
- **Mobile:** Appears inside the red curtain nav menu
- Uses simple icon glyphs or minimal SVGs
- Tooltip or aria-label indicates current state
- Cycles on click: system → light → dark → system

---

## Component Migration

Every component migrates from hardcoded slate/black/white classes to semantic CSS variables. The `dark:` Tailwind variant is available for edge cases.

### Shared Components

| Component | Changes |
|---|---|
| `globals.css` | Replace slate → zinc (full scale). Add red scale. Define semantic vars with `.dark` overrides. Configure `@variant dark`. Update `.post-content` selectors. |
| `layout.tsx` | `bg-white text-black` → semantic vars. Add ThemeProvider wrapper. Add FOUC script to `<head>`. |
| `Header.tsx` | `text-black` → `--text-primary`. `text-slate-700` → `--text-secondary`. Gradient rule: `to-slate-100` → `--border-subtle`. Add ThemeToggle. |
| `MobileNav.tsx` | Red curtain stays red in both modes (brand element). Burger bars: `bg-black` → `--text-primary`. Add ThemeToggle inside menu. |
| `Footer.tsx` | `text-slate-500` → `--text-muted`. `bg-slate-100` rule → `--border-subtle`. |
| `SocialLinks.tsx` | `text-slate-500` → `--text-secondary`. `hover:text-red` → `--accent`. |

### Homepage

| Component | Changes |
|---|---|
| `page.tsx` | All `text-slate-*` → semantic vars. `bg-slate-200` dividers → `--border`. Column gradient `via-slate-200` → `--border`. Ornamental dots → `--border-subtle`. |

### Blog Components

| Component | Changes |
|---|---|
| `PostList.tsx` | `text-slate-900` heading → `--text-primary`. `text-slate-500` empty state → `--text-secondary`. |
| `PostExcerpt.tsx` | Date → `--text-secondary`. Category → `--accent`. Title → `--text-primary`. Excerpt → `--text-secondary`. Border → `--border-subtle`. |
| `PostMeta.tsx` | Date → `--text-secondary`. Category → `--accent`. Tags `text-slate-400` → `--text-muted`, hover → `--accent`. |
| `Figure.tsx` | Caption → `--text-secondary`. |
| `Pagination.tsx` | Links → `--text-secondary`, hover → `--accent`. Disabled → `--text-muted`. Counter → `--text-muted`. Border → `--border-subtle`. |

### Blog Post Routes

| Route | Changes |
|---|---|
| `posts/[year]/[month]/[slug]/page.tsx` | Heading → `--text-primary`. |
| `posts/page.tsx`, `posts/category/[category]/page.tsx`, `posts/tag/[tag]/page.tsx`, `posts/year/[year]/page.tsx` | All delegate to PostList — no direct color references. |

### Blog Prose (`.post-content`)

All `.post-content` selectors migrate from hardcoded `var(--color-slate-*)` references to semantic variables. Since semantic vars swap automatically via the `.dark` class, no per-element dark overrides are needed:

| Element | Current CSS | Migrates to |
|---|---|---|
| Links | `var(--color-red)` | `var(--accent)` |
| Blockquote border | `var(--color-red)` | `var(--accent)` |
| Blockquote text | `var(--color-slate-600)` | `var(--text-secondary)` |
| Code block bg | `var(--color-slate-50)` | `var(--bg-muted)` |
| Code block border | `var(--color-slate-200)` | `var(--border)` |
| Footnote divider | `var(--color-slate-200)` | `var(--border)` |
| Footnote heading | `var(--color-slate-900)` | `var(--text-primary)` |

### Unchanged

- **Mobile nav red curtain** — brand element, stays `bg-red` with white text in both modes
- **Hero image** — photographic, no color adjustment needed
- **Typography weights/sizes** — unchanged
- **Layout structure** — unchanged
- **Post redirect route** (`/post/[slug]`) — 301 redirect only, no visual

---

## New Files

| File | Purpose |
|---|---|
| `src/components/ThemeProvider.tsx` | Context provider: localStorage + media query + `.dark` class management |
| `src/components/ThemeToggle.tsx` | Three-state cycle button (sun/moon/monitor) |

---

## Implementation Notes

- The slate → zinc migration is a global find-and-replace in both CSS tokens and Tailwind classes, done as a single atomic step before any dark mode logic is added.
- Semantic CSS variables are consumed via `var(--token-name)` in CSS and via Tailwind's arbitrary value syntax `text-[var(--text-primary)]` in JSX — or by defining custom Tailwind utilities that map to the variables.
- The FOUC script must be inline in `layout.tsx`'s `<head>`, not in an external file, to guarantee synchronous execution before first paint.
