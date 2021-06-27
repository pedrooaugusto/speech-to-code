#!/bin/bash

# FAST RELOAD - ONLY WORKS IF ENABLED IN EXTENSION

if [ -z $1 ]; then
    echo "Nothing to do"

    exit 0
fi

if [ $1 = "reload" ]; then
    echo "Updating robot-vscode.js"

    VSCODE_EXT_HOME=/c/Users/yuram/.vscode/extensions

    MY_EXT_PATH=$(find $VSCODE_EXT_HOME -name "pedroaugusto.speech2code*")

    cp ./out/robot-vscode.js "${MY_EXT_PATH}/out/robot-vscode.js"
fi

# INSTALL EXTENSION

if [ $1 = "install" ]; then
    echo "Installing speech2code in vscode"

    MY_EXT_PATH=$(find . -name "speech2code*.vsix")

    code --install-extension $MY_EXT_PATH --force
fi