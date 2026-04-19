# Design Style Guide Specification

## Context

Prometheas.com currently has no formal design documentation. Brand identity lives entirely in code (`globals.css` Tailwind v4 theme tokens, component files) and developer memory. This creates friction for AI coding agents, which generate off-brand UI when they lack persistent, structured design context.

Google Stitch introduced the DESIGN.md convention (March 2026) — a markdown file that serializes a design system in a format optimized for LLM consumption. The format has rapidly become a de facto standard (60K+ GitHub stars on VoltAgent/awesome-design-md). This project adopts and extends that convention for prometheas.com.

**Goal**: Create a decomposed design system under `docs/design/` with a self-sufficient root `DESIGN.md` that any AI coding agent can read to generate on-brand UI — without requiring access to the source code.

**Primary audience**: AI coding agents (Claude Code, Cursor, Copilot, etc.)
**Secondary audience**: Human developers (the site owner and potential future contributors)

---

## Deliverables

### Root File: `DESIGN.md`

A self-contained design specification (~100–120 lines) following the Stitch DESIGN.md convention with an additional References section. An agent reading only this file should be able to generate on-brand components.

**Sections (in order — order matters for LLM context processing):**

1. **Overview** — Product description + aesthetic direction (2–3 sentences)
2. **Visual Theme & Atmosphere** — "Synthesis" philosophy: Japanese minimalism meets classical Greek proportion. Enough context for agent judgment calls on ambiguous design decisions
3. **Color Palette & Roles** — Core palette table: token name | hex | CSS variable | semantic role | usage rule. Covers red primary + full slate scale
4. **Typography Rules** — Font stack, hierarchy table: element | size | weight | tracking | leading
5. **Spacing** — Base unit (4px / 0.25rem) + named scale (xs through 2xl)
6. **Component Patterns** — Key components only: links, buttons, nav, blockquotes, code blocks. Default + hover states
7. **Depth & Elevation** — Document the intentional absence of shadows. Site uses borders and hairline rules for hierarchy
8. **Do's and Don'ts** — 8–12 explicit constraints (positive and negative). LLMs respond well to negative instructions
9. **Responsive Behavior** — Breakpoints, mobile nav strategy, container behavior
10. **References** — Pointers to `docs/design/*` sub-files for deeper specifications (extension beyond base Stitch format)

### Sub-files: `docs/design/`

Detailed reference documents for precision work. Each file is self-contained with its own context.

#### `docs/design/philosophy.md` (~60–80 lines)

- **Aesthetic Pillars**: Japanese minimalism (ma 間 — negative space, restraint, asymmetric balance) + Classical Greek influence (proportion, column rhythm, structured hierarchy)
- **Visual Language**: Red dot accents as punctuation. Slate as atmosphere. White as canvas
- **What This Site Is Not**: Anti-patterns (not brutalist, not maximalist, not corporate SaaS, not "generic tech startup")
- **Naming**: The design philosophy is called "Synthesis" — the blending of two classical traditions into a modern digital identity

#### `docs/design/colors.md` (~50–70 lines)

- Full token table: name | hex | CSS variable | Tailwind class | semantic role | usage rule
- Per-token usage rules (e.g., "red: interactive elements only — links, CTAs, accent dots. Never as background fills for content areas")
- Accessibility: contrast ratios for key text/background combinations (WCAG AA minimum)
- Future placeholder: dark mode token mapping

#### `docs/design/typography.md` (~60–80 lines)

- Font loading strategy: Inter via `next/font/google`, Helvetica Neue as native override for Apple devices
- Complete hierarchy table: element → size → weight → tracking → leading → CSS variable
- Elements covered: logo, nav links, page headings (h1–h3), subheadings, body text, captions, inline code, code blocks, footnotes
- Rules: when uppercase + wide tracking is appropriate (nav, logo) vs. sentence case

#### `docs/design/components.md` (~100–150 lines)

- Per component: description, visual spec, states (default/hover/active/disabled/focus), key Tailwind classes
- Components: Header (logo + nav + gradient rule), MobileNav (red curtain, hamburger morph, staggered links), Footer (social links + border), PostExcerpt, PostMeta, Pagination, Figure, PhotoGallery (lightbox), links, blockquotes, code blocks, footnotes
- Pattern guidance: border-top hairline rules vs. gradient dividers — when to use each

#### `docs/design/layout.md` (~50–70 lines)

- Spacing scale table: token | px | rem | usage
- Container widths: xs (20rem), md (28rem), lg (32rem)
- Responsive breakpoints and behavior per breakpoint
- Page-level layout patterns: centered content column, edge-to-edge hero images, header/main/footer flex structure

#### `docs/design/motion.md` (~40–60 lines)

- Duration scale: fast (150ms), default (300ms), slow (500ms)
- Easing curves: cubic-bezier values extracted from MobileNav and PhotoGallery
- Animation patterns: hamburger line morph, menu slide-down with staggered link fade, link hover opacity transitions, gallery thumbnail scale
- Principle: motion serves clarity, not decoration. No gratuitous animation.

#### `docs/design/maintenance.md` (~40–60 lines)

- **When to update**: after adding new components, after design direction shifts, periodic quarterly review
- **How to update**: edit the relevant sub-file first, then sync the root DESIGN.md summary to match
- **Review checklist**: Do tokens match `globals.css`? Do component specs match actual component implementations? Are Do's/Don'ts still accurate?
- **Versioning**: git history serves as changelog. Consider git tags for major design system revisions
- **AI agent testing**: after updates, prompt an agent to generate a sample component and verify output matches brand expectations
- **Single source of truth**: `globals.css` is the canonical token source. Design docs describe and extend — never contradict the code

---

## Content Sources

All design token values will be extracted from these existing files (no invention — document what exists):

| Source File | What It Provides |
| ----------- | ---------------- |
| `src/app/globals.css` | Color tokens, spacing base, font-sans stack, container widths, text scales |
| `src/app/layout.tsx` | Inter font config, metadata, page structure |
| `src/components/Header.tsx` | Logo styling, nav link specs, gradient rule |
| `src/components/MobileNav.tsx` | Animation durations, easing curves, mobile menu behavior |
| `src/components/Footer.tsx` | Footer structure, social link styling |
| `src/components/PostExcerpt.tsx` | Blog card pattern |
| `src/components/Pagination.tsx` | Pagination styling |
| `src/components/PhotoGallery.tsx` | Gallery grid, lightbox behavior |

---

## Format Conventions

- All color values: hex format (e.g., `#C23B22`), with CSS variable name (e.g., `--color-red`)
- Typography: px for sizes, unitless for line-height ratios, em for letter-spacing
- Spacing: both px and rem values
- Component specs: include Tailwind utility classes where they exist in the codebase
- Tables for structured data (colors, typography hierarchy, spacing scale)
- Prose for philosophy, principles, and rules
- Code blocks for CSS variable references and example class compositions

---

## Relationship to Other Project Files

- **`AGENTS.md`** (root): Minimal agent-facing instruction file. Contains only a directive to read and follow `DESIGN.md` for all visual/UI work. Nothing else at this time — scope will grow as needed.
- **`CLAUDE.md`** (root): A symlink to `AGENTS.md`. Ensures Claude Code reads the same instructions without duplication. Created via `ln -s AGENTS.md CLAUDE.md`.
- **`DESIGN.md`** (root): The core design specification. Referenced by AGENTS.md.
- **`globals.css`**: Canonical token source. DESIGN.md documents and extends with semantic rules
- **Component files**: DESIGN.md documents their visual patterns. Components are the source of truth for implementation

---

## Verification Plan

1. **Token accuracy**: Diff every hex value, font size, spacing value in DESIGN.md against `globals.css` and component source files
2. **Completeness**: Verify every existing component has at least a basic entry in `components.md`
3. **Agent test**: Prompt Claude Code to "create a new card component for prometheas.com using DESIGN.md" — verify output uses correct colors, typography, spacing
4. **Human review**: Read the philosophy.md section and confirm it captures the intended aesthetic without over-explaining or misrepresenting
5. **Cross-reference**: Ensure root DESIGN.md summary sections align with their corresponding sub-files (no contradictions)
6. **Maintenance doc**: Verify maintenance.md checklist can be followed by someone unfamiliar with the project
