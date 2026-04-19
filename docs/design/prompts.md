# Agent Prompt Guide

Example prompts for AI coding agents working on prometheas.com. These demonstrate how to invoke the design system when generating or modifying UI.

---

## Quick Color Reference

```
Red:        #C23B22  (links, accents, interactive)
Red Hover:  #A83019  (hover/active feedback)
Slate 900:  #0f172a  (headings, body text)
Slate 700:  #334155  (nav labels, secondary text)
Slate 600:  #475569  (descriptions, supporting copy)
Slate 500:  #64748b  (captions, muted text)
Slate 300:  #cbd5e1  (borders)
Slate 200:  #e2e8f0  (subtle borders)
Slate 100:  #f1f5f9  (surface tints)
Slate 50:   #f8fafc  (code blocks, canvas tint)
White:      #FFFFFF  (default background)
Black:      #000000  (body text default)
```

## Example Prompts

**New page layout:**
> "Create a new /uses page for prometheas.com. Follow DESIGN.md. Use max-w-[800px] mx-auto centered layout with the standard two-tier horizontal padding (px-[4.5rem] desktop, max-md:px-6 mobile). Use a font-light h1 in slate-900 with mb-6. Body text in slate-700 font-light with 1.8 leading."

**New component:**
> "Build a 'Related Posts' component for prometheas.com. Follow DESIGN.md patterns: use hairline border-t border-slate-100 as separator. Post links should be text-red no-underline with hover:opacity-70. Meta text in text-xs text-slate-500. Keep the component within max-w-[720px]."

**Styling review:**
> "Review this component against DESIGN.md. Check: correct color tokens (no arbitrary grays — use slate scale only), no shadows or elevation, uppercase only on labels/nav, red only on interactive elements."

**Dark mode prep:**
> "When dark mode is added, consult docs/design/colors.md for the token inversion strategy. Each light-mode token maps to a dark equivalent preserving the same semantic role and contrast ratio."
