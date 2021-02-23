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

# copy whole webapp folder (remove the folder webapp in the future: server now)
cp -r webapp dist/

# export google cloud api key (this does not work)
# bash --rcfile <(echo '. ~/.bashrc; npm run prodServer &')
# npm run prodServer & 
# export GOOGLE_APPLICATION_CREDENTIALS=/c/Users/yuram/Documents/speech-to-code/src/services/key.json

echo "Ready to built."
