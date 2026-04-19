# Linting & Formatting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure Biome (formatter) + ESLint (linter) with git pre-commit hooks and Claude Code auto-format hooks.

**Architecture:** Biome replaces Prettier as the code formatter (Rust-based, ~35x faster). ESLint stays for Next.js-specific lint rules (`@next/eslint-plugin-next`, react-hooks, jsx-a11y) that Biome doesn't have. `eslint-config-prettier` disables ESLint's formatting rules to avoid conflicts. Husky + lint-staged enforce formatting/linting on git commit. Claude Code PostToolUse hooks auto-format files after Write/Edit.

**Tech Stack:** Biome 2.x, ESLint 9 (flat config), eslint-config-prettier, husky, lint-staged

---

## File Structure

| File | Responsibility |
|------|---------------|
| `biome.json` | Biome formatter config (linter disabled) |
| `.editorconfig` | Editor-agnostic formatting defaults |
| `eslint.config.mjs` | ESLint config (existing, add prettier compat) |
| `package.json` | Scripts and lint-staged config (existing, modify) |
| `.husky/pre-commit` | Git pre-commit hook |
| `.claude/settings.json` | Claude Code PostToolUse hooks |

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Biome (exact version)**

```bash
npm install --save-exact --save-dev @biomejs/biome
```

- [ ] **Step 2: Install eslint-config-prettier, husky, lint-staged**

```bash
npm install --save-dev eslint-config-prettier husky lint-staged
```

- [ ] **Step 3: Verify packages installed**

Run: `npx biome --version`
Expected: Prints a version like `2.x.x`

Run: `node -e "require('eslint-config-prettier')"`
Expected: No error

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add biome, eslint-config-prettier, husky, lint-staged"
```

---

### Task 2: Create Biome Configuration

**Files:**
- Create: `biome.json`

- [ ] **Step 1: Create `biome.json`**

```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.4/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf",
    "ignore": [
      ".next/**",
      "out/**",
      "build/**",
      ".vercel/**",
      ".superpowers/**"
    ]
  },
  "linter": {
    "enabled": false
  },
  "organizeImports": {
    "enabled": false
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "semicolons": "always",
      "trailingCommas": "all",
      "bracketSpacing": true,
      "arrowParentheses": "always"
    }
  },
  "json": {
    "formatter": {
      "trailingCommas": "none"
    }
  },
  "files": {
    "ignore": [
      "*.md",
      "*.mdx"
    ]
  }
}
```

Key decisions:
- `linter.enabled: false` — ESLint handles linting
- `organizeImports.enabled: false` — avoids conflicts with ESLint's import rules
- `files.ignore` excludes MD/MDX — Biome has no MDX support
- Formatting settings match existing codebase conventions (double quotes, semicolons, 2-space indent)

- [ ] **Step 2: Verify Biome can format a file**

Run: `npx biome format src/app/layout.tsx`
Expected: Prints the formatted output to stdout (no `--write`, so no changes). No errors.

- [ ] **Step 3: Commit**

```bash
git add biome.json
git commit -m "chore: add biome formatter configuration"
```

---

### Task 3: Create `.editorconfig`

**Files:**
- Create: `.editorconfig`

- [ ] **Step 1: Create `.editorconfig`**

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.mdx]
trim_trailing_whitespace = false
```

Trailing whitespace is preserved for MD/MDX because double-space at end-of-line means `<br>` in Markdown.

- [ ] **Step 2: Commit**

```bash
git add .editorconfig
git commit -m "chore: add editorconfig for consistent editor settings"
```

---

### Task 4: Integrate eslint-config-prettier into ESLint

**Files:**
- Modify: `eslint.config.mjs`

- [ ] **Step 1: Update `eslint.config.mjs`**

Replace the full contents of `eslint.config.mjs` with:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

The only change: import `eslint-config-prettier` and add `prettierConfig` after `...nextTs`. It must come last (before `globalIgnores`) so it can disable formatting rules from all preceding configs.

- [ ] **Step 2: Run ESLint to verify no errors**

Run: `npx eslint`
Expected: No errors (or only pre-existing lint issues, not config errors).

- [ ] **Step 3: Commit**

```bash
git add eslint.config.mjs
git commit -m "chore: add eslint-config-prettier to disable formatting rules"
```

---

### Task 5: Add npm Scripts and lint-staged Config

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add scripts to `package.json`**

Update the `"scripts"` object in `package.json` to:

```json
"scripts": {
  "dev": "next dev --webpack",
  "build": "next build --webpack",
  "start": "next start",
  "lint": "eslint",
  "lint:fix": "eslint --fix",
  "format": "biome format --write .",
  "format:check": "biome format .",
  "prepare": "husky"
}
```

New scripts:
- `lint:fix` — auto-fix ESLint issues
- `format` — format all files with Biome (the user's requested "fix all formatting" script)
- `format:check` — CI-friendly check (exit 1 if unformatted files exist)
- `prepare` — auto-installs husky git hooks on `npm install`

- [ ] **Step 2: Add `lint-staged` config to `package.json`**

Add a top-level `"lint-staged"` key to `package.json`:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,json,css}": [
    "biome format --write --no-errors-on-unmatched"
  ],
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix"
  ]
}
```

Biome formats first (broader file set including JSON/CSS), then ESLint fixes lint issues on JS/TS files. The `--no-errors-on-unmatched` flag prevents Biome from erroring if a staged file type isn't supported.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add format, lint:fix scripts and lint-staged config"
```

---

### Task 6: Initialize Husky and Create Pre-Commit Hook

**Files:**
- Create: `.husky/pre-commit`

- [ ] **Step 1: Initialize husky**

```bash
npx husky init
```

This creates `.husky/pre-commit` with default contents (`npm test`).

- [ ] **Step 2: Replace pre-commit hook contents**

Replace the contents of `.husky/pre-commit` with:

```bash
npx lint-staged
```

That's the entire file — just one line. Husky v9+ doesn't need a shebang or `husky.sh` sourcing.

- [ ] **Step 3: Verify the hook is executable**

Run: `ls -la .husky/pre-commit`
Expected: File has execute permission (`-rwxr-xr-x` or similar). If not:

```bash
chmod +x .husky/pre-commit
```

- [ ] **Step 4: Commit**

```bash
git add .husky/
git commit -m "chore: add husky pre-commit hook with lint-staged"
```

---

### Task 7: Create Claude Code Hooks

**Files:**
- Create: `.claude/settings.json`

- [ ] **Step 1: Verify `.claude/settings.json` does not exist yet**

Run: `ls -la .claude/settings.json 2>&1`
Expected: "No such file or directory" (only `.claude/settings.local.json` exists — that's the personal one, we don't touch it).

- [ ] **Step 2: Create `.claude/settings.json`**

```json
{
  "hooks": {
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
      }
    ]
  }
}
```

How this works:
1. Reads the file path from the PostToolUse JSON payload via `jq`
2. First `case`: if it's a JS/TS/JSON/CSS file, runs Biome format on it
3. Second `case`: if it's a JS/TS file, runs ESLint fix on it
4. `2>/dev/null || true` ensures the hook never blocks Claude on formatter/linter errors

- [ ] **Step 3: Validate JSON syntax**

Run: `jq -e '.hooks.PostToolUse[] | select(.matcher == "Write|Edit") | .hooks[] | select(.type == "command") | .command' .claude/settings.json`
Expected: Prints the command string and exits 0.

- [ ] **Step 4: Pipe-test the hook command with a real file**

```bash
echo '{"tool_name":"Edit","tool_input":{"file_path":"src/app/layout.tsx"},"tool_response":{"filePath":"src/app/layout.tsx"}}' | jq -r '.tool_response.filePath // .tool_input.file_path' | { read -r f; case "$f" in *.js|*.jsx|*.ts|*.tsx|*.json|*.css) npx @biomejs/biome format --write "$f" 2>/dev/null ;; esac; case "$f" in *.js|*.jsx|*.ts|*.tsx) npx eslint --fix "$f" 2>/dev/null ;; esac; } || true
```

Expected: Exits 0. The file `src/app/layout.tsx` may be reformatted (check with `git diff`). If it was reformatted, that's fine — we'll format everything in Task 8 anyway.

- [ ] **Step 5: Commit**

```bash
git add .claude/settings.json
git commit -m "chore: add claude code post-edit format and lint hooks"
```

---

### Task 8: Run Initial Format Pass and Verify

**Files:**
- Modify: All JS/TS/JSON/CSS files in the project (formatting changes only)

- [ ] **Step 1: Format all files with Biome**

```bash
npm run format
```

Expected: Biome reports the number of files formatted. No errors.

- [ ] **Step 2: Run ESLint to verify no conflicts**

```bash
npm run lint
```

Expected: No errors. If there are pre-existing lint issues, that's fine — they existed before this change. There should be no *new* errors caused by the formatter.

- [ ] **Step 3: Run format check to confirm everything is clean**

```bash
npm run format:check
```

Expected: Exit 0. All files are already formatted.

- [ ] **Step 4: Review the formatting diff**

```bash
git diff --stat
```

Look at what changed. Expect mostly whitespace/quote/semicolon changes. Confirm no code logic was altered.

- [ ] **Step 5: Commit the formatting changes**

```bash
git add -A
git commit -m "style: apply biome formatting to entire codebase"
```

- [ ] **Step 6: Test the pre-commit hook fires**

Make a trivial whitespace change to any `.ts` file, stage it, and commit:

```bash
echo "" >> src/lib/posts.ts
git add src/lib/posts.ts
git commit -m "test: verify pre-commit hook"
```

Expected: You see lint-staged running Biome and ESLint before the commit completes. If the hook fires and the commit succeeds, revert the test commit:

```bash
git reset --soft HEAD~1
git checkout -- src/lib/posts.ts
```
