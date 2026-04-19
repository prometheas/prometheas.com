# Motion

Motion on prometheas.com serves clarity, not decoration. Every transition communicates a state change or reveals content that was previously hidden. There are no ambient animations, no looping effects, and no motion applied purely for visual interest. The animation vocabulary is small and consistent: translate, opacity, and color.

## Duration Scale

| Duration | Value | Usage |
|----------|-------|-----------------------------------------------|
| 150ms | default | Link hover transitions (color, opacity) |
| 300ms | short | Nav link stagger entrance, social icon fade-in |
| 350ms | medium | Hamburger icon line morphing |
| 500ms | long | Mobile menu slide and fade |

The scale is compressed. The longest animation in the system is half a second. This restraint prevents the interface from feeling sluggish -- users should never wait for an animation to finish before they can act.

## Easing

A single easing curve governs all transitions:

```
cubic-bezier(0.4, 0, 0.2, 1)
```

This is Tailwind's default `ease-in-out` and corresponds to Material Design's standard curve. It accelerates gently out of rest and decelerates into the final position, producing motion that feels physical without being dramatic. No other easing functions are used anywhere in the codebase.

## Animation Patterns

### Hamburger Morph

The mobile menu toggle consists of three horizontal lines that transform into a close icon:

- **Top line**: rotates +45 degrees around its center, forming one arm of the X.
- **Bottom line**: rotates -45 degrees, forming the other arm.
- **Middle line**: fades to opacity 0, disappearing entirely.
- **Color**: shifts from black (`text-black`) to white (`text-white`) as the dark menu overlay appears behind it.

All three lines animate at 350ms with the standard easing curve. The rotation and color change happen simultaneously, not sequentially.

### Menu Slide

The mobile navigation overlay enters from above:

- **From**: `-translate-y-full` (fully offscreen above the viewport), `opacity-0`.
- **To**: `translate-y-0` (natural position), `opacity-1`.
- **Duration**: 500ms.

The reverse plays on close. The vertical slide direction reinforces the spatial metaphor of the menu descending from the header.

### Nav Link Stagger

Once the menu overlay is visible, individual navigation links animate in with a cascading delay:

- **From**: `opacity-0`, `-translate-y-5` (shifted 1.25rem upward).
- **To**: `opacity-1`, `translate-y-0`.
- **Duration**: 300ms per link.
- **Delay**: starts at 150ms for the first link, increments by 70ms for each subsequent link.

The stagger creates a waterfall effect that draws the eye downward through the list, establishing a reading order without requiring explicit visual indicators.

### Social Icons

Social media icons in the mobile menu fade in after the nav links have settled:

- **From**: `opacity-0`, `-translate-y-2.5` (shifted 0.625rem upward).
- **To**: `opacity-1`, `translate-y-0`.
- **Duration**: 300ms.
- **Delay**: 350ms (timed to begin after the last nav link has started its entrance).

### Link Hovers

Desktop link interactions use simple single-property transitions:

- **Navigation links**: `transition-colors` at 150ms. Text shifts from `slate-700` to the brand red on hover.
- **Content links** (blog post body, homepage columns): `transition-opacity` at 150ms. Opacity drops to 0.7 on hover.
- **Social icons** (header/footer): `transition-colors` at 150ms. Color shifts from `slate-500` to brand red on hover.

### Gallery Thumbnails

Photography gallery thumbnails scale subtly on hover:

- **From**: `scale-100` (default).
- **To**: `scale-105`.
- **Duration**: 300ms via `transition-transform`.

This is the only scale transform in the system. It provides tactile feedback on the clickable thumbnail without disrupting the grid layout.

## Principles

1. **State transitions only.** Animation marks the boundary between two discrete states (open/closed, hidden/visible, default/hovered). It never runs unprompted.
2. **Translate, opacity, scale, and color.** These properties compose the animation vocabulary. Translate, opacity, and scale are GPU-accelerated and do not trigger layout recalculation. Color transitions handle hover states.
3. **One curve.** A single easing function eliminates visual inconsistency and reduces the cognitive load of maintaining the motion system.
4. **Short durations.** Nothing exceeds 500ms. The interface should feel responsive even during transitions.
