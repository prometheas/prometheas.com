#!/usr/bin/env bash
# check-filename-convention.sh — Validate that filenames follow lowercase kebab-case.
#
# Usage:
#   ./scripts/check-filename-convention.sh <file1> [file2 ...]
#
# Called from:
#   1. lint-staged (pre-commit) — absolute paths
#   2. Claude Code PreToolUse hook — absolute paths
#   3. Manual CLI invocation — relative or absolute paths
#
# Rules:
#   - Only validates files under src/ or content/
#   - Skips dotfiles, ALL-UPPERCASE filenames, and Next.js convention files
#   - Stem (basename before first dot) must match: ^_?[a-z0-9]+(-[a-z0-9]+)*$
#   - Directory segments within the subtree are validated with the same pattern
#     (skipping dynamic segments like [slug], dotdirs, and root segments)

set -euo pipefail

# Next.js framework convention files that are exempt from naming rules
NEXTJS_CONVENTIONS=(
  page.tsx layout.tsx loading.tsx error.tsx not-found.tsx
  route.ts route.tsx
  globals.css
  sitemap.ts sitemap.tsx
  robots.ts robots.tsx
  mdx-components.tsx
  middleware.ts middleware.tsx
  template.tsx default.tsx
  manifest.ts manifest.tsx
  opengraph-image.tsx twitter-image.tsx
  icon.tsx apple-icon.tsx
)

violations=0

for filepath in "$@"; do
  # Normalize: strip everything before the first src/ or content/ segment
  rel=""
  if [[ "$filepath" =~ (^|/)(src/.*)$ ]]; then
    rel="${BASH_REMATCH[2]}"
  elif [[ "$filepath" =~ (^|/)(content/.*)$ ]]; then
    rel="${BASH_REMATCH[2]}"
  else
    # Not under src/ or content/ — skip silently
    continue
  fi

  basename_full="${rel##*/}"

  # Skip dotfiles
  if [[ "$basename_full" == .* ]]; then
    continue
  fi

  # Skip ALL-UPPERCASE filenames (e.g. README.md, LICENSE, CLAUDE.md)
  stem_for_upper="${basename_full%%.*}"
  if [[ "$stem_for_upper" =~ ^[A-Z][A-Z0-9._-]*$ ]]; then
    continue
  fi

  # Skip Next.js convention files
  skip=false
  for conv in "${NEXTJS_CONVENTIONS[@]}"; do
    if [[ "$basename_full" == "$conv" ]]; then
      skip=true
      break
    fi
  done
  if $skip; then
    continue
  fi

  # Validate the stem (basename before first dot)
  stem="${basename_full%%.*}"
  if [[ ! "$stem" =~ ^_?[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "FAIL: $filepath — stem '$stem' is not lowercase kebab-case" >&2
    violations=$((violations + 1))
    continue
  fi

  # Validate directory segments within the subtree
  dir_part="${rel%/*}"
  if [[ "$dir_part" == "$rel" ]]; then
    # No directory component (file is at root of src/ or content/)
    continue
  fi

  IFS='/' read -ra segments <<< "$dir_part"
  for seg in "${segments[@]}"; do
    # Skip root segments
    if [[ "$seg" == "src" || "$seg" == "content" || "$seg" == "." ]]; then
      continue
    fi
    # Skip dotdirs
    if [[ "$seg" == .* ]]; then
      continue
    fi
    # Skip Next.js dynamic segments like [slug], [...rest], [[...opt]]
    if [[ "$seg" == \[* ]]; then
      continue
    fi
    # Validate directory segment with the same pattern
    if [[ ! "$seg" =~ ^_?[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
      echo "FAIL: $filepath — directory segment '$seg' is not lowercase kebab-case" >&2
      violations=$((violations + 1))
      break
    fi
  done
done

if [[ $violations -gt 0 ]]; then
  exit 1
fi

exit 0
