import * as vscode from 'vscode'
import Log from './logger'
import IpcProxy from './ipc-proxy'
import RobotVSCodeProxy from './robot-proxy'

export function activate(context: vscode.ExtensionContext) {
	
	Log('Spoken VSCode driver is ready!')
	
	let disposable = vscode.commands.registerCommand('spoken.helloWorld', async () => {
		vscode.window.showInformationMessage('Hello World from VSCode Spoken!')

		// editor.selection = new vscode.Selection(14, 0, 14, 52)
		// vscode.commands.executeCommand('editor.action.reindentselectedlines', {})

		// vscode.commands.executeCommand('editor.action.insertLineBefore', {})
		/*const destLine = 55
		
		const line = (editor?.selection?.active?.line || 0) + 1
		const to = destLine > line ? 'down' : 'up'
		const value = to === 'down' ? destLine - line : line - destLine
		
		vscode.commands.executeCommand('cursorMove', { to, value, by: 'line' }).then(() => {
			vscode.commands.executeCommand('revealLine', { lineNumber: destLine, at: 'center' }).then(() => {
				vscode.commands.executeCommand('cursorMove', { to: 'wrappedLineFirstNonWhitespaceCharacter' })
			})
		})*/
		
		// vscode.commands.executeCommand('cursorMove', { to, value, by: 'line' })
		
		/*vscode.commands.executeCommand('cursorMove', {
			to: 'viewPortTop',
			by: 'line',
			value: 3
		})*/
		// vscode.commands.executeCommand('revealLine', { lineNumber: 2 })
		// let a = await vscode.commands.getCommands()
		// Log(a)
		// const editor = vscode.window.activeTextEditor
		
		// editor?.edit((editBuilder) => {
		// 	editBuilder.insert(editor.selection.active, 'hello42')
		// })\
	})
	
	context.subscriptions.push(disposable)

	IpcProxy.on('runCommand', RobotVSCodeProxy)
	IpcProxy.init()
}

export function deactivate() {
	IpcProxy.close()
}
