#!/usr/bin/env sh
# Lightweight check for common Uncodixfy-banned patterns.
set -eu
echo "Running Uncodixfy checks..."

patterns=(
  "linear-gradient"
  "border-radius: 20px"
  "border-radius: 24px"
  "border-radius: 32px"
  "borderRadius: '999px'"
  "borderRadius: 999px"
  "box-shadow: 0 24px"
  "backdrop-filter"
  "glassmorphism"
)

fail=0
for p in "${patterns[@]}"; do
  matches=$(grep -REn --exclude-dir=node_modules --exclude-dir=.git "${p}" . || true)
  if [ -n "$matches" ]; then
    echo "Forbidden pattern found: ${p}" >&2
    echo "$matches" >&2
    fail=1
  fi
done

if [ "$fail" -eq 1 ]; then
  echo "Uncodixfy checks failed." >&2
  exit 1
fi

echo "Uncodixfy checks passed."
