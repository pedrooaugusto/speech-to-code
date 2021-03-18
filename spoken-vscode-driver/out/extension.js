"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const logger_1 = require("./logger");
const ipc_proxy_1 = require("./ipc-proxy");
const robot_vscode_1 = require("./robot-vscode");
function activate(context) {
    logger_1.default('Congratulations, your extension "spoken-vscode-driver" is now active!');
    let disposable = vscode.commands.registerCommand('spoken-vscode-driver.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from spoken-vscode-driver!42');
        const editor = vscode.window.activeTextEditor;
        editor === null || editor === void 0 ? void 0 : editor.edit((editBuilder) => {
            editBuilder.insert(editor.selection.active, 'hello42');
        });
    });
    context.subscriptions.push(disposable);
    ipc_proxy_1.default.on('runCommand', robot_vscode_1.default);
    ipc_proxy_1.default.init();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map