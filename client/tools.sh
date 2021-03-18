#!/bin/bash

# BUILD PREPARATION PROCCESS

# stop this script at first error
set -e

# remove old build artifacts
rm -rf dist/*

# transpile typescript
tsc

# copy robot-python
cp ./src/editors/default/*.py ./dist/editors/default

echo "Ready to built."
