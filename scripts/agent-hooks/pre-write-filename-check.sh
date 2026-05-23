#!/usr/bin/env bash
# PreToolUse:Write — validate filename convention when a concrete file path is present.
# Source: hook:PreToolUse:Write:filename-convention
#
# Called with hook JSON on stdin.
# Exit 0 = allow, exit 2 = block.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK_SOURCE="hook:PreToolUse:Write:filename-convention"

INPUT_JSON="$(cat)"

FILE_PATH="$(
  printf '%s' "$INPUT_JSON" | jq -r '
    .tool_input.file_path //
    .tool_input.filePath //
    .file_path //
    .filePath //
    empty
  ' 2>/dev/null
)"

# No concrete file target means this hook is not applicable.
if [ -z "$FILE_PATH" ] || [ "$FILE_PATH" = "null" ]; then
  exit 0
fi

if ! "$SCRIPT_DIR/../check-filename-convention.sh" "$FILE_PATH"; then
  echo "[$HOOK_SOURCE] blocked — filename violates kebab-case convention: $FILE_PATH" >&2
  exit 2
fi
