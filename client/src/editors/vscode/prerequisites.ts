import { dialog } from 'electron'
import crossSpawn from  'cross-spawn'
import path from 'path'
import fs from 'fs'
import { isDev, appVersion } from '../../utils'

const APP_NAME = 'speech2code'
const VSCODE_EXT_ID = 'pedroaugusto.speech2code@' + appVersion

export function check() {
    // Does this machine has Visual Studio Code installed ?
    checkVSCodeIsInstalled()

    // Nothing to do! Extension already installed!
    if (checkIfVSCodeExtensionIsAlreadyInstalled()) return null

    // First we loocate the extension.
    const extensionPath = checkIfVSCodeExtensionIsInPath()

    // Then we install it.
    installVSCodeExtension(extensionPath)

    // @ts-ignore
    dialog.showMessageBoxSync(null, {
        type: 'info',
        title: 'Required Visual Studio Code extension not found!',
        message: 'Spoken, a required Visual Studio Code extension was not found!\n\n Installing it now!\n\n'
    })

    return null
}

function checkVSCodeIsInstalled() {
    const response = crossSpawn.sync('code', ['--version'])

    if (response.error || response.stderr.toString() !== '') {
        const err = response.stderr.toString()

        throw new Error(
            'VSCode does not seem to be installed. ' +
            'We tried to run "code --version" and it failed with:\n\n' + err + '\n' +
            'Possible fixes include installing Visual Studio Code and making sure that when ' +
            'you open the terminal/cmd and type "code --version" everything goes well.'
        )
    }
}

function checkIfVSCodeExtensionIsAlreadyInstalled() {
    const response = crossSpawn.sync('code', ['--list-extensions', '--show-versions'])

    if (response.error || response.stderr.toString() !== '') {
        const err = response.stderr.toString()

        throw new Error(
            'VSCode does not seem to be working well. ' +
            'We tried to run "code --list-extensions" and it failed with:\n\n' + err + '\n' +
            'Possible fixes include installing Visual Studio Code and making sure that when ' +
            'you open the terminal/cmd and type "code --list-extensions" it lists all installed extensions.'
        )
    }

    const extensions = response.stdout.toString().split('\n')

    return !!extensions.find(a => a === VSCODE_EXT_ID)
}

function checkIfVSCodeExtensionIsInPath() {
    const extensionPath = getExtensionPath()

    if (extensionPath == null) {
        throw new Error(
            'Spoken, a required Visual Studio Code extension was not found and we failed to install it.\n\n' +
            'Extension file not found! Something is wrong with this build...'
        )
    }

    return extensionPath
}

function installVSCodeExtension(extensionPath: string) {
    const response = crossSpawn.sync('code', ['--install-extension', extensionPath])

    // bruh!
    if (response.error || !response.stderr.toString().includes('warning')) {
        const command = 'code --install-extension ' + extensionPath
        const err = response.stderr.toString()

        throw new Error(
            'Failed to install Spoken, a required VSCode extension for the use of Speech2Code.\n\n' +
            'Tried to run "'+ command + '" and it failed with:\n\n' + err + '\n' +
            'Possible fix include to manually install this extension.'
        )
    }
}

const ExtensionFileNotFound = new Error(
    'Spoken, a required Visual Studio Code extension was not found and we failed to install it.\n\n' +
    'Extension file not found! Something is wrong with this build...'
)

function getExtensionPath() {
    const root = isDev() ? global.appRoot : process.resourcesPath
    const files = fs.readdirSync(path.resolve(root))

    if (!Array.isArray(files) || files?.length === 0) throw ExtensionFileNotFound

    const extensionPath = files.find(item => item.includes(APP_NAME) && item.endsWith('.vsix'))

    if (extensionPath == null || extensionPath == '') throw ExtensionFileNotFound

    return path.resolve(root, extensionPath)
}
