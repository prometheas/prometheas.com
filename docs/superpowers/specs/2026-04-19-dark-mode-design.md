# Dark Mode — Design Spec

**Date:** April 19, 2026
**Status:** Approved
**Branch:** `spike/dark-mode`
**Reviewed by:** Codex adversarial review (all findings addressed)

---

## Summary

Add dark mode to prometheas.com with system preference tracking and a manual three-state override (System / Light / Dark). The dark theme uses Tailwind's **zinc** palette as the neutral base and shifts the brand red two steps lighter for WCAG AA-compliant contrast on dark backgrounds.

---

## Color System Changes

### Palette Migration: Slate → Zinc

Replace all slate tokens with the standard Tailwind **zinc** palette (50–950). Zinc has ~5% average saturation (vs slate's 35%), producing a near-neutral canvas that lets the brand red own the color.

This migration also updates the design documentation (`DESIGN.md`, `docs/design/colors.md`, `docs/design/components.md`, `docs/design/philosophy.md`) to reference zinc instead of slate. The "use cool slate exclusively" guidance becomes "use zinc exclusively."

| Step | Zinc Hex  | Role (light) | Role (dark) |
|------|-----------|--------------|-------------|
| 50   | `#fafafa` | Page bg      | —           |
| 100  | `#f4f4f5` | Section bg, code bg | —     |
| 200  | `#e4e4e7` | Borders, dividers | —      |
| 300  | `#d4d4d8` | Subtle decorative | —      |
| 400  | `#a1a1aa` | —            | Secondary text, muted text |
| 500  | `#71717a` | Body text, muted text | —  |
| 600  | `#52525b` | —            | —           |
| 700  | `#3f3f46` | —            | Borders, dividers, hairlines |
| 800  | `#27272a` | —            | Raised surfaces (cards, header) |
| 900  | `#18181b` | —            | Page bg, inset surfaces (code blocks) |
| 950  | `#09090b` | —            | Deepest dark |

### Red Scale (New)

A full 50–950 red scale at hue 9°, with `#C23B22` pinned at step 600 and `#A83019` pinned at step 700.

| Step | Hex       | Usage |
|------|-----------|-------|
| 50   | `#fdf3f1` | Tinted backgrounds |
| 100  | `#fce3de` | Light tinted surfaces |
| 200  | `#f9cbc2` | Borders, subtle accents |
| 300  | `#f2a496` | Icons, secondary accents |
| 400  | `#ea7661` | Dark mode primary accent (6.13:1 on zinc-900) |
| 500  | `#df4e34` | Dark mode hover state |
| 600  | `#C23B22` | Brand primary (pinned) — light mode links/buttons |
| 700  | `#A83019` | Light mode hover (pinned) |
| 800  | `#812818` | Dark pressed states |
| 900  | `#672418` | Dark surfaces with red tint |
| 950  | `#3e1109` | Deepest red-tinted dark |

### Semantic CSS Variables

Defined in `globals.css`, swapped by `.dark` class on `<html>`.

| Token | Light | Dark | AA Contrast |
|-------|-------|------|-------------|
| `--bg-base` | zinc-50 (`#fafafa`) | zinc-900 (`#18181b`) | — |
| `--bg-surface` | white (`#ffffff`) | zinc-800 (`#27272a`) | 1.19:1 vs base (subtle elevation) |
| `--bg-muted` | zinc-100 (`#f4f4f5`) | zinc-900 (`#18181b`) | Inset on surface, not raised |
| `--text-primary` | zinc-900 (`#18181b`) | zinc-100 (`#f4f4f5`) | 16.97:1 / 16.12:1 |
| `--text-secondary` | zinc-500 (`#71717a`) | zinc-400 (`#a1a1aa`) | 4.63:1 / 6.91:1 |
| `--text-muted` | zinc-500 (`#71717a`) | zinc-400 (`#a1a1aa`) | 4.63:1 / 6.91:1 |
| `--border` | zinc-200 (`#e4e4e7`) | zinc-700 (`#3f3f46`) | — |
| `--border-subtle` | zinc-100 (`#f4f4f5`) | zinc-700 (`#3f3f46`) | Visible on both base and surface |
| `--accent` | red-600 (`#C23B22`) | red-400 (`#ea7661`) | 5.33:1 / 6.13:1 |
| `--accent-hover` | red-700 (`#A83019`) | red-500 (`#df4e34`) | — / 4.45:1 (large text only) |

**Key changes from initial draft (per adversarial review):**

- `--accent` dark mode: red-500 → **red-400** (6.13:1 on zinc-900 vs 4.45:1 — now passes AA normal text)
- `--accent-hover` dark mode: red-400 → **red-500** (hover is transient, AA large text sufficient)
- `--text-muted` light mode: zinc-400 → **zinc-500** (4.63:1 vs 2.46:1 — was critically failing)
- `--text-muted` and `--text-secondary` now share the same values (zinc-500 light / zinc-400 dark) — differentiation is achieved through font weight and context, not color
- `--bg-muted` dark mode: zinc-800 → **zinc-900** (inset rather than raised, preserving visual hierarchy)
- `--border-subtle` dark mode: zinc-800 → **zinc-700** (visible hairlines on both base and surface backgrounds)

### Hover Strategy Change for Dark Mode

The existing `hover:opacity-70` pattern drops contrast below AA on dark backgrounds. In dark mode, interactive hover uses a **color shift** (`--accent` → `--accent-hover`) instead of an opacity reduction. The `opacity-70` pattern is retained for light mode only.

### `color-scheme` Property

The FOUC script and ThemeProvider must also set the CSS `color-scheme` property on `<html>` to match the resolved theme:

```css
html { color-scheme: light; }
html.dark { color-scheme: dark; }
```

This ensures native UA elements (scrollbars, form inputs, autofill backgrounds, `<select>` dropdowns) match the active theme.

---

## Theme Provider Architecture

### ThemeProvider Component

Client component wrapping the **entire `<body>` content** in `layout.tsx` — including Header and Footer, not just `{children}`. This ensures the toggle in Header/MobileNav can consume the theme context.

```tsx
<body suppressHydrationWarning className="...">
  <ThemeProvider>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </ThemeProvider>
</body>
```

- `suppressHydrationWarning` on `<html>` and `<body>` prevents React warnings caused by the FOUC script modifying classes before hydration
- The FOUC script must preserve existing classes on `<html>` (including `next/font` CSS variable classes) — it should **add** `.dark`, never replace `className`

Provider behavior:
- Reads preference from `localStorage` key `theme` (values: `system`, `light`, `dark`)
- Defaults to `system` on first visit
- Validates localStorage value — falls back to `system` if value is unrecognized
- In `system` mode, listens to `window.matchMedia('(prefers-color-scheme: dark)')` changes
- Sets/removes `.dark` class on `<html>` element
- Sets `color-scheme` CSS property on `<html>`
- Listens to `storage` event for cross-tab synchronization
- Exposes `{ theme, resolvedTheme, setTheme }` via React context
  - `theme`: the stored preference (`system` | `light` | `dark`)
  - `resolvedTheme`: the effective theme (`light` | `dark`)
  - `setTheme(value)`: updates localStorage and applies immediately

### Hydration Safety

The ThemeToggle must use a `mounted` state guard to avoid rendering the wrong icon on the server:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <span className="w-5 h-5" />; // placeholder matching icon size
```

### FOUC Prevention

A synchronous inline `<script>` in `<head>` (before CSS loads):

```
Read localStorage.theme
Validate: if not "system", "light", or "dark" → treat as "system"
If "dark" → add .dark to <html>, set color-scheme: dark
If "system" or absent → check matchMedia('(prefers-color-scheme: dark)')
  If matches → add .dark to <html>, set color-scheme: dark
Otherwise → do nothing (light is the default, color-scheme: light via CSS)

Important: use classList.add('dark'), not className assignment,
to preserve next/font classes on <html>
```

This runs before first paint, so the page never flashes the wrong theme.

### Tailwind v4 Dark Mode Configuration

Configure class-based dark mode in `globals.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

This enables `dark:` utilities throughout the codebase.

---

## Theme Toggle

Three-state cycle button: Sun (light) → Moon (dark) → Monitor (system).

- **Desktop:** Sits in the header nav bar, alongside existing nav links
- **Mobile:** Appears inside the red curtain nav menu
- Uses simple SVG icons (sun, moon, monitor)
- `aria-label` describes both current state and next action (e.g., "Theme: system. Click for light mode")
- `role="button"` with `aria-live="polite"` so screen readers announce state changes
- Cycles on click: system → light → dark → system
- Uses `mounted` guard to prevent hydration mismatch (renders size-matched placeholder until client-side)

---

## Component Migration

Every component migrates from hardcoded slate/black/white classes to semantic CSS variables. The `dark:` Tailwind variant is available for edge cases.

### Shared Components

| Component | Changes |
|---|---|
| `globals.css` | Replace slate → zinc (full scale). Add red scale. Define semantic vars with `.dark` overrides. Add `color-scheme` rule. Configure `@variant dark`. Add `@plugin "@tailwindcss/typography"` dark mode config. Update `.post-content` selectors. |
| `layout.tsx` | `bg-white text-black` → semantic vars. Restructure to wrap Header/Footer inside ThemeProvider. Add `suppressHydrationWarning` to `<html>` and `<body>`. Add FOUC script to `<head>`. |
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
| `posts/[year]/[month]/[slug]/page.tsx` | Heading → `--text-primary`. Replace `prose-slate` with semantic prose overrides. |
| `posts/page.tsx`, `posts/category/[category]/page.tsx`, `posts/tag/[tag]/page.tsx`, `posts/year/[year]/page.tsx` | All delegate to PostList — no direct color references. |

### Portfolio, About, and Contact Pages

| Route | Changes |
|---|---|
| `about/page.tsx` | All hardcoded slate/black text → semantic vars. |
| `contact/page.tsx` | Form inputs: add dark mode border/bg/focus-ring styles. Text → semantic vars. |
| `portfolio/page.tsx` | Text and card colors → semantic vars. |
| `portfolio/software/page.tsx` | Project cards, text, borders → semantic vars. |
| `portfolio/photography/page.tsx` | Text → semantic vars. |
| `portfolio/photography/PhotoGallery.tsx` | Caption/overlay text → semantic vars. Image borders if any. |

### Blog Prose (`.post-content`)

All `.post-content` selectors migrate from hardcoded `var(--color-slate-*)` references to semantic variables. Since semantic vars swap automatically via the `.dark` class, no per-element dark overrides are needed for these elements:

| Element | Current CSS | Migrates to |
|---|---|---|
| Links | `var(--color-red)` | `var(--accent)` |
| Blockquote border | `var(--color-red)` | `var(--accent)` |
| Blockquote text | `var(--color-slate-600)` | `var(--text-secondary)` |
| Code block bg | `var(--color-slate-50)` | `var(--bg-muted)` |
| Code block border | `var(--color-slate-200)` | `var(--border)` |
| Footnote divider | `var(--color-slate-200)` | `var(--border)` |
| Footnote heading | `var(--color-slate-900)` | `var(--text-primary)` |

### Syntax Highlighting

The project uses `rehype-pretty-code` with `theme: "github-light"` in `next.config.ts`. This must be updated to support dual themes:

```ts
rehypePlugins: [[rehypePrettyCode, {
  theme: { light: "github-light", dark: "github-dark" },
}]],
```

This generates a single `<code data-theme="github-light github-dark">` element with `--shiki-light`/`--shiki-dark` CSS variables on each `<span>`. CSS switches the active theme:

```css
code[data-theme*=" "],
code[data-theme*=" "] span {
  color: var(--shiki-light);
  background-color: var(--shiki-light-bg);
}
.dark code[data-theme*=" "],
.dark code[data-theme*=" "] span {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
}
```

### Tailwind Typography Plugin

The `@tailwindcss/typography` plugin applies `prose-slate` defaults. Override with semantic prose colors:

```css
.prose {
  --tw-prose-body: var(--text-secondary);
  --tw-prose-headings: var(--text-primary);
  --tw-prose-links: var(--accent);
  --tw-prose-bold: var(--text-primary);
  --tw-prose-counters: var(--text-muted);
  --tw-prose-bullets: var(--text-muted);
  --tw-prose-hr: var(--border);
  --tw-prose-quotes: var(--text-secondary);
  --tw-prose-quote-borders: var(--accent);
  --tw-prose-code: var(--text-primary);
  --tw-prose-pre-code: var(--text-primary);
  --tw-prose-pre-bg: var(--bg-muted);
  --tw-prose-th-borders: var(--border);
  --tw-prose-td-borders: var(--border-subtle);
}
```

### Images and Figures

- **Hero image:** Photographic, no adjustment needed.
- **Blog images:** Most are screenshots or photos that work on both light and dark. For bright screenshots that look jarring on dark backgrounds, `Figure.tsx` applies a subtle border using `--border` to frame the image.
- **Transparent PNGs:** Blog images with transparent backgrounds may need a light background applied in dark mode. Add a `bg-light` utility class for `Figure.tsx` that forces `background: white` regardless of theme, applied via an optional `bgLight` MDX prop.

### Selection Styling

```css
::selection {
  background-color: var(--accent);
  color: white;
}
```

### Focus Rings

All interactive elements use `--accent` for focus ring color:

```css
:focus-visible {
  outline-color: var(--accent);
}
```

### Unchanged

- **Mobile nav red curtain** — brand element, stays `bg-red` with white text in both modes
- **Typography weights/sizes** — unchanged
- **Layout structure** — unchanged (ThemeProvider wraps existing structure)
- **Post redirect route** (`/post/[slug]`) — 301 redirect only, no visual

---

## New Files

| File | Purpose |
|---|---|
| `src/components/ThemeProvider.tsx` | Context provider: localStorage + media query + `.dark` class + `color-scheme` + cross-tab sync |
| `src/components/ThemeToggle.tsx` | Three-state cycle button with hydration safety and ARIA labels |

---

## Design Documentation Updates

The following design docs must be updated alongside implementation to avoid a split-brain design system:

| File | Changes |
|---|---|
| `DESIGN.md` | Replace all slate references with zinc. Update "cool slate exclusively" guidance. Add dark mode section. |
| `docs/design/colors.md` | Replace slate palette with zinc. Add red scale. Document semantic variables and dark mode mappings. Fill in the reserved dark mode section. |
| `docs/design/components.md` | Update all component color references from slate to zinc. Add dark mode behavior notes per component. |
| `docs/design/philosophy.md` | Update "cool slate" references to zinc. |

---

## Implementation Notes

- The slate → zinc migration touches CSS tokens, Tailwind classes in JSX, and design docs. It must also catch `text-black`, `bg-white`, `bg-black`, and any `prose-slate` usage — a simple find-and-replace on "slate" alone is insufficient. Build a verification checklist by grepping for `slate`, `black`, `white`, and `prose` across all source files.
- Semantic CSS variables are consumed via `var(--token-name)` in CSS and via Tailwind's arbitrary value syntax `text-[var(--text-primary)]` in JSX — or by defining custom Tailwind utilities that map to the variables.
- The FOUC script must be inline in `layout.tsx`'s `<head>`, not in an external file, to guarantee synchronous execution before first paint. It must use `classList.add` (not `className =`) to preserve `next/font` classes.
- The ThemeProvider wraps the full body content (Header + main + Footer) so the toggle can access context.
