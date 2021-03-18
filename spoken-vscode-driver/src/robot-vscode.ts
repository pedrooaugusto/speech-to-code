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

    keyUp(keyNumber: string | number): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }
    keyDown(keyNumber: string | number): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }
    press(keyNumber: string | number): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }
    hotKey(...keys: string[]): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }
    screenSize(): Promise<[number, number]> {
        throw new Error('Method not implemented.')
    }
    mousePosition(): Promise<[number, number]> {
        throw new Error('Method not implemented.')
    }
    moveTo(x: number | null, y: number | null): Promise<void> {
        throw new Error('Method not implemented.')
    }
    move(x: number | null, y: number | null): Promise<void> {
        throw new Error('Method not implemented.')
    }
    dragTo(x: number | null, y: number | null): Promise<void> {
        throw new Error('Method not implemented.')
    }
    drag(x: number | null, y: number | null): Promise<void> {
        throw new Error('Method not implemented.')
    }
    click(x: number | null | undefined, y: number | null | undefined, button: string | undefined): Promise<void> {
        throw new Error('Method not implemented.')
    }
    dbClick(x: number | null | undefined, y: number | null | undefined, button: string | undefined): Promise<void> {
        throw new Error('Method not implemented.')
    }
    mouseUp(x: number | null | undefined, y: number | null | undefined, button: string | undefined): Promise<void> {
        throw new Error('Method not implemented.')
    }
    mouseDown(x: number | null | undefined, y: number | null | undefined, button: string | undefined): Promise<void> {
        throw new Error('Method not implemented.')
    }

}

export interface Robot {
    // Keyboard interface
    write(text: string): Promise<void | Error>
    keyUp(keyNumber: number | string): Promise<void | Error>
    keyDown(keyNumber: number | string): Promise<void | Error>
    press(keyNumber: number | string): Promise<void | Error>
    hotKey(...keys: string[]): Promise<void | Error>

    // Mouse Interface
    screenSize(): Promise<[number, number]>
    mousePosition(): Promise<[number, number]>

    moveTo(x: number | null, y: number | null): Promise<void>
    move(x: number | null, y: number | null): Promise<void>
    dragTo(x: number | null, y: number | null): Promise<void>
    drag(x: number | null, y: number | null): Promise<void>

    click(x: number | undefined | null, y: number | null | undefined, button: string | undefined): Promise<void>
    dbClick(x: number | undefined | null, y: number | null | undefined, button: string | undefined): Promise<void>

    mouseUp(x: number | undefined | null, y: number | null | undefined, button: string | undefined): Promise<void>
    mouseDown(x: number | undefined | null, y: number | null | undefined, button: string | undefined): Promise<void>
}

export default new RobotVscode()