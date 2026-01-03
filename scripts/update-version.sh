#!/bin/bash

# Update version number across all project files
# Usage: ./scripts/update-version.sh <new_version>
# Example: ./scripts/update-version.sh 1.0.2

set -e

if [ $# -eq 0 ]; then
    echo "Error: No version number provided"
    echo "Usage: $0 <version>"
    echo "Example: $0 1.0.2"
    exit 1
fi

NEW_VERSION="$1"

# Validate version format (basic check for x.y.z)
if ! [[ "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Invalid version format. Expected format: x.y.z (e.g., 1.0.2)"
    exit 1
fi

echo "Updating version to $NEW_VERSION..."

# Get the current version from Info.plist
CURRENT_VERSION=$(grep -A 1 "CFBundleShortVersionString" Sources/Kliply/Info.plist | grep "<string>" | sed 's/.*<string>\(.*\)<\/string>.*/\1/')

if [ -z "$CURRENT_VERSION" ]; then
    echo "Error: Could not detect current version"
    exit 1
fi

echo "Current version: $CURRENT_VERSION"

# Update build-app.sh
if [ -f "build-app.sh" ]; then
    echo "Updating build-app.sh..."
    sed -i '' "s|<string>$CURRENT_VERSION</string>|<string>$NEW_VERSION</string>|g" build-app.sh
fi

# Update README.md
if [ -f "README.md" ]; then
    echo "Updating README.md..."
    sed -i '' "s|/v$CURRENT_VERSION)|/v$NEW_VERSION)|g" README.md
    sed -i '' "s|v$CURRENT_VERSION|v$NEW_VERSION|g" README.md
fi

# Update Info.plist
if [ -f "Sources/Kliply/Info.plist" ]; then
    echo "Updating Info.plist..."
    sed -i '' "s|<string>$CURRENT_VERSION</string>|<string>$NEW_VERSION</string>|g" Sources/Kliply/Info.plist
fi

# Update SettingsView.swift
if [ -f "Sources/Kliply/Views/SettingsView.swift" ]; then
    echo "Updating SettingsView.swift..."
    sed -i '' "s|Version $CURRENT_VERSION|Version $NEW_VERSION|g" Sources/Kliply/Views/SettingsView.swift
fi

# Update Xcode project (MARKETING_VERSION)
if [ -f "Kliply.xcodeproj/project.pbxproj" ]; then
    echo "Updating Kliply.xcodeproj..."
    sed -i '' "s|MARKETING_VERSION = $CURRENT_VERSION|MARKETING_VERSION = $NEW_VERSION|g" Kliply.xcodeproj/project.pbxproj
fi

# Update 5-build-for-app-store.sh if it has VERSION variable
if [ -f "scripts/5-build-for-app-store.sh" ]; then
    echo "Updating scripts/5-build-for-app-store.sh..."
    sed -i '' "s|VERSION=\"$CURRENT_VERSION\"|VERSION=\"$NEW_VERSION\"|g" scripts/5-build-for-app-store.sh 2>/dev/null || true
fi

# Update showcase Hero.tsx
if [ -f "showcase/src/components/Hero.tsx" ]; then
    echo "Updating showcase/src/components/Hero.tsx..."
    sed -i '' "s|/v$CURRENT_VERSION\"|/v$NEW_VERSION\"|g" showcase/src/components/Hero.tsx
    sed -i '' "s|v$CURRENT_VERSION|v$NEW_VERSION|g" showcase/src/components/Hero.tsx
fi

echo ""
echo "✅ Version updated successfully from $CURRENT_VERSION to $NEW_VERSION"
echo ""
echo "Files updated:"
echo "  - build-app.sh"
echo "  - README.md"
echo "  - Sources/Kliply/Info.plist"
echo "  - Sources/Kliply/Views/SettingsView.swift"
echo "  - Kliply.xcodeproj/project.pbxproj"
echo "  - showcase/src/components/Hero.tsx"
echo ""
echo "Don't forget to:"
echo "  1. Review the changes with: git diff"
echo "  2. Commit the changes: git add -A && git commit -m 'Bump version to $NEW_VERSION'"
echo "  3. Create a git tag: git tag v$NEW_VERSION"
echo "  4. Push changes: git push && git push --tags"
