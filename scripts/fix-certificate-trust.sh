#!/bin/bash

# Script to reset certificate trust settings
# Fixes "errSecInternalComponent" and "unable to build chain" errors

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "======================================"
echo "Fixing Certificate Trust Settings"
echo "======================================"
echo ""

# Array of certificate names to fix
CERT_NAMES=(
    "Developer ID Application"
    "Developer ID Installer"
    "3rd Party Mac Developer Application"
    "3rd Party Mac Developer Installer"
)

FIXED_COUNT=0
TOTAL_COUNT=0

for CERT_NAME in "${CERT_NAMES[@]}"; do
    echo -e "${YELLOW}Checking: ${CERT_NAME}${NC}"
    
    # Find certificates matching this name
    CERTS=$(security find-certificate -c "$CERT_NAME" -p ~/Library/Keychains/login.keychain-db 2>/dev/null || true)
    
    if [ -z "$CERTS" ]; then
        echo -e "  No certificates found"
        echo ""
        continue
    fi
    
    # Export to temp file
    TEMP_CERT="/tmp/cert_${TOTAL_COUNT}.pem"
    security find-certificate -c "$CERT_NAME" -p ~/Library/Keychains/login.keychain-db > "$TEMP_CERT" 2>/dev/null || true
    
    if [ ! -s "$TEMP_CERT" ]; then
        echo -e "  Could not export certificate"
        rm -f "$TEMP_CERT"
        echo ""
        continue
    fi
    
    # Check if it has custom trust settings
    if security dump-trust-settings 2>&1 | grep -q "$CERT_NAME"; then
        echo -e "  ${YELLOW}Found custom trust settings - removing...${NC}"
        
        # Try to remove trust settings
        if security remove-trusted-cert "$TEMP_CERT" 2>/dev/null; then
            echo -e "  ${GREEN}✓ Trust settings removed${NC}"
            ((FIXED_COUNT++))
        else
            echo -e "  ${YELLOW}Already fixed or no custom trust${NC}"
        fi
    else
        echo -e "  ${GREEN}✓ No custom trust settings (already correct)${NC}"
    fi
    
    rm -f "$TEMP_CERT"
    ((TOTAL_COUNT++))
    echo ""
done

echo "======================================"
if [ $FIXED_COUNT -gt 0 ]; then
    echo -e "${GREEN}Fixed $FIXED_COUNT certificate(s)${NC}"
else
    echo -e "${GREEN}All certificates already have correct trust settings${NC}"
fi
echo "======================================"
echo ""
echo "You can now sign your app with:"
echo "  ./scripts/2-sign-app.sh"
echo "  or"
echo "  ./scripts/5-build-for-app-store.sh"
