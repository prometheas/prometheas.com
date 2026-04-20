# Kebab-Case File Naming Normalization

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize all PascalCase/camelCase file and directory names to lowercase kebab-case, codify the convention as a hard rule in AGENTS.md, and enforce it via a linting script integrated into pre-commit hooks and Claude Code hooks.

**Architecture:** Rename 24 files (13 source, 11 content) using two-step `git mv` to work around macOS case-insensitive filesystem, update all 20 affected import paths, create a reusable filename validation script, wire it into lint-staged pre-commit and Claude Code PreToolUse/PostToolUse hooks, then verify with TypeScript compiler and full build.

**Tech Stack:** Git, Next.js App Router, TypeScript, MDX, Husky, lint-staged, Claude Code hooks

---

## macOS Case-Insensitive Filesystem

macOS (HFS+/APFS default) treats `Foo.tsx` and `foo.tsx` as the same file. A direct `git mv Foo.tsx foo.tsx` is silently ignored. **Every rename** — even those that add hyphens — must go through a temporary intermediate name to guarantee git tracks the change:

```bash
git mv Foo.tsx foo-tmp.tsx && git mv foo-tmp.tsx foo.tsx
```

This applies to ALL 24 renames in this plan. Do not skip the two-step for any file.

---

## File Structure

**New files:**
- `scripts/check-filename-convention.sh` — reusable kebab-case validation script

**Modified files (import path updates):**
- `mdx-components.tsx` (root)
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/posts/[year]/[month]/[slug]/page.tsx`
- `src/app/portfolio/photography/page.tsx`
- `src/app/posts/page.tsx`
- `src/app/posts/tag/[tag]/page.tsx`
- `src/app/posts/year/[year]/page.tsx`
- `src/app/posts/category/[category]/page.tsx`
- `src/app/posts/page/[page]/page.tsx`
- `src/components/Footer.tsx` (becomes `footer.tsx`)
- `src/components/Header.tsx` (becomes `header.tsx`)
- `src/components/MobileNav.tsx` (becomes `mobile-nav.tsx`)
- `src/components/ThemeToggle.tsx` (becomes `theme-toggle.tsx`)
- `src/app/posts/_components/PostList.tsx` (becomes `post-list.tsx`)

**Modified files (configuration):**
- `AGENTS.md` — naming convention rule
- `package.json` — lint-staged filename check
- `.claude/settings.json` — PreToolUse and PostToolUse hooks

**Renamed files (no content changes beyond import paths):**
- 11 files in `src/components/`
- 2 files in `src/app/`
- 11 files in `content/posts/`

**Not renamed (framework/tooling conventions):**
- `page.tsx`, `layout.tsx`, `globals.css`, `robots.ts`, `sitemap.ts` — Next.js App Router
- `mdx-components.tsx` — Next.js MDX convention
- `next.config.ts`, `biome.json`, `tsconfig.json`, etc. — tooling
- `CLAUDE.md`, `AGENTS.md`, `DESIGN.md`, `README.md` — uppercase doc conventions

---

### Task 1: Create the filename convention checker script

**Files:**
- Create: `scripts/check-filename-convention.sh`

This script is the single source of truth for the naming rule. It will be called by lint-staged (on staged files — **absolute paths**), by Claude Code hooks (on individual file paths — also **absolute paths**), and can be run standalone with relative or absolute paths. It accepts one or more file paths as arguments and exits non-zero if any violate the convention.

**Key design decisions (informed by adversarial review):**
- Paths are normalized to project-relative before checking, so `src/*` / `content/*` matching works regardless of whether the caller passes absolute or relative paths.
- The stem regex allows digit-leading segments (e.g., `2008-12-my-post`) since content posts use date prefixes.
- Exit code is `1` (the hook wrappers translate to exit `2` for Claude Code blocking).

- [ ] **Step 1: Create `scripts/check-filename-convention.sh`**

```bash
#!/usr/bin/env bash
#
# check-filename-convention.sh — enforce lowercase kebab-case filenames
#
# Usage:
#   ./scripts/check-filename-convention.sh file1.tsx file2.mdx ...
#
# Accepts absolute or relative paths. Paths are normalized to
# project-relative before checking (strips everything before src/ or
# content/ when an absolute path is detected).
#
# Exits 0 if all filenames comply, 1 if any violate the convention.
# Prints violating paths to stderr.

set -euo pipefail

# Next.js / framework convention files that are exempt
EXEMPT_BASENAMES="page.tsx|layout.tsx|loading.tsx|error.tsx|not-found.tsx|route.ts|route.tsx|globals.css|sitemap.ts|sitemap.tsx|robots.ts|robots.tsx|mdx-components.tsx|middleware.ts|middleware.tsx|template.tsx|default.tsx|manifest.ts|manifest.tsx|opengraph-image.tsx|twitter-image.tsx|icon.tsx|apple-icon.tsx"

violations=0

for filepath in "$@"; do
  basename="$(basename "$filepath")"

  # Skip dotfiles / dotdirs (e.g. .gitignore, .husky/, .claude/)
  case "$basename" in
    .*) continue ;;
  esac

  # Skip ALL-UPPERCASE filenames (CLAUDE.md, AGENTS.md, README.md, LICENSE, DESIGN.md, etc.)
  if echo "$basename" | grep -qE '^[A-Z][A-Z0-9._-]*$'; then
    continue
  fi

  # Skip framework convention files
  if echo "$basename" | grep -qE "^(${EXEMPT_BASENAMES})$"; then
    continue
  fi

  # ── Normalize to project-relative path ──
  # Both lint-staged and Claude Code hooks pass absolute paths.
  # Strip everything before the first src/ or content/ segment.
  relpath="$filepath"
  case "$relpath" in
    */src/*)     relpath="src/${relpath#*/src/}" ;;
    */content/*) relpath="content/${relpath#*/content/}" ;;
    src/*|content/*) ;; # already relative — keep as-is
    *) continue ;;      # outside scope (root configs, dotfiles, etc.)
  esac

  dirpath="$(dirname "$relpath")"

  # ── Check basename ──
  # Stem = everything before the first dot (extension).
  # Must be: optional leading underscore + one or more kebab segments.
  # Segments may start with digits (e.g., 2008-12-my-post).
  stem="${basename%%.*}"

  if ! echo "$stem" | grep -qE '^_?[a-z0-9]+(-[a-z0-9]+)*$'; then
    echo "ERROR: non-kebab-case filename: $filepath" >&2
    violations=$((violations + 1))
  fi

  # ── Check directory segments (within src/ or content/ only) ──
  # Next.js dynamic segments like [slug], [...rest], [[...opt]] are allowed.
  IFS='/' read -ra parts <<< "$dirpath"
  for part in "${parts[@]}"; do
    case "$part" in
      .|src|content) continue ;;
      \[*) continue ;;  # Next.js dynamic/catch-all segments
      .*) continue ;;   # dotdirs
    esac
    if ! echo "$part" | grep -qE '^_?[a-z0-9]+(-[a-z0-9]+)*$'; then
      echo "ERROR: non-kebab-case directory: $part (in $filepath)" >&2
      violations=$((violations + 1))
    fi
  done
done

if [ "$violations" -gt 0 ]; then
  echo "Found $violations naming convention violation(s). Files under src/ and content/ must use lowercase kebab-case." >&2
  exit 1
fi
```

- [ ] **Step 2: Make the script executable**

```bash
chmod +x scripts/check-filename-convention.sh
```

- [ ] **Step 3: Verify the script catches violations**

Test all key scenarios — relative paths, absolute paths, digit prefixes, exemptions:

```bash
# Should FAIL (exit 1) — PascalCase relative path
./scripts/check-filename-convention.sh src/components/ThemeProvider.tsx
echo "Exit code: $?"

# Should FAIL (exit 1) — PascalCase ABSOLUTE path (simulates Claude Code hooks)
./scripts/check-filename-convention.sh "$(pwd)/src/components/ThemeProvider.tsx"
echo "Exit code: $?"

# Should PASS (exit 0) — kebab-case relative path
./scripts/check-filename-convention.sh src/components/theme-provider.tsx
echo "Exit code: $?"

# Should PASS (exit 0) — kebab-case absolute path
./scripts/check-filename-convention.sh "$(pwd)/src/components/theme-provider.tsx"
echo "Exit code: $?"

# Should PASS (exit 0) — digit-leading stem (date-prefixed content post)
./scripts/check-filename-convention.sh content/posts/2008-12-my-nth-attempt-at-starting-blog.mdx
echo "Exit code: $?"

# Should PASS (exit 0) — Next.js convention file exempt
./scripts/check-filename-convention.sh src/app/posts/page.tsx
echo "Exit code: $?"

# Should PASS (exit 0) — uppercase doc exempt (outside src/content scope)
./scripts/check-filename-convention.sh AGENTS.md
echo "Exit code: $?"

# Should PASS (exit 0) — no arguments (empty is valid)
./scripts/check-filename-convention.sh
echo "Exit code: $?"
```

Expected: First two exit 1 with error messages, all others exit 0.

---

### Task 2: Wire filename check into lint-staged (pre-commit)

**Files:**
- Modify: `package.json` (lint-staged section)

- [ ] **Step 1: Add filename convention check to lint-staged**

In `package.json`, add a new lint-staged entry that runs the script on ALL staged files. This entry must come **before** the existing format/lint entries so naming violations are caught first.

```jsonc
// OLD lint-staged:
"lint-staged": {
  "*.{js,jsx,ts,tsx,json,css}": [
    "biome format --write --no-errors-on-unmatched"
  ],
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix"
  ]
}

// NEW lint-staged:
"lint-staged": {
  "*": [
    "scripts/check-filename-convention.sh"
  ],
  "*.{js,jsx,ts,tsx,json,css}": [
    "biome format --write --no-errors-on-unmatched"
  ],
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix"
  ]
}
```

The `"*"` glob ensures every staged file is checked regardless of extension. The script internally skips files outside `src/` and `content/`, so root configs and dotfiles are unaffected.

- [ ] **Step 2: Test the lint-staged integration**

Stage a test file with a bad name to verify lint-staged catches it:

```bash
touch src/components/TestBadName.tsx
git add src/components/TestBadName.tsx
npx lint-staged --verbose 2>&1 | head -20
# Clean up
git reset HEAD src/components/TestBadName.tsx
rm src/components/TestBadName.tsx
```

Expected: lint-staged output shows the filename convention check failing.

---

### Task 3: Wire filename check into Claude Code hooks

**Files:**
- Modify: `.claude/settings.json`

The existing settings have a PostToolUse hook for Write|Edit that formats and lints. We need to add:
1. A **PreToolUse** hook on `Write` — checks the target file path *before* creation (exit 2 = block)
2. A **PostToolUse** hook on `Bash` — scans for newly created non-compliant files (exit 2 = feedback to Claude)

**Critical: Claude Code hook exit codes** (per official docs):
- `0` = success, tool proceeds
- `2` = **blocking error** — tool call is prevented, stderr fed back to Claude
- Any other code (including `1`) = non-blocking warning, tool proceeds anyway

The checker script exits `1` on violations. The hook wrappers must translate this to exit `2` using `|| exit 2`.

- [ ] **Step 1: Update `.claude/settings.json`**

Replace the entire file with:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "INPUT=$(cat); FILE_PATH=$(echo \"$INPUT\" | jq -r '.tool_input.file_path'); ./scripts/check-filename-convention.sh \"$FILE_PATH\" || exit 2",
            "timeout": 10,
            "statusMessage": "Checking filename convention..."
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_response.filePath // .tool_input.file_path' | { read -r f; case \"$f\" in *.js|*.jsx|*.ts|*.tsx|*.json|*.css) npx @biomejs/biome format --write \"$f\" 2>/dev/null ;; esac; case \"$f\" in *.js|*.jsx|*.ts|*.tsx) npx eslint --fix \"$f\" 2>/dev/null ;; esac; } || true",
            "timeout": 30,
            "statusMessage": "Formatting and linting..."
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "new_files=$(git ls-files --others --exclude-standard -- src/ content/ 2>/dev/null); if [ -n \"$new_files\" ]; then echo \"$new_files\" | xargs ./scripts/check-filename-convention.sh || exit 2; fi",
            "timeout": 10,
            "statusMessage": "Checking new file naming conventions..."
          }
        ]
      }
    ]
  }
}
```

**How this works:**

- **PreToolUse → Write**: Reads the full JSON input into a variable (following the `$(cat)` pattern from Claude Code docs), extracts `file_path` via `jq`, and passes it to the checker script. The `|| exit 2` translates the script's exit 1 into the blocking exit code 2, preventing Claude from creating the file. The script handles absolute paths by normalizing to project-relative before checking.

- **PostToolUse → Bash**: After any Bash command runs, checks `git ls-files --others` (untracked files) under `src/` and `content/` for naming violations. This catches files created by shell commands (e.g., `touch`, `cp`, `echo >`, heredocs). Only fires if there are actually new untracked files, so it's a no-op for most Bash calls. The `|| exit 2` feeds the violation back to Claude so it can fix the filename. Note: this runs after every Bash command — it's lightweight (single git query, ~50ms) but if performance becomes an issue, it can be removed since the PreToolUse Write hook + pre-commit hook provide primary coverage.

- **PostToolUse → Write|Edit**: Existing format/lint hook, unchanged.

---

### Task 4: Rename `src/components/` files (11 files)

**Files:**
- Rename: all 11 `.tsx` files in `src/components/`

- [ ] **Step 1: Rename all component files via two-step git mv**

```bash
cd /Users/yanni/Git-Repositories/Private/prometheas.com-nextjs

git mv src/components/Figure.tsx src/components/figure-tmp.tsx && git mv src/components/figure-tmp.tsx src/components/figure.tsx

git mv src/components/FixedHero.tsx src/components/fixed-hero-tmp.tsx && git mv src/components/fixed-hero-tmp.tsx src/components/fixed-hero.tsx

git mv src/components/Footer.tsx src/components/footer-tmp.tsx && git mv src/components/footer-tmp.tsx src/components/footer.tsx

git mv src/components/Header.tsx src/components/header-tmp.tsx && git mv src/components/header-tmp.tsx src/components/header.tsx

git mv src/components/MobileNav.tsx src/components/mobile-nav-tmp.tsx && git mv src/components/mobile-nav-tmp.tsx src/components/mobile-nav.tsx

git mv src/components/Pagination.tsx src/components/pagination-tmp.tsx && git mv src/components/pagination-tmp.tsx src/components/pagination.tsx

git mv src/components/PostExcerpt.tsx src/components/post-excerpt-tmp.tsx && git mv src/components/post-excerpt-tmp.tsx src/components/post-excerpt.tsx

git mv src/components/PostMeta.tsx src/components/post-meta-tmp.tsx && git mv src/components/post-meta-tmp.tsx src/components/post-meta.tsx

git mv src/components/SocialLinks.tsx src/components/social-links-tmp.tsx && git mv src/components/social-links-tmp.tsx src/components/social-links.tsx

git mv src/components/ThemeProvider.tsx src/components/theme-provider-tmp.tsx && git mv src/components/theme-provider-tmp.tsx src/components/theme-provider.tsx

git mv src/components/ThemeToggle.tsx src/components/theme-toggle-tmp.tsx && git mv src/components/theme-toggle-tmp.tsx src/components/theme-toggle.tsx
```

- [ ] **Step 2: Verify renames tracked by git**

```bash
git status src/components/
```

Expected: 11 `renamed:` entries, no untracked `-tmp` files.

---

### Task 5: Rename `src/app/` component files (2 files)

**Files:**
- Rename: `src/app/portfolio/photography/PhotoGallery.tsx`
- Rename: `src/app/posts/_components/PostList.tsx`

- [ ] **Step 1: Rename both files**

```bash
cd /Users/yanni/Git-Repositories/Private/prometheas.com-nextjs

git mv src/app/portfolio/photography/PhotoGallery.tsx src/app/portfolio/photography/photo-gallery-tmp.tsx && git mv src/app/portfolio/photography/photo-gallery-tmp.tsx src/app/portfolio/photography/photo-gallery.tsx

git mv src/app/posts/_components/PostList.tsx src/app/posts/_components/post-list-tmp.tsx && git mv src/app/posts/_components/post-list-tmp.tsx src/app/posts/_components/post-list.tsx
```

- [ ] **Step 2: Verify renames tracked by git**

```bash
git status src/app/portfolio/photography/ src/app/posts/_components/
```

Expected: 2 `renamed:` entries.

---

### Task 6: Update import paths in component files (intra-component imports)

These are the files that import sibling components via relative paths. They were just renamed, so the file paths below use the new names.

**Files:**
- Modify: `src/components/footer.tsx:1`
- Modify: `src/components/header.tsx:5-7`
- Modify: `src/components/mobile-nav.tsx:5`
- Modify: `src/components/theme-toggle.tsx:4`

- [ ] **Step 1: Update `src/components/footer.tsx`**

Change line 1:
```typescript
// OLD:
import { SocialLinks } from "./SocialLinks";
// NEW:
import { SocialLinks } from "./social-links";
```

- [ ] **Step 2: Update `src/components/header.tsx`**

Change lines 5-7:
```typescript
// OLD:
import { SocialLinks } from "./SocialLinks";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
// NEW:
import { SocialLinks } from "./social-links";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
```

- [ ] **Step 3: Update `src/components/mobile-nav.tsx`**

Change line 5:
```typescript
// OLD:
import { ThemeToggle } from "./ThemeToggle";
// NEW:
import { ThemeToggle } from "./theme-toggle";
```

- [ ] **Step 4: Update `src/components/theme-toggle.tsx`**

Change line 4:
```typescript
// OLD:
import { useTheme } from "./ThemeProvider";
// NEW:
import { useTheme } from "./theme-provider";
```

---

### Task 7: Update import paths in app and root files (external component imports)

**Files:**
- Modify: `mdx-components.tsx:2`
- Modify: `src/app/layout.tsx:3-5`
- Modify: `src/app/page.tsx:2`
- Modify: `src/app/posts/[year]/[month]/[slug]/page.tsx:4`
- Modify: `src/app/portfolio/photography/page.tsx:2`
- Modify: `src/app/posts/_components/post-list.tsx:1-2`
- Modify: `src/app/posts/page.tsx:3`
- Modify: `src/app/posts/tag/[tag]/page.tsx:4`
- Modify: `src/app/posts/year/[year]/page.tsx:4`
- Modify: `src/app/posts/category/[category]/page.tsx:4`
- Modify: `src/app/posts/page/[page]/page.tsx:4`

- [ ] **Step 1: Update `mdx-components.tsx`**

Change line 2:
```typescript
// OLD:
import { Figure } from "@/components/Figure";
// NEW:
import { Figure } from "@/components/figure";
```

- [ ] **Step 2: Update `src/app/layout.tsx`**

Change lines 3-5:
```typescript
// OLD:
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
// NEW:
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
```

- [ ] **Step 3: Update `src/app/page.tsx`**

Change line 2:
```typescript
// OLD:
import { FixedHero } from "@/components/FixedHero";
// NEW:
import { FixedHero } from "@/components/fixed-hero";
```

- [ ] **Step 4: Update `src/app/posts/[year]/[month]/[slug]/page.tsx`**

Change line 4:
```typescript
// OLD:
import { PostMeta as PostMetaComponent } from "@/components/PostMeta";
// NEW:
import { PostMeta as PostMetaComponent } from "@/components/post-meta";
```

- [ ] **Step 5: Update `src/app/portfolio/photography/page.tsx`**

Change line 2:
```typescript
// OLD:
import { PhotoGallery } from "./PhotoGallery";
// NEW:
import { PhotoGallery } from "./photo-gallery";
```

- [ ] **Step 6: Update `src/app/posts/_components/post-list.tsx`**

Change lines 1-2:
```typescript
// OLD:
import { PostExcerpt } from "@/components/PostExcerpt";
import { Pagination } from "@/components/Pagination";
// NEW:
import { PostExcerpt } from "@/components/post-excerpt";
import { Pagination } from "@/components/pagination";
```

- [ ] **Step 7: Update all PostList import paths (5 files)**

Each file has the same change pattern — only the relative depth differs.

`src/app/posts/page.tsx` line 3:
```typescript
// OLD:
import { PostList } from "./_components/PostList";
// NEW:
import { PostList } from "./_components/post-list";
```

`src/app/posts/tag/[tag]/page.tsx` line 4:
```typescript
// OLD:
import { PostList } from "../../_components/PostList";
// NEW:
import { PostList } from "../../_components/post-list";
```

`src/app/posts/year/[year]/page.tsx` line 4:
```typescript
// OLD:
import { PostList } from "../../_components/PostList";
// NEW:
import { PostList } from "../../_components/post-list";
```

`src/app/posts/category/[category]/page.tsx` line 4:
```typescript
// OLD:
import { PostList } from "../../_components/PostList";
// NEW:
import { PostList } from "../../_components/post-list";
```

`src/app/posts/page/[page]/page.tsx` line 4:
```typescript
// OLD:
import { PostList } from "../../_components/PostList";
// NEW:
import { PostList } from "../../_components/post-list";
```

---

### Task 8: Verify source changes compile and commit

- [ ] **Step 1: Run TypeScript compiler**

```bash
npx tsc --noEmit
```

Expected: No errors. If any `Cannot find module` errors appear, the missing module path tells you exactly which import was missed.

- [ ] **Step 2: Commit source renames and import updates**

```bash
git add -A
git commit -m "refactor: rename source files from PascalCase to kebab-case

Rename all component files in src/components/ and src/app/ to use
lowercase kebab-case naming. Update all import paths across the
codebase to match."
```

---

### Task 9: Rename content post files (11 files)

These files have explicit `slug` fields in frontmatter that drive URL routing. The `src/lib/posts.ts` `getAllPostMeta()` function reads filenames dynamically from disk (line 64-71), so renaming is safe — no code changes needed. Slugs remain unchanged.

**Files:**
- Rename: 11 `.mdx` files in `content/posts/`

- [ ] **Step 1: Rename all content files**

```bash
cd /Users/yanni/Git-Repositories/Private/prometheas.com-nextjs

git mv content/posts/A-Fellow-Systems-Guy.mdx content/posts/a-fellow-systems-guy-tmp.mdx && git mv content/posts/a-fellow-systems-guy-tmp.mdx content/posts/a-fellow-systems-guy.mdx

git mv content/posts/Dick-Discusses-Metering.mdx content/posts/dick-discusses-metering-tmp.mdx && git mv content/posts/dick-discusses-metering-tmp.mdx content/posts/dick-discusses-metering.mdx

git mv content/posts/It-s-the-Interface-Stupid.mdx content/posts/it-s-the-interface-stupid-tmp.mdx && git mv content/posts/it-s-the-interface-stupid-tmp.mdx content/posts/it-s-the-interface-stupid.mdx

git mv content/posts/MTA-Fail.mdx content/posts/mta-fail-tmp.mdx && git mv content/posts/mta-fail-tmp.mdx content/posts/mta-fail.mdx

git mv content/posts/Progressive-Enhancement.mdx content/posts/progressive-enhancement-tmp.mdx && git mv content/posts/progressive-enhancement-tmp.mdx content/posts/progressive-enhancement.mdx

git mv content/posts/Pruned-Hedges.mdx content/posts/pruned-hedges-tmp.mdx && git mv content/posts/pruned-hedges-tmp.mdx content/posts/pruned-hedges.mdx

git mv content/posts/The-Steps-to-Windows-Liberation.mdx content/posts/the-steps-to-windows-liberation-tmp.mdx && git mv content/posts/the-steps-to-windows-liberation-tmp.mdx content/posts/the-steps-to-windows-liberation.mdx

git mv content/posts/URLs-Aren-t-Files.mdx content/posts/urls-aren-t-files-tmp.mdx && git mv content/posts/urls-aren-t-files-tmp.mdx content/posts/urls-aren-t-files.mdx

git mv content/posts/UnFAILing-MTA.mdx content/posts/unfailing-mta-tmp.mdx && git mv content/posts/unfailing-mta-tmp.mdx content/posts/unfailing-mta.mdx

git mv content/posts/Zoetrope-Time-Machine-for-the-Internet.mdx content/posts/zoetrope-time-machine-for-the-internet-tmp.mdx && git mv content/posts/zoetrope-time-machine-for-the-internet-tmp.mdx content/posts/zoetrope-time-machine-for-the-internet.mdx

git mv content/posts/sfWordPresserPlugin.mdx content/posts/sf-word-presser-plugin-tmp.mdx && git mv content/posts/sf-word-presser-plugin-tmp.mdx content/posts/sf-word-presser-plugin.mdx
```

- [ ] **Step 2: Verify no orphaned tmp files**

```bash
git status content/posts/
```

Expected: 11 `renamed:` entries, no untracked `-tmp` files.

- [ ] **Step 3: Commit content renames**

```bash
git add -A
git commit -m "refactor: rename content post files to lowercase kebab-case

Lowercase all Title-Case and camelCase MDX filenames in content/posts/.
Frontmatter slug fields are unchanged so URLs are not affected."
```

---

### Task 10: Add naming convention rule to AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Append naming conventions section**

Add after the existing design system paragraph:

```markdown

## Naming Conventions

- All source files and directories under `src/` and `content/` **must** use lowercase kebab-case (e.g., `theme-provider.tsx`, `post-excerpt.tsx`, `a-fellow-systems-guy.mdx`).
- Next.js convention files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `globals.css`, `sitemap.ts`, `robots.ts`) and the root `mdx-components.tsx` retain their framework-mandated names.
- Root config files (`next.config.ts`, `biome.json`, `tsconfig.json`, etc.) and uppercase documentation files (`CLAUDE.md`, `AGENTS.md`, `README.md`, `DESIGN.md`) retain their conventional names.
- Never use PascalCase or camelCase for file or directory names.
- This convention is enforced by `scripts/check-filename-convention.sh`, which runs in pre-commit (via lint-staged) and in Claude Code hooks (PreToolUse on Write, PostToolUse on Bash).
```

- [ ] **Step 2: Commit all enforcement infrastructure + AGENTS.md**

```bash
git add scripts/check-filename-convention.sh package.json .claude/settings.json AGENTS.md
git commit -m "chore: add kebab-case filename linting and enforcement

Add scripts/check-filename-convention.sh to validate filenames.
Wire into lint-staged pre-commit for all staged files.
Add Claude Code PreToolUse hook (Write) and PostToolUse hook (Bash)
to catch non-compliant filenames at authoring time.
Document the naming convention rule in AGENTS.md."
```

---

### Task 11: Full build verification

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Build completes successfully with no module resolution errors.

- [ ] **Step 2: Verify git is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean`

- [ ] **Step 3: Verify the filename checker catches violations end-to-end**

```bash
# Test with renamed files (relative + absolute paths, digit-prefix content)
./scripts/check-filename-convention.sh src/components/header.tsx "$(pwd)/src/app/page.tsx" content/posts/2008-12-my-nth-attempt-at-starting-blog.mdx
echo "Good files exit code: $?"

# Test with a bad name (both relative and absolute)
./scripts/check-filename-convention.sh src/components/BadName.tsx
echo "Bad relative exit code: $?"

./scripts/check-filename-convention.sh "$(pwd)/src/components/BadName.tsx"
echo "Bad absolute exit code: $?"
```

Expected: First exits 0. Second and third exit 1 with error messages.

- [ ] **Step 4: Spot-check dev server**

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/posts/
kill %1
```

Expected: Both return `200`.
