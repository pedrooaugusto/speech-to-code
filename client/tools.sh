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

# build spoken
# cd ../spoken && npm run build && cd ../client

# fixing environment

if [ -z $1 ]; then 
    ENV='dev'
else
    ENV=$1
fi

cp -r ./src/.env* ./dist

if [ $ENV = "prod" ]; then
    if test -f dist/.env.prod; then # check if the file .env.prod exists
        rm -rf dist/.env
        mv dist/.env.prod dist/.env
    fi
fi

echo "Ready to built."
