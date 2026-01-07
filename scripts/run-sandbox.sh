#!/bin/bash
set -euo pipefail

APP_NAME="Kliply"
PROJECT="Kliply.xcodeproj"
SCHEME="Kliply"
CONFIG="Debug"
ENTITLEMENTS="Sources/Kliply/Kliply-AppStore.entitlements"
BUILD_DIR="build/sandbox"
DERIVED_DATA="$BUILD_DIR/DerivedData"
SYMROOT="$BUILD_DIR"
OBJROOT="$BUILD_DIR/obj"
APP_PATH="$BUILD_DIR/${CONFIG}/${APP_NAME}.app"
BINARY_PATH="${APP_PATH}/Contents/MacOS/${APP_NAME}"
SANDBOX_ENV="APP_SANDBOX_CONTAINER_ID=local-sandbox"

info() { printf "\033[1;34m[INFO]\033[0m %s\n" "$1"; }
success() { printf "\033[1;32m[SUCCESS]\033[0m %s\n" "$1"; }
error() { printf "\033[1;31m[ERROR]\033[0m %s\n" "$1"; exit 1; }

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

info "Running restricted sandbox build and launching with sandbox env"

# Step 0: Kill any running instance
killall -9 "$APP_NAME" 2>/dev/null || true
sleep 1

# Prep build folders
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR" "$OBJROOT"

# Step 1: Build unsigned App Store-style Debug (entitlements applied, no signing)
info "Building (${CONFIG}) with App Store entitlements, unsigned"
xcodebuild \
	-project "$PROJECT" \
	-scheme "$SCHEME" \
	-configuration "$CONFIG" \
	-derivedDataPath "$DERIVED_DATA" \
	SYMROOT="$SYMROOT" \
	OBJROOT="$OBJROOT" \
	CODE_SIGN_IDENTITY="-" \
	CODE_SIGNING_ALLOWED=NO \
	CODE_SIGNING_REQUIRED=NO \
	CODE_SIGN_ENTITLEMENTS="$ENTITLEMENTS" \
	build \
	2>&1 | grep "BUILD" || true

# Verify app exists
[ -d "$APP_PATH" ] || error "App not found at $APP_PATH"
[ -f "$BINARY_PATH" ] || error "Binary not found at $BINARY_PATH"

# Step 2: Launch in sandbox mode (simulates App Store: auto-paste disabled, alternate UI)
info "Launching sandboxed app..."
env $SANDBOX_ENV "$BINARY_PATH" &

success "Sandboxed app launched. Manual paste required (⌘V). Alternate UI should be visible."
