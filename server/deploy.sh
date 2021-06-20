#!/bin/bash

# BUILD FINAL ARCHIVE THAT WILL BE SEND TO AZURE
# HERE WILL BE COMBINED: SPOKEN, WEBAPP AND SERVER

if [ -z $1 ]; then 
    mode='default'
else
    mode=$1
fi

# BUILD FRONTEND
if [ $mode != "fskip" ]; then
    echo "BUILDING FRONTED"
    rm -rf public/*
    cd ../webapp
    npm run build
    cp -R build/* ../server/public
fi

cd ..

# CREATE FINAL ARCHIVE
echo "CREATING BUILD ARCHIVE"
rm -rf speech-to-code.server.deploy
mkdir speech-to-code.server.deploy
fb_path=`pwd`/speech-to-code.server.deploy

# RECREATE FOLDER STRUCURE
echo "RECRATING PROJECT STRUCURE"
cd server
find . -type d -not -path "./node_modules/*" -exec mkdir -p "$fb_path/{}" ";"

# COPYING FILES
echo "COPYING FILES"
find . -type f -not -path "./node_modules/*" -exec cp -r '{}' "$fb_path/{}" ";"

# COPY SPOKEN
cd ..
mkdir $fb_path/spoken
cp -r spoken/dist/* $fb_path/spoken

# CHANGE A FEW THINGS IN PACKAGE FOR AZURE
echo "UPDATE PACKAGE.JSON"
cd $fb_path
echo '''
const fs = require("fs")
const path = require("path")

const json = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8"))

json.dependencies.spoken = "file:./spoken"
json.scripts.build = undefined
json.scripts.prestart = "rm -rf node_modules/spoken && cp -r spoken node_modules"

fs.writeFileSync(path.resolve(__dirname, "package.json"), JSON.stringify(json, null, 4))

''' >> cooltemp.js

node cooltemp.js

rm cooltemp.js

# CONFIG ENVIRONMENT
echo "CONFIG ENVIRONMENT"
rm -rf .env.local

if test -f .env.prod; then
    rm -rf .env
    mv .env.prod .env
fi