#!/usr/bin/env bash
# PreToolUse:Write — block file creation if the name violates kebab-case.
# Source: hook:PreToolUse:Write:filename-convention
#
# Called by Claude Code with hook JSON on stdin.
# Exit 0 = allow, exit 2 = block.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK_SOURCE="hook:PreToolUse:Write:filename-convention"

FILE_PATH=$(jq -r '.tool_input.file_path' 2>/dev/null) || {
  echo "[$HOOK_SOURCE] failed to parse tool input JSON" >&2
  exit 2
}

if [ -z "$FILE_PATH" ] || [ "$FILE_PATH" = "null" ]; then
  echo "[$HOOK_SOURCE] no file_path found in tool input" >&2
  exit 2
fi

"$SCRIPT_DIR/../check-filename-convention.sh" "$FILE_PATH" 2>&1 || {
  echo "[$HOOK_SOURCE] blocked — filename violates kebab-case convention" >&2
  exit 2
}
