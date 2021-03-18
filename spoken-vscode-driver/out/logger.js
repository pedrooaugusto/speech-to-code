"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const out = vscode_1.window.createOutputChannel('log');
// 		"onCommand:spoken-vscode-driver.helloWorld"
function log(obj) {
    out.appendLine('[' + new Date().toISOString() + ']' + obj);
}
exports.default = log;
//# sourceMappingURL=logger.js.map