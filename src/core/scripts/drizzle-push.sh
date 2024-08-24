#!/bin/bash
 
# This script is used to run drizzle-kit push with a hardcoded drizzle.config.ts file as for some reason it does not register my credentials via an enviormetn variable,only when hardcoded. The hardcoded version is ignored obviouslyy.

# File names and paths
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$(dirname "$(dirname "$(dirname "$SCRIPT_DIR")")")"
ORIGINAL_CONFIG="$PROJECT_ROOT/drizzle.config.ts"
ALT_CONFIG="$PROJECT_ROOT/drizzle.config.alt.ts"
HARDCODED_CONFIG="$PROJECT_ROOT/_templates/drizzle-config.ts"

# Function to check if a command was successful
check_success() {
    if [ $? -ne 0 ]; then
        echo "Error: $1"
        exit 1
    fi
}

# Backup original config
cp "$ORIGINAL_CONFIG" "$ALT_CONFIG"
check_success "Failed to backup original config"

# Copy hardcoded config into place
cp "$HARDCODED_CONFIG" "$ORIGINAL_CONFIG"
check_success "Failed to copy hardcoded config"

# Run drizzle-kit push
cd "$PROJECT_ROOT" && npx drizzle-kit push
check_success "drizzle-kit push failed"

# Restore original config
mv "$ALT_CONFIG" "$ORIGINAL_CONFIG"
check_success "Failed to restore original config"

echo "Drizzle push completed successfully!"