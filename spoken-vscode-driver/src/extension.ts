import * as vscode from './vscode'
import Log from './logger'
import IpcProxy from './ipc-proxy'
import RobotVSCodeProxy from './robot-proxy'

export function activate(context: vscode.ExtensionContext) {

	Log('Spoken VSCode driver is ready!')

	let disposable = vscode.commands.registerCommand('spoken.helloWorld', async () => {
		vscode.window.showInformationMessage('Hello World from VSCode!')
	})
	
	context.subscriptions.push(disposable)

	IpcProxy.on('runCommand', RobotVSCodeProxy)
	IpcProxy.init()
}

export function deactivate() {
	IpcProxy.close()
}
