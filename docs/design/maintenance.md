# Design System Maintenance

This document governs how the design system documentation is kept accurate, current, and useful. Design systems rot when documentation diverges from implementation. The practices below prevent that.

---

## When to Update

Update design documentation in the following circumstances:

- **After adding new components.** Any component that introduces new visual patterns, spacing conventions, or interaction models must be documented before the PR is merged.
- **After design direction shifts.** If the design philosophy evolves -- new color tokens, revised typography scale, changed spacing conventions -- update the relevant sub-document first, then propagate changes to any root-level summary documents.
- **Quarterly review.** At minimum once per quarter, audit the design docs against the live site. Token values, component specifications, and do's/don'ts lists accumulate drift over time. A scheduled review catches what incremental updates miss.

---

## How to Update

1. **Edit the specific sub-document first.** Each aspect of the design system lives in its own file under `docs/design/`. Colors live in `colors.md`, philosophy in `philosophy.md`, and so on. Always update the granular file before touching any summary.
2. **Sync root summaries.** If a root-level `DESIGN.md` or similar overview document exists, update it to reflect the changes made in sub-documents. The root document should never contain details that contradict its children.
3. **Commit documentation alongside code.** Design doc changes should live in the same PR as the implementation changes they describe. Never defer documentation to a follow-up PR.

---

## Review Checklist

Before merging any PR that touches the design system, verify:

- [ ] Token values in documentation match `globals.css` (or whichever file is the canonical token source).
- [ ] Component specifications match their actual implementations -- spacing, colors, typography, and interaction states.
- [ ] Do's and Don'ts lists are current and reflect any new patterns or deprecated patterns.
- [ ] Accessibility notes remain accurate -- contrast ratios, focus states, and ARIA patterns.
- [ ] No orphaned references to removed components or deprecated tokens.

---

## Versioning

The design system does not maintain a separate version number. Instead:

- **Git history is the changelog.** Every design doc change is a commit with a descriptive message. To understand how the system evolved, read the log.
- **Consider git tags for major revisions.** When the design system undergoes a significant overhaul -- new color palette, new typography stack, new layout grid -- tag the commit (e.g., `design-v2`) so that the before/after boundary is easy to locate.
- **Never delete, only deprecate.** When removing a token or pattern, mark it as deprecated in documentation with a date and replacement guidance before removing it from code in a subsequent release.

---

## AI Agent Testing

Design documentation serves a dual audience: human contributors and AI coding agents. After updating design docs:

1. **Prompt an AI agent to generate a component** using only the design documentation as context (no visual reference).
2. **Review the output** for adherence to the documented system -- correct token usage, appropriate spacing, proper hierarchy.
3. **If the agent produces off-brand output**, the documentation is ambiguous or incomplete. Revise the docs, not the agent's behavior.

This feedback loop ensures the documentation is precise enough to be machine-actionable, which also makes it precise enough for human contributors.

---

## Automated Validation

The design system's WCAG contrast ratios and accessibility claims should be validated by tooling, not maintained by hand. The recommended approach has three tiers:

1. **Token-level contrast validation (pre-commit).** A lightweight script parses `globals.css` color tokens and verifies that documented foreground/background pairs meet their required WCAG contrast thresholds. This catches regressions when token values change.
2. **Rendered-page contrast validation (CI).** A headless browser tool (axe-core or Pa11y) tests key routes against the rendered DOM, catching contrast issues that token validation cannot — text over images, dynamically applied styles, and Tailwind utilities that resolve at render time.
3. **Static JSX accessibility linting (CI).** `eslint-plugin-jsx-a11y` provides baseline accessibility hygiene (missing alt text, ARIA misuse) though it cannot resolve Tailwind classes to computed colors.

Implementation details are tracked in prometheas/prometheas.com#2.

---

## Single Source of Truth

The canonical sources for design values are split by domain:

- **Color tokens and font stack:** `globals.css` is the single source of truth. The CSS custom properties defined there are the ground truth for the color palette and font-family declaration.
- **Component-level typography and spacing:** Individual component files (`src/components/*.tsx` and page-level files) own their own sizing, weight, tracking, and spacing values. These are applied as inline Tailwind utilities, not centralized tokens.
- **Animation timing:** `src/components/MobileNav.tsx` and other animated components own their duration, easing, and delay values.

Design documentation in `docs/design/` **describes and extends** these sources — providing semantic roles, usage rules, accessibility guidance, and philosophical context. It must never contradict the code. If a discrepancy is found, the code wins, and the documentation must be corrected.

**Future improvement:** Consider consolidating spacing and typography values into `globals.css` as CSS custom properties or Tailwind theme extensions. This would simplify governance by making `globals.css` the single canonical source for all tokens, not just colors and fonts.
