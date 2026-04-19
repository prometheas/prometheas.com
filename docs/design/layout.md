# Layout

The layout system prioritizes vertical rhythm and a narrow content column. Pages are structured as a flex column that stretches to fill the viewport, with the main content area expanding to consume all available space between the header and footer. Horizontal padding shifts between two fixed values at the `md` breakpoint, and container widths are constrained to keep line lengths comfortable for reading.

## Spacing Scale

Tailwind CSS v4 uses a base spacing unit of `0.25rem` (4px). The following values appear across the component set:

| Token | rem | px | Common usage |
|-------|------:|-----:|--------------------------------------|
| 2 | 0.5 | 8 | mb-2, mt-2 -- tight vertical gaps |
| 3 | 0.75 | 12 | gap-3, mb-3 -- list item spacing |
| 4 | 1.0 | 16 | gap-4, mt-4 -- standard gap |
| 6 | 1.5 | 24 | gap-6, px-6, py-6 -- section padding |
| 7 | 1.75 | 28 | py-7 -- header vertical padding |
| 8 | 2.0 | 32 | gap-8, px-8, pt-8, mb-8, my-8 |
| 9 | 2.25 | 36 | gap-9 -- wide component gap |
| 10 | 2.5 | 40 | pt-10 -- top padding |
| 12 | 3.0 | 48 | pb-12, mb-12 -- section breaks |
| 20 | 5.0 | 80 | pt-20 -- page-level top offset |

## Container Widths

Content widths are applied as inline arbitrary Tailwind values (`max-w-[Xpx]`) rather than CSS custom properties. The following widths appear across page-level components:

| Width | px | Usage |
|-------|-----:|----------------------------------------------|
| Narrow | 600 | Contact page, constrained content |
| Reading | 720 | Blog post pages, post list |
| Standard | 800 | About, portfolio, general content pages |
| Wide | 1200 | Homepage sections, photography gallery |

All containers are horizontally centered with `mx-auto` and use the standard two-tier horizontal padding (72px desktop / 24px mobile).

## Page Structure

The root layout follows a full-height flex column pattern:

```
html        h-full
body        min-h-full flex flex-col
  header    (fixed height, flex row)
  main      flex-1  (expands to fill remaining viewport)
  footer    (fixed height, centered text)
```

The `flex-1` on the main element ensures the footer is pushed to the bottom of the viewport even when content is short, without resorting to sticky or fixed positioning.

## Horizontal Padding

A two-tier padding system governs the left and right margins of the header and footer:

| Breakpoint | Value | rem | px |
|------------|------------|------:|-----:|
| >= md | px-[4.5rem] | 4.5 | 72 |
| < md | px-6 | 1.5 | 24 |

This creates generous horizontal breathing room on desktop while reclaiming space on smaller screens. The `4.5rem` value is applied as an arbitrary Tailwind value rather than a scale token, reflecting a deliberate design decision to sit outside the standard spacing grid.

## Responsive Behavior

The site uses two breakpoints:

- **md (768px)** -- the primary threshold between mobile and desktop layouts.
- **sm (640px)** -- a secondary breakpoint used in the photography gallery grid.

Below `md`:
- The hamburger menu replaces the horizontal nav bar.
- Horizontal padding contracts from 72px to 24px.
- Navigation links render vertically at 1.5rem with light weight and wide tracking.
- Multi-column grids collapse to single-column (homepage, portfolio index).

Above `md`:
- Desktop navigation displays as a horizontal flex row.
- The mobile navigation overlay is hidden.
- Full horizontal padding is applied to header and footer.

## Grid Layouts

Several page-level components use multi-column grids:

| Page | Desktop | Mobile (< md) | Small (< sm) |
|------|---------|---------------|--------------|
| Homepage columns | `grid-cols-3` | `grid-cols-1` | -- |
| Portfolio index cards | `grid-cols-2` | `grid-cols-1` | -- |
| Photography gallery | `grid-cols-3` | `grid-cols-2` | `grid-cols-1` |

Grids collapse progressively. Column dividers on the homepage use vertical gradient rules (`::after` pseudo-elements) on desktop, replaced by horizontal hairline borders on mobile.

## Content Width

The primary reading column for blog posts and post listings is constrained to 720px, centered within the viewport. This yields approximately 65-75 characters per line at the 1rem body text size -- within the optimal range for sustained reading. Standard content pages (about, portfolio) use 800px.
