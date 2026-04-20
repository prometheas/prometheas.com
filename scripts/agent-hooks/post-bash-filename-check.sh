#!/usr/bin/env bash
# PostToolUse:Bash — check newly created files for naming violations.
# Source: hook:PostToolUse:Bash:filename-convention
#
# Called by Claude Code with hook JSON on stdin.
# Scans for untracked files under src/ and content/ after every Bash command.
# Exit 2 feeds the violation back to Claude so it can fix the filename.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK_SOURCE="hook:PostToolUse:Bash:filename-convention"

# Drain stdin (hook JSON — not needed for this check)
cat > /dev/null

new_files=$(git ls-files --others --exclude-standard -- src/ content/ 2>/dev/null) || exit 0

if [ -z "$new_files" ]; then
  exit 0
fi

printf '%s\0' $new_files | xargs -0 "$SCRIPT_DIR/../check-filename-convention.sh" 2>&1 || {
  echo "[$HOOK_SOURCE] new file(s) violate kebab-case convention" >&2
  exit 2
}
