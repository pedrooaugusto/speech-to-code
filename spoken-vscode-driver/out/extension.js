"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const logger_1 = require("./logger");
// import IpcProxy from './ipc-proxy'
// import RobotVSCodeProxy from './robot-proxy'
function activate(context) {
    logger_1.default('Congratulations, your extension "spoken-vscode-driver" is now active!');
    let disposable = vscode.commands.registerCommand('spoken-vscode-driver.helloWorld', () => __awaiter(this, void 0, void 0, function* () {
        vscode.window.showInformationMessage('Hello World from spoken-vscode-driver!42');
        const editor = vscode.window.activeTextEditor;
        if (editor == null)
            throw new Error('none');
        vscode.commands.executeCommand('cursorMove', { to: 'wrappedLineFirstNonWhitespaceCharacter' }).then(() => {
        });
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
    }));
    context.subscriptions.push(disposable);
    // IpcProxy.on('runCommand', RobotVSCodeProxy)
    // IpcProxy.init()
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map