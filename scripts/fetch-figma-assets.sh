#!/usr/bin/env bash
# Bulk-download Figma MCP assets.
#
#   scripts/fetch-figma-assets.sh public/assets/icons <<'LIST'
#   chevron-down|59cf5d9f-a2a6-42b1-b37d-53bd1fb6eb86.svg
#   search|e39d2798-8425-4f47-b245-fffcf1cd8d6f.svg
#   LIST
#
# Reads `name|asset-id.ext` pairs on stdin; asset ids come from
# `figma-digest.py --assets`. Asset URLs expire after ~7 days, so download
# during the session that produced them.
set -euo pipefail

DEST="${1:?usage: fetch-figma-assets.sh <dest-dir>  (pairs on stdin)}"
mkdir -p "$DEST"
ok=0; fail=0
while IFS='|' read -r name id; do
  [ -z "${name:-}" ] && continue
  ext="${id##*.}"
  if curl -sfL -o "$DEST/$name.$ext" "https://www.figma.com/api/mcp/asset/$id"; then
    ok=$((ok+1))
  else
    echo "FAIL $name ($id)" >&2; fail=$((fail+1))
  fi
done
echo "$DEST: $ok downloaded, $fail failed"

# Figma exports person/avatar images as ~172-byte transparent placeholders.
tiny=$(find "$DEST" -name '*.png' -size -1k 2>/dev/null || true)
[ -n "$tiny" ] && echo "warning: blank placeholder exports (use <Avatar> instead):" && echo "$tiny"
exit 0
