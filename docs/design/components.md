# Visual Patterns

This document describes the reusable visual patterns that appear across multiple components in the prometheas.com design system. Patterns are stable abstractions; components are concrete examples of patterns in action. Source code is the authority for implementation details — refer to the files listed in each section when in doubt.

Refer to [colors.md](colors.md), [typography.md](typography.md), and [motion.md](motion.md) for the supporting systems that underpin these patterns.

---

## Brand Accent Patterns

### Red Dot Accent

A small hollow circle in brand red used as a heading ornament. Appears in the logo (the bold `.` after "Prometheas"), homepage column headings, and portfolio card headings. The circle signals content hierarchy and brand identity in a single non-intrusive mark.

**Logo dot** — inline `<span>` with `text-red font-bold`:

```tsx
Prometheas<span className="text-red font-bold">.</span>com
```

**Column / card heading circle** — a `<span>` rendered inside an `h2` flex row:

```tsx
<h2 className="text-[1.15rem] font-medium text-slate-900 mb-4 flex items-center gap-2.5">
  <span className="w-2 h-2 border-[1.5px] border-red rounded-full shrink-0" />
  {title}
</h2>
```

Used in: `src/app/page.tsx` (Column component), `src/app/portfolio/page.tsx` (card headings).

---

### Gradient Divider

A 1px-tall rule where the leftmost 60px are brand red and the remainder fades to `slate-100`. Implemented as an `::after` pseudo-element on the `<header>`. Reserved for primary landmark boundaries only — overuse dilutes its impact.

```tsx
<header className="... relative
  after:content-[''] after:absolute after:bottom-0
  after:left-[4.5rem] after:right-[4.5rem]
  max-md:after:left-6 max-md:after:right-6
  after:h-px after:bg-gradient-to-r
  after:from-red after:from-[60px]
  after:to-slate-100 after:to-[60px]">
```

Used in: `src/components/Header.tsx`.

---

### Hairline Rules

1px separators in `slate-100` or `slate-200` used throughout the system for rhythm and grouping. Never styled with color or shadow — always neutral.

| Location | Implementation |
|----------|---------------|
| Footer top | `before:h-px before:bg-slate-100` pseudo-element |
| PostExcerpt bottom | `border-b border-slate-100` (removed on last item via `last:border-b-0`) |
| Pagination top | `border-t border-slate-100` |
| Footnotes top | `border-top: 1px solid var(--color-slate-200)` in `.post-content` CSS |

Used in: `src/components/Footer.tsx`, `src/components/PostExcerpt.tsx`, `src/components/Pagination.tsx`, `src/app/globals.css`.

---

## Interactive Patterns

### Link Hover: Color Transition

Navigation links, post titles, and social icons transition to brand red on hover. The default text color is `slate-700` or `slate-900`; the transition is `transition-colors`.

```tsx
// Desktop nav links
className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase
  text-slate-700 no-underline hover:text-red transition-colors"

// Post title in excerpt
className="text-lg font-medium text-slate-900
  no-underline hover:text-red transition-colors"

// SocialLinks icon (text-slate-500 at rest)
className="text-slate-500 hover:text-red transition-colors"
```

Used in: `src/components/Header.tsx`, `src/components/PostExcerpt.tsx`, `src/components/SocialLinks.tsx`, `src/components/Pagination.tsx`.

---

### Link Hover: Opacity Dim

Category labels, content links, and prose links use `hover:opacity-70 transition-opacity` rather than a color change. This preserves the red identity of the element while providing clear feedback.

```tsx
// Category link in PostExcerpt
className="text-xs text-red tracking-wider uppercase
  no-underline hover:opacity-70 transition-opacity"

// Content link in homepage Column
className="text-red no-underline hover:opacity-70 transition-opacity"

// Blog prose (.post-content in globals.css)
a { color: var(--color-red); text-decoration: none; }
a:hover { opacity: 0.7; }
```

Used in: `src/components/PostExcerpt.tsx`, `src/components/PostMeta.tsx`, `src/app/page.tsx`, `src/app/globals.css`.

---

### Group Hover Card

Portfolio cards use a `group` class on the link wrapper so that both the border and the heading text transition to red simultaneously on hover.

```tsx
<Link
  className="group block p-8 border border-slate-200 rounded
    hover:border-red transition-colors no-underline"
>
  <h2 className="... group-hover:text-red transition-colors">
    <span className="w-2 h-2 border-[1.5px] border-red rounded-full shrink-0" />
    Software Projects
  </h2>
</Link>
```

Used in: `src/app/portfolio/page.tsx`.

---

### CTA Button

The primary call-to-action button (contact form submit). Red fill, white text, rounded corners. Darker red on hover via the `red-hover` token.

```tsx
<button
  type="submit"
  className="px-8 py-3 bg-red text-white text-sm font-medium
    tracking-wide uppercase rounded
    hover:bg-red-hover transition-colors cursor-pointer"
>
  Send
</button>
```

Used in: `src/app/contact/page.tsx`.

---

### Focus Ring

Form inputs remove the browser default outline and replace it with a red border and a 1px red ring.

```tsx
className="w-full px-4 py-3 border border-slate-200 rounded
  text-sm text-slate-900 font-light
  focus:outline-none focus:border-red focus:ring-1 focus:ring-red
  transition-colors"
```

Used in: `src/app/contact/page.tsx`.

---

## Layout Patterns

### Centered Content Column

Pages constrain their content to a maximum width and center it horizontally with `mx-auto`. Horizontal padding uses a two-tier system: generous on desktop, compact on mobile.

| Page | Max-width | Desktop padding | Mobile padding |
|------|-----------|-----------------|----------------|
| Contact | `max-w-[600px]` | `px-[4.5rem]` | `max-md:px-6` |
| Header / Footer | — | `px-[4.5rem]` | `max-md:px-6` |
| Portfolio | `max-w-[800px]` | `px-[4.5rem]` | `max-md:px-6` |
| Homepage columns | `max-w-[1200px]` | `px-[4.5rem]` | `max-md:px-6` |

The `4.5rem` desktop side padding is consistent across all content regions. Padding bounds shift inward symmetrically on mobile (`left-6` / `right-6` in pseudo-element implementations).

---

### Flex Column Page Structure

The root layout establishes a full-height flex column so the footer always anchors to the bottom of the viewport on short pages.

```tsx
// layout.tsx
<html className="h-full antialiased">
  <body className="min-h-full flex flex-col font-sans text-black bg-white">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </body>
</html>
```

Used in: `src/app/layout.tsx`.

---

### Responsive Grid Collapse

Three grid variants are used across the site:

```tsx
// 3 → 2 → 1 (photography gallery)
className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4"

// 3 → 1 (homepage columns)
className="grid grid-cols-3 max-md:grid-cols-1"

// 2 → 1 (portfolio index)
className="grid grid-cols-2 max-md:grid-cols-1 gap-8"
```

Used in: `src/app/portfolio/photography/PhotoGallery.tsx`, `src/app/page.tsx`, `src/app/portfolio/page.tsx`.

---

## Navigation Patterns

### Desktop Nav Bar

A horizontal flex row of uppercase tracking links, hidden below the `md` breakpoint.

```tsx
<nav className="hidden md:flex gap-9 items-center">
  <Link className="text-[0.78rem] font-[450] tracking-[0.1em]
    uppercase text-slate-700 no-underline hover:text-red transition-colors">
    Blog
  </Link>
  {/* … */}
</nav>
```

Used in: `src/components/Header.tsx`.

---

### Mobile Overlay Menu

A `fixed` full-width panel painted in brand red that slides down from the top. The hamburger button morphs to an × as the menu opens.

**Hamburger button** (`md:hidden`, `z-[1001]`, `w-7 h-5`): three `h-[2px]` spans at `top-0`, `top-[9px]`, `top-[18px]`. On open: top/bottom rotate to form ×, middle fades (`opacity-0`), all turn white. Transition: `duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]`.

**Overlay panel** (`fixed inset-x-0 top-0 z-[1000] bg-red flex flex-col items-center justify-center`): transitions between `translate-y-0 opacity-100` (open) and `-translate-y-full opacity-0` (closed) with `duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`.

See [motion.md](motion.md) for full animation specification.

Used in: `src/components/MobileNav.tsx`.

---

### Staggered Entrance

Navigation links inside the mobile overlay enter with a cascading delay. Each link starts from `opacity-0 -translate-y-5` and transitions to visible position. Base delay is 150ms; each successive link adds 70ms.

```tsx
// Applied per-link via inline style
const style = open
  ? { transitionDelay: `${150 + i * 70}ms` }
  : { transitionDelay: "0ms" };

// className per link
`text-2xl font-light tracking-[0.2em] uppercase text-white
  transition-all duration-300
  ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`
```

Social icons as a group delay 350ms after the overlay opens.

Used in: `src/components/MobileNav.tsx`.

---

## Content Patterns

### Post List Item

Each post in a list is an `<article>` with a meta row, title link, and optional excerpt text.

```tsx
<article className="py-6 border-b border-slate-100 last:border-b-0">
  {/* Meta row */}
  <div className="flex items-center gap-3 mb-2">
    <time className="text-xs text-slate-500 tracking-wide">{date}</time>
    <span className="text-slate-300">&middot;</span>
    <Link className="text-xs text-red tracking-wider uppercase
      no-underline hover:opacity-70 transition-opacity">{category}</Link>
  </div>
  {/* Title */}
  <Link className="text-lg font-medium text-slate-900
    no-underline hover:text-red transition-colors">{title}</Link>
  {/* Excerpt */}
  <p className="text-sm text-slate-600 leading-relaxed mt-2 font-light">{excerpt}</p>
</article>
```

Used in: `src/components/PostExcerpt.tsx`.

---

### Post Metadata Block

The metadata block at the top of a full post. Wraps with `flex-wrap` to handle multiple tags gracefully. Categories are red (opacity-dim hover); tags are slate-400 (color-transition hover).

```tsx
<div className="flex flex-wrap items-center gap-x-3 gap-y-1
  text-xs text-slate-500 mb-8">
  <time>{date}</time>
  {/* Categories: red, uppercase */}
  <Link className="text-red no-underline hover:opacity-70
    transition-opacity uppercase tracking-wider">{category}</Link>
  {/* Tags: slate-400, hash-prefixed */}
  <Link className="text-slate-400 no-underline hover:text-red
    transition-colors">#{tag}</Link>
</div>
```

Used in: `src/components/PostMeta.tsx`.

---

### Figure with Caption

A semantic `<figure>` wrapping a Next.js `<Image>` with an optional centered caption.

```tsx
<figure className="my-8">
  <Image
    src={src} alt={alt || caption || ""}
    width={800} height={500}
    className="w-full h-auto rounded"
  />
  {caption && (
    <figcaption className="text-sm text-slate-500 mt-2 text-center">
      {caption}
    </figcaption>
  )}
</figure>
```

Used in: `src/components/Figure.tsx`.

---

### Blog Prose Styling

The `.post-content` class in `globals.css` governs typographic treatment of MDX body content. Key rules:

```css
.post-content {
  & p { margin-top: 1em; margin-bottom: 1em; }

  /* Links: red, no underline, opacity-dim hover */
  & a { color: var(--color-red); text-decoration: none; }
  & a:hover { opacity: 0.7; }

  /* Blockquotes: red left border, slate-600 text */
  & blockquote { border-left-color: var(--color-red); color: var(--color-slate-600); }

  /* Inline code: 0.875em */
  & code { font-size: 0.875em; }

  /* Code blocks: slate-50 background, slate-200 border */
  & pre { background: var(--color-slate-50); border: 1px solid var(--color-slate-200); }

  /* Footnotes: separated by slate-200 hairline */
  & .footnotes { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--color-slate-200); }
}
```

Used in: `src/app/globals.css`.

---

## Elevation Policy

This design system does not use `box-shadow`. Visual hierarchy is established entirely through spacing, typography weight, color contrast, and hairline rules. No component should introduce drop shadows — this would break the flat, editorial character of the design.

---

## Component Index

| Component | File | Key Patterns Used |
|-----------|------|-------------------|
| Header | `src/components/Header.tsx` | Gradient Divider, Desktop Nav Bar, Red Dot Accent |
| MobileNav | `src/components/MobileNav.tsx` | Mobile Overlay Menu, Staggered Entrance |
| Footer | `src/components/Footer.tsx` | Hairline Rules, Centered Content Column |
| SocialLinks | `src/components/SocialLinks.tsx` | Link Hover: Color Transition |
| PostExcerpt | `src/components/PostExcerpt.tsx` | Post List Item, Hairline Rules, Link Hover: Color + Opacity |
| PostMeta | `src/components/PostMeta.tsx` | Post Metadata Block, Link Hover: Color + Opacity |
| Figure | `src/components/Figure.tsx` | Figure with Caption |
| Pagination | `src/components/Pagination.tsx` | Hairline Rules, Link Hover: Color Transition |
| PhotoGallery | `src/app/portfolio/photography/PhotoGallery.tsx` | Responsive Grid Collapse |
| Portfolio cards | `src/app/portfolio/page.tsx` | Group Hover Card, Red Dot Accent |
| Contact form | `src/app/contact/page.tsx` | CTA Button, Focus Ring, Centered Content Column |
| Homepage | `src/app/page.tsx` | Red Dot Accent, Responsive Grid Collapse, Centered Content Column |
