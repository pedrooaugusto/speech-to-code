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
cp -r icons ./dist/

# copy vscode extension from vscode extension folder
rm -rf ./src/resources/*
cp ../spoken-vscode-driver/*.vsix ./src/resources

# copy extension file to resources folder
mkdir dist/resources
cp -r ./src/resources/** ./dist/resources

# copy html
cp ./src/*.html ./dist

echo "Ready to built."
