#!/usr/bin/env bash
# PostToolUse:Write|Edit — format and lint after file modifications.
# Source: hook:PostToolUse:Write|Edit:format-lint
#
# Called by Claude Code with hook JSON on stdin.
# Non-blocking — failures are logged but do not prevent the edit.

HOOK_SOURCE="hook:PostToolUse:Write|Edit:format-lint"

FILE_PATH=$(jq -r '.tool_response.filePath // .tool_input.file_path' 2>/dev/null) || {
  echo "[$HOOK_SOURCE] failed to parse tool input JSON" >&2
  exit 1
}

if [ -z "$FILE_PATH" ] || [ "$FILE_PATH" = "null" ]; then
  exit 0
fi

case "$FILE_PATH" in
  *.js|*.jsx|*.ts|*.tsx|*.json|*.css)
    npx @biomejs/biome format --write -- "$FILE_PATH" >/dev/null 2>&1 || \
      echo "[$HOOK_SOURCE] biome format failed for $FILE_PATH" >&2
    ;;
esac

case "$FILE_PATH" in
  *.js|*.jsx|*.ts|*.tsx)
    npx eslint --fix -- "$FILE_PATH" >/dev/null 2>&1 || \
      echo "[$HOOK_SOURCE] eslint --fix failed for $FILE_PATH" >&2
    ;;
esac

exit 0
