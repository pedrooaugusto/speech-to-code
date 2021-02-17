#!/bin/bash

# BUILD PREPARATION PROCCESS

# stop this script at first error
set -e

# remove old build artifacts
rm -rf dist/*

# build spoken package
cd spoken && npm run build && cd ..

# transpile typescript
tsc

# copy robot-python
cp ./src/robot/*.py ./dist/src/robot

echo "Ready to built."
