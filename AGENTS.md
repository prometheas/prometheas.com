# Agent Instructions

When generating, modifying, or reviewing any visual or UI-related code for this project, read and follow the design system specification in [DESIGN.md](./DESIGN.md). For detailed specifications beyond the root summary, consult the sub-files under [docs/design/](./docs/design/).

## Naming Conventions

- All source files and directories under `src/` and `content/` **must** use lowercase kebab-case (e.g., `theme-provider.tsx`, `post-excerpt.tsx`, `a-fellow-systems-guy.mdx`).
- Next.js convention files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `globals.css`, `sitemap.ts`, `robots.ts`) and the root `mdx-components.tsx` retain their framework-mandated names.
- Root config files (`next.config.ts`, `biome.json`, `tsconfig.json`, etc.) and uppercase documentation files (`CLAUDE.md`, `AGENTS.md`, `README.md`, `DESIGN.md`) retain their conventional names.
- Never use PascalCase or camelCase for file or directory names.
- This convention is enforced by `scripts/check-filename-convention.sh`, which runs in pre-commit (via lint-staged) and in Claude Code hooks under `scripts/agent-hooks/` (PreToolUse on Write, PostToolUse on Bash).
