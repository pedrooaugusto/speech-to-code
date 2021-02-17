// Since nodejs is not capable of interacting directly with the mouse and/or keyboard
// we have to use a external program to do so.
// This is the interface that the external program should implement.
// Rip-off of pyautogui

export interface Robot {
    // Keyboard interface
    write(text: string): Promise<void | Error>
    keyUp(keyNumber: number | string): Promise<void | Error>
    keyDown(keyNumber: number | string): Promise<void | Error>
    press(keyNumber: number | string): Promise<void | Error>
    hotKey(...keys: string[]): Promise<void | Error>

    // Mouse Interface
    screenSize(): [number, number]
    mousePosition(): [number, number]

    moveTo(x: number | null, y: number | null): void
    move(x: number | null, y: number | null): void
    dragTo(x: number | null, y: number | null): void
    drag(x: number | null, y: number | null): void

    click(x: number | undefined | null, y: number | null | undefined, button: string | undefined): void
    dbClick(x: number | undefined | null, y: number | null | undefined, button: string | undefined): void

    mouseUp(x: number | undefined | null, y: number | null | undefined, button: string | undefined): void
    mouseDown(x: number | undefined | null, y: number | null | undefined, button: string | undefined): void
}


// A python implementation of the Robot interface (maybe use Golang instead)
// This is just a node wrapper for the pyautogui lib from python
export class RobotPython implements Robot {
    spawn: any = null
    #pythonScriptPath = require('path').resolve(__dirname, 'robot-impl.py')

    constructor() {
        this.spawn = require("child_process").spawn
    }

    private run(method: string, ...args: any[]): Promise<string | Error | undefined> {
        return new Promise((res, rej) => {
            const pr = this.spawn('python', [this.#pythonScriptPath, method, ...args])
            // console.log('[RobotPython.run] Running process: ' + pr.toString())

            let out: string, err: string

            pr.stdout.on('data', (data: string) => out = data)

            pr.stderr.on('data', (data: string) => err = data)

            pr.on('close', (code: number | string) => {
                if (code == 0) res(out || undefined)
                else rej(new Error(err))
            })
        })
    }

    async write(text: string) {
        try {
            await this.run('write', text)
        } catch (err) {
            console.error('[RobotPython.write]:\n\t' + err)
            throw err
        }
    }

    async keyUp(keyNumber: string | number) {
        throw new Error("Method not implemented.")
    }

    async keyDown(keyNumber: string | number) {
        throw new Error("Method not implemented.")
    }

    async press(keyNumber: string | number) {
        try {
            await this.run('press', keyNumber)
        } catch (err) {
            console.error('[RobotPython.press]:\n\t' + err)
            throw err
        }
    }

    async hotKey(...keys: string[]) {
        try {
            await this.run('hotKey', ...keys)
        } catch (err) {
            console.error('[RobotPython.hotKey]:\n\t' + err)
            throw err
        }
    }

    screenSize(): [number, number] {
        throw new Error("Method not implemented.")
    }

    mousePosition(): [number, number] {
        throw new Error("Method not implemented.")
    }

    moveTo(x: number | null, y: number | null): void {
        throw new Error("Method not implemented.")
    }

    move(x: number | null, y: number | null): void {
        throw new Error("Method not implemented.")
    }

    dragTo(x: number | null, y: number | null): void {
        throw new Error("Method not implemented.")
    }

    drag(x: number | null, y: number | null): void {
        throw new Error("Method not implemented.")
    }

    click(x: number | null | undefined, y: number | null | undefined, button: string | undefined): void {
        throw new Error("Method not implemented.")
    }

    dbClick(x: number | null | undefined, y: number | null | undefined, button: string | undefined): void {
        throw new Error("Method not implemented.")
    }

    mouseUp(x: number | null | undefined, y: number | null | undefined, button: string | undefined): void {
        throw new Error("Method not implemented.")
    }

    mouseDown(x: number | null | undefined, y: number | null | undefined, button: string | undefined): void {
        throw new Error("Method not implemented.")
    }
}

export default {
    defaultRobot: new RobotPython()
}

// function main() {
//     const robot = new RobotPython()

//     robot.write("Ola, eu sou o pedro")
// }

// main()
