# Typography

The typographic system for prometheas.com draws from Swiss modernist traditions -- precise sizing, deliberate tracking, and a restrained weight palette. Every text element occupies a defined role in the hierarchy, and deviations from these values should be intentional and rare.

## Font Loading Strategy

The primary typeface is **Helvetica Neue**, which ships natively on macOS and iOS. For cross-platform coverage, **Inter** is loaded via `next/font/google` and injected as the CSS variable `--font-inter`. The full font stack resolves in this order:

```
"Helvetica Neue", var(--font-inter), -apple-system, sans-serif
```

Inter was chosen as the fallback because its metrics closely match Helvetica Neue -- similar x-height, cap height, and character width -- which minimizes layout shift when the stack resolves to a different face. The `-apple-system` entry provides a final safety net on Apple platforms where neither Helvetica Neue nor Inter is available.

## Type Hierarchy

| Element | Size | Weight | Tracking | Leading | Source |
|---------------------|------------------|-----------------|----------|---------|----------------|
| Logo | 1.1rem | 600 (semibold) | 0.18em | default | Header.tsx |
| Logo dot | -- | 700 (bold) | -- | -- | Header.tsx |
| Nav links (desktop) | 0.78rem (12.5px) | 450 | 0.1em | default | Header.tsx |
| Nav links (mobile) | 1.5rem (24px) | 300 (light) | 0.2em | default | MobileNav.tsx |
| Post title (list) | 1.125rem (18px) | 500 (medium) | default | default | PostExcerpt.tsx |
| Post excerpt | 0.875rem (14px) | 300 (light) | default | relaxed | PostExcerpt.tsx |
| Meta / dates | 0.75rem (12px) | default (400) | wide | default | PostExcerpt.tsx |
| Category labels | 0.75rem (12px) | default (400) | wider | default | PostExcerpt.tsx |
| Tag labels | inherited | default (400) | default | default | PostMeta.tsx |
| Body text | 1rem (16px) | 400 | default | default | globals.css |
| Inline code | 0.875em | default (400) | default | default | globals.css |
| Footnotes heading | 0.875rem | 600 (semibold) | 0.05em | default | globals.css |
| Footnotes text | 0.875rem | default (400) | default | 1.6 | globals.css |
| Footer copyright | 0.75rem (12px) | 300 (light) | default | default | Footer.tsx |
| Figcaption | 0.875rem (14px) | default (400) | default | default | Figure.tsx |
| Pagination text | 0.875rem (14px) | default (400) | default | default | Pagination.tsx |
| Pagination counter | 0.75rem (12px) | default (400) | default | default | Pagination.tsx |

## Text Transform and Tracking Rules

Uppercase letterforms with widened tracking are reserved for elements that function as **labels or navigational signposts** rather than running prose. The following elements use `text-transform: uppercase` combined with positive `letter-spacing`:

- **Logo** -- uppercase at 0.18em tracking. The wide spacing reinforces the logotype as a mark rather than a word to be read.
- **Desktop nav links** -- uppercase at 0.1em. The lighter tracking (relative to the logo) keeps links legible at their small 0.78rem size.
- **Mobile nav links** -- uppercase at 0.2em. The generous tracking pairs with the larger 1.5rem size and light weight to create a theatrical, vertical menu presence.
- **Category labels** -- uppercase with `tracking-wider`. These sit alongside metadata and must read as classifiers, not sentences.
- **Footnotes heading** -- uppercase at 0.05em. A subtle shift that separates the "Footnotes" label from the footnote body text below it.

Uppercase is **never** applied to body text, post titles, excerpts, or any element that carries substantive content. Titles use sentence case. This division keeps the site from drifting into the all-caps aesthetic that erodes readability in long-form contexts.

## Weight Distribution

The weight palette spans from 300 (light) to 700 (bold), but the distribution is deliberate:

- **300 (light)** -- used for secondary or atmospheric text: excerpts, mobile nav links, footer. Light weight signals content that supports rather than leads.
- **400 (regular)** -- the workhorse weight for body text, metadata, captions, and footnotes.
- **450** -- a micro-variation used exclusively for desktop nav links, sitting between regular and medium to avoid visual heaviness at small sizes.
- **500 (medium)** -- reserved for post titles in list views, where the text must anchor the eye without the bluntness of semibold.
- **600 (semibold)** -- the logo and footnotes heading. Structural elements that frame content.
- **700 (bold)** -- used only for the logo's terminal dot, a single punctuation mark that carries the brand's red accent.
