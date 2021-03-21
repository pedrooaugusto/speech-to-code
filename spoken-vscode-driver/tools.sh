#!/bin/bash

# BUILD THE SHIT
npm run compile

# VS CODE EXTENSIONS PATH
ext_path=/c/Users/yuram/.vscode/extensions/pedro.spoken-driver-0.0.2

# RECREATE FOLDER STRUCURE
echo "RECRATING PROJECT STRUCURE"
find . -type d -not -path "./node_modules/*" -exec mkdir -p "$ext_path/{}" ";"

# COPYING FILES
echo "COPYING FILES"
find . -type f -not -path "./node_modules/*" -exec cp -r '{}' "$ext_path/{}" ";"

# find . -type d -not -path "./node_modules/*" -exec mkdir -p '{}'

# ls $ext_path
# find . -type d -not -path "./node_modules/*"