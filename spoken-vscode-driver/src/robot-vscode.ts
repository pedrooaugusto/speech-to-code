import * as ipc from 'node-ipc'
import * as vscode from 'vscode'
import { Socket } from 'net'
import Log from './logger'
import { Proxy, TaskRequest } from './index'

class RobotVscode implements Proxy, Robot {
    async proxy(request: TaskRequest, socket: Socket ): Promise<void> {
        try {
            Log('[vscode-driver.robot-vscode.proxy]: Received request to process:\n\t' + JSON.stringify(request))

            // @ts-ignore
            const response = await this[request.type](...request.extra.args)

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

    async write(text: string): Promise<void | Error> {
        return new Promise((res, rej) => {
            Log('[vscode-driver.robot-vscode.write]: Executing write(' + text + ')')

            const editor = vscode.window.activeTextEditor

            if (editor == null) return rej(new Error('No active text editor'))

            editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, text)
            }).then(ok => {
                if (!ok) return rej(new Error('Something went wrong!'))
                res()
            })
        })
    }

    removeSelection(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    newLine(): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }
    removeLine(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    selectLines(from: number | undefined, to: number | undefined): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    goToLine(number: string): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }
    hotKey(...keys: string[]): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }

}

export interface Robot {
    write(text: string): Promise<void | Error>
	removeSelection(): Promise<string | Error>
	newLine(): Promise<void | Error>
	removeLine(): Promise<string | Error>
	selectLines(from: number | undefined, to: number | undefined): Promise<string | Error>
	goToLine(number: string): Promise<string | Error>
    hotKey(...keys: string[]): Promise<void | Error>
}

export default new RobotVscode()