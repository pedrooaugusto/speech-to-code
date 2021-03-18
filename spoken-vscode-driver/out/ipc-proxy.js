"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipc = require("node-ipc");
const logger_1 = require("./logger");
ipc.config.id = 'speechtocodechannel';
ipc.config.retry = 1500;
ipc.config.silent = true;
class IpcProxy {
    constructor() {
        this.map = new Map();
    }
    on(mainChannel, proxyTo) {
        this.map.set(mainChannel, proxyTo);
    }
    init() {
        ipc.serve(() => {
            logger_1.default('[vscode-driver.ipc-proxy.init]: Server is listening on hostname "speechtocodechannel"');
            for (const [key, value] of this.map.entries()) {
                ipc.server.on(key, value.proxy.bind(value));
            }
        });
        ipc.server.start();
    }
}
exports.default = new IpcProxy();
//# sourceMappingURL=ipc-proxy.js.map