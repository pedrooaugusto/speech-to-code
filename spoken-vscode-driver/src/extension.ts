import * as vscode from 'vscode'
import Log from './logger'
import IpcProxy from './ipc-proxy'
import RobotVscode from './robot-vscode'

export function activate(context: vscode.ExtensionContext) {

	Log('Congratulations, your extension "spoken-vscode-driver" is now active!')

	let disposable = vscode.commands.registerCommand('spoken-vscode-driver.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from spoken-vscode-driver!42')
		const editor = vscode.window.activeTextEditor

		editor?.edit((editBuilder) => {
			editBuilder.insert(editor.selection.active, 'hello42')
		})
	})

	context.subscriptions.push(disposable)

	IpcProxy.on('runCommand', RobotVscode)
	IpcProxy.init()
}

export function deactivate() {}
