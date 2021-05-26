#!/bin/bash

# BUILD THE SHIT
npm run compile

# VS CODE EXTENSIONS PATH
ext_path=/c/Users/yuram/.vscode/extensions/august.spoken-0.0.2

# DELETE OLD FOLDER
find $ext_path/* -maxdepth 0 -type d -not -path $ext_path"/node_modules" -exec rm -rf "{}" ";"
find $ext_path/* -maxdepth 0 -type f -not -path $ext_path"/node_modules" -exec rm -rf "{}" ";"

# RECREATE FOLDER STRUCURE
echo "RECRATING PROJECT STRUCURE"
find . -type d -not -path "./node_modules/*" -not -path "./.vscode-test/*" -exec mkdir -p "$ext_path/{}" ";"

# COPYING FILES
echo "COPYING FILES"
find . -type f -not -path "./node_modules/*" -not -path "./.vscode-test/*" -exec cp -r '{}' "$ext_path/{}" ";"

# INSTALL DEPS
cd $ext_path && npm install --only=prod

# find . -type d -not -path "./node_modules/*" -exec mkdir -p '{}'

# ls $ext_path
# find . -type d -not -path "./node_modules/*"