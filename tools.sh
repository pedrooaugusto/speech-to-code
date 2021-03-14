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

# copy whole webapp folder (remove the folder webapp in the future: its on the server now)
cp -r webapp dist/

# compile sass files
sass server/public/assets/styles.scss:server/public/assets/styles.css --no-source-map

# watch script
# sass --watch server/public/assets/styles.scss:server/public/assets/styles.css --no-source-map

# export google cloud api key (this does not work)
# bash --rcfile <(echo '. ~/.bashrc; npm run prodServer &')
# npm run prodServer & 
# export GOOGLE_APPLICATION_CREDENTIALS=/c/Users/yuram/Documents/speech-to-code/src/services/key.json

echo "Ready to built."
