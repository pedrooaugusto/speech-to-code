import * as ipc from 'node-ipc'
import Log from './logger'
import { Proxy } from './index'

ipc.config.id = 'speechtocodechannel'
ipc.config.retry = 1500
ipc.config.silent = true

class IpcProxy {
    private map: Map<string, Proxy> = new Map()

    on(mainChannel: string, proxyTo: Proxy) {
        this.map.set(mainChannel, proxyTo)
    }

    init() {
        ipc.serve(() => {
            Log('[vscode-driver.ipc-proxy.init]: Server is listening on hostname "speechtocodechannel"')
            for (const [key, value] of this.map.entries()) {                
                ipc.server.on(key, value.proxy.bind(value))
            }
        })

        ipc.server.start()
    }

    close() {
        ipc.server.stop()
    }
}

export default new IpcProxy()