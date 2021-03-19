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
const ipc = require("node-ipc");
const vscode = require("vscode");
const logger_1 = require("./logger");
class RobotVscode {
    proxy(request, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default('[vscode-driver.robot-vscode.proxy]: Received request to process:\n\t' + JSON.stringify(request));
                // @ts-ignore
                const response = yield this[request.type](...request.extra.args);
                logger_1.default('[vscode-driver.robot-vscode.proxy]: Emiting response for ' + request.id);
                ipc.server.emit(socket, 'runCommand/response', {
                    id: request.id,
                    err: false,
                    response
                });
            }
            catch (err) {
                logger_1.default('[vscode-driver.robot-vscode.proxy]: Error executing ' + request.type + '\n' + err);
                ipc.server.emit(socket, 'runCommand/response', {
                    id: request.id,
                    err: err || true,
                    response: null
                });
            }
        });
    }
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
    newLine() {
        throw new Error('Method not implemented.');
    }
    removeLine() {
        throw new Error('Method not implemented.');
    }
    selectLines(from, to) {
        throw new Error('Method not implemented.');
    }
    goToLine(number) {
        throw new Error('Method not implemented.');
    }
    hotKey(...keys) {
        throw new Error('Method not implemented.');
    }
}
exports.default = new RobotVscode();
//# sourceMappingURL=robot-vscode.js.map