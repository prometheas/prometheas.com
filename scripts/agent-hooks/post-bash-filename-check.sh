#!/usr/bin/env bash
# PostToolUse:Bash — check newly created files for naming violations.
# Source: hook:PostToolUse:Bash:filename-convention
#
# Called by Claude Code with hook JSON on stdin.
# Scans for untracked files under src/ and content/ after every Bash command.
# Exit 2 feeds the violation back to Claude so it can fix the filename.

HOOK_SOURCE="hook:PostToolUse:Bash:filename-convention"

# Drain stdin (hook JSON — not needed for this check)
cat > /dev/null

new_files=$(git ls-files --others --exclude-standard -- src/ content/ 2>/dev/null) || exit 0

if [ -z "$new_files" ]; then
  exit 0
fi

echo "$new_files" | xargs ./scripts/check-filename-convention.sh 2>&1 || {
  echo "[$HOOK_SOURCE] new file(s) violate kebab-case convention" >&2
  exit 2
}
