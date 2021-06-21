import * as ipc from 'node-ipc'
import * as fs from 'fs'
import { Socket } from 'net'
import { Proxy, TaskRequest, Robot } from './index'
import RobotVscode from './robot-vscode'
import Log from './logger'

const DEBUG_LIVE_RELOAD: any = false

class RobotVSCodeProxy implements Proxy {
    async proxy(request: TaskRequest, socket: Socket ): Promise<void> {
        try {
            Log('[vscode-driver.robot-vscode.proxy]: Received request to process:\n\t' + JSON.stringify(request))

            let response = null

            if (DEBUG_LIVE_RELOAD) {
                response = this.liveRelodingTestingOnly(request)
            } else {
                // @ts-ignore
                // TODO: Use reflection instead!
                response = await RobotVscode[request.type](...request.extra.args)
            }

            Log('[vscode-driver.robot-vscode.proxy]: Emiting response for ' + request.id)

            ipc.server.emit(socket, 'runCommand/response', {
                id: request.id,
                err: false,
                response
            })

        } catch(err) {
            Log('[vscode-driver.robot-vscode.proxy]: Error executing ' + request.type +'\n' + err)
            ipc.server.emit(socket, 'runCommand/response', {
                id: request.id,
                err: err || true,
                response: null
            })
        }
    }

    private async liveRelodingTestingOnly(request: TaskRequest) {
        // @ts-ignore
        if (this.vscodeRobotInstance == null) {
            const str = fs.readFileSync(__dirname + '/robot-vscode.js', 'utf-8')
            const createInstance = eval(str)

            // @ts-ignore
            this.vscodeRobotInstance = createInstance()
        }

        // @ts-ignore
        return await this.vscodeRobotInstance[request.type](...request.extra.args)
    }
}

export default new RobotVSCodeProxy()
