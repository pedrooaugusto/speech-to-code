# VSCode Spoken Driver

Spoken is a VSCode extension that together with [Speech2Code](https://github.com/pedrooaugusto/speech-to-code) allows you to code using just your voice.

## Features

Enables you to code using just your voice, this the bridge between the main Speech2Code app and VSCode.

You do need the main Speech2Code App to use this extension properly!

<img src="https://raw.githubusercontent.com/pedrooaugusto/speech-to-code/main/spoken-vscode-driver/image.png" alt="Working Application" width="600"/>

This extension is constantly listening for commands to be executed inside VSCode. This communication happens through InterProcessCommunication and the one sending requests (client) is the main Speech2Code app.


It is possible to send requests for this extension to:

1. read contents of a line
2. change line
3. save file
4. write line

And many many more...

## Requirements

VSCode version 1.55.2 or newer

## Development

When developing for this extension:

### Useful Scripts

1. `npm run build` To build and pack this vscode extension (check for a `*.vsix` file at root)
2. `npm run vscode-install` To install the `*.vsix` file (the vscode extension) on your local vscode.
In the vscode extension list look for one called `Spoken`.

**Enjoy!**