#!/bin/bash

# BUILD PREPARATION PROCCESS

# stop this script at first error
set -e

# remove current dist folder
rm -rf dist/*

# Build TS Files
tsc

# Run actual build script
node dist/build/build.js

# Remove build script from final bundle
rm -rf dist/build

# Remove test folder
rm -rf dist/__tests__

# Remove docs folder
# rm -rf dist/modules
