#!/usr/bin/env bash
set -euo pipefail

SRC=${1:-/Users/austincarson/Projects/foundry/web-apps/portfolio-showcase/orbital-ui-concept}
DEST=${2:-"$(pwd)/public/orbital-ui-demo"}

echo "Source: $SRC"
echo "Dest: $DEST"

if [ ! -d "$SRC" ]; then
  echo "Source path does not exist: $SRC" >&2
  exit 2
fi

pushd "$SRC" >/dev/null

if [ ! -f package.json ]; then
  echo "No package.json in source: $SRC" >&2
  popd >/dev/null
  exit 3
fi

# Install dependencies (use ci if lockfile present)
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

# Build the project
npm run build

# Determine build output folder
if [ -d dist ]; then
  BUILD_DIR=dist
elif [ -d build ]; then
  BUILD_DIR=build
else
  echo "Build output directory not found (expected 'dist' or 'build')." >&2
  ls -la
  popd >/dev/null
  exit 4
fi

popd >/dev/null

# Prepare destination
mkdir -p "$DEST"
# Clear previous build
rm -rf "$DEST"/* || true

# Copy build output
cp -R "$SRC/$BUILD_DIR"/* "$DEST/"

echo "Copied $SRC/$BUILD_DIR -> $DEST"
exit 0
