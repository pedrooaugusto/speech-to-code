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
exports.createInstance = void 0;
const vscode = require("vscode");
const logger_1 = require("./logger");
class RobotVscode {
    /**
     * Writes something in the current text input
     * @param text The text to be written
     */
    write(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                logger_1.default('[vscode-driver.robot-vscode.write]: Executing write(' + text + ')');
                const editor = vscode.window.activeTextEditor;
                if (editor == null)
                    return rej(new Error('No active text editor'));
                editor.edit((editBuilder) => {
                    editBuilder.insert(editor.selection.active, text);
                }).then(ok => {
                    if (!ok)
                        return rej(new Error('Something went wrong!'));
                    res();
                });
            });
        });
    }
    removeSelection() {
        throw new Error('Method not implemented.');
    }
    /**
     * Creates a new line above the current line.
     *
     * @returns undefined if evrything went well, error otherwise
     */
    newLine() {
        return new Promise((res, rej) => {
            logger_1.default('[vscode-driver.robot-vscode.newLine]: Executing newLine');
            const editor = vscode.window.activeTextEditor;
            if (editor == null)
                return rej(new Error('No active text editor'));
            editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, '\n');
            }).then(ok => {
                if (!ok)
                    return rej(new Error('Something went wrong!'));
                res();
            });
        });
    }
    removeLine() {
        throw new Error('Method not implemented.');
    }
    selectLines(from, to) {
        throw new Error('Method not implemented.');
    }
    /**
     * Moves the cursor to a different line
     * @param number Line number
     */
    goToLine(number) {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const editor = vscode.window.activeTextEditor;
                const destLine = parseInt(number);
                if (editor == null)
                    return rej(new Error('No active text editor'));
                const line = editor.selection.active.line + 1;
                const to = destLine > line ? 'down' : 'up';
                const value = to === 'down' ? destLine - line : line - destLine;
                vscode.commands.executeCommand('cursorMove', { to, value, by: 'line' }).then(() => {
                    vscode.commands.executeCommand('revealLine', { lineNumber: destLine, at: 'center' }).then(() => {
                        vscode.commands.executeCommand('cursorMove', { to: 'wrappedLineFirstNonWhitespaceCharacter' }).then(() => {
                            res(editor.document.lineAt(destLine - 1).text);
                        });
                    });
                });
                // const { range, text } = editor.document.lineAt(parseInt(number) - 1)
                // editor.selection = new vscode.Selection(range.start, range.end)
                // editor.revealRange(range)
            }
            catch (err) {
                rej(err);
            }
        }));
    }
    hotKey(...keys) {
        throw new Error('Method not implemented.');
    }
    /**
     * Retrieves the content of the provided line
     *
     * @param number | undefined line number
     */
    getLine(number) {
        return new Promise((res, rej) => {
            try {
                const editor = vscode.window.activeTextEditor;
                if (editor == null)
                    return rej(new Error('No active text editor'));
                number = number != null ? number : editor.selection.active.line + 1;
                res({
                    lineNumber: number,
                    text: editor.document.lineAt(number).text
                });
            }
            catch (err) {
                rej(err);
            }
        });
    }
    /**
     * Indents the provided selection or the active one.
     *
     * @param p1 Start string[] (line, cursor)
     * @param p2 Finish string[] (line, cursor)
     */
    indentSelection(p1, p2) {
        return new Promise((res, rej) => {
            var _a, _b;
            try {
                const editor = vscode.window.activeTextEditor;
                if (editor == null)
                    return rej(new Error('No active text editor'));
                p1[0] = (_a = p1[0]) !== null && _a !== void 0 ? _a : editor.selection.active.line;
                p2[0] = (_b = p2[0]) !== null && _b !== void 0 ? _b : editor.selection.active.line;
                const sp1 = p1.map(a => parseInt(a, 10));
                const sp2 = p2.map(a => parseInt(a, 10));
                editor.selection = new vscode.Selection(sp1[0], sp1[1], sp2[0], sp2[1]);
                vscode.commands.executeCommand('editor.action.reindentselectedlines', {}).then(a => {
                    editor.selection = new vscode.Selection(editor.selection.end, editor.selection.end);
                    res();
                });
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
function createInstance() {
    return new RobotVscode();
}
exports.createInstance = createInstance;
//# sourceMappingURL=robot-vscode.js.map