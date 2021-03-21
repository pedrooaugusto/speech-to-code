import * as ipc from 'node-ipc'
import * as fs from 'fs'
import { Socket } from 'net'
import { Proxy, TaskRequest, Robot } from './index'
import Log from './logger'

class RobotVSCodeProxy implements Proxy {
    vscodeRobotInstance: Robot | null = null

    async proxy(request: TaskRequest, socket: Socket ): Promise<void> {
        try {
            Log('[vscode-driver.robot-vscode.proxy]: Received request to process:\n\t' + JSON.stringify(request))

            let response = null
            let robot = this.vscodeRobotInstance

            if (robot == null) {
                // const { createInstance } = await import('./robot-vscode')
                const str = fs.readFileSync(__dirname + '/robot-vscode.js', 'utf-8')
                const createInstance = eval(str)
                robot = createInstance()
            }

            // @ts-ignore
            response = await robot[request.type](...request.extra.args)

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
}
// hello
export default new RobotVSCodeProxy()
