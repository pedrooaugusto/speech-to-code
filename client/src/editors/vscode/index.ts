import crossSpawn from  'cross-spawn'
import * as ipc from 'node-ipc'
import path from 'path'
import fs from 'fs'
import * as Prerequisites from './prerequisites'
import { Editor } from '../default'

const APP_NAME = 'speech2code'
const VSCODE_EXT_ID = 'august.speech2code'

ipc.config.id = 'speechtocodechannel-client'
ipc.config.retry = 1500
ipc.config.silent = true
ipc.config.maxRetries = 2

class VSCodeEditor extends Editor {
    map = new Map<number, [Function, Function]>()
    callback: null | ((editor: Editor) => void) = null

    constructor() {
        super('VSCode')
    }

    onStatusChange(cb: (editor: Editor) => void) { this.callback = cb }
    turnOff() { ipc.disconnect('speechtocodechannel') }
    turnOn() { this.init() }

    /**
	 * This should check if VSCode is installed, check if
     * the extension Spoken is installed and if not
     * install it.
	 */
    async checkPrerequisites(): Promise<void> {
        Prerequisites.check()
    }

    private init() {
        ipc.connectTo('speechtocodechannel', () => {
            let wasConnectedAtLeastOnce = false

            ipc.of.speechtocodechannel.on('error', (err: unknown) => {
                console.log('[client.VSCodeRobot.error]: Error: ' + err)
            })

            ipc.of.speechtocodechannel.on('destroy', () => {
                console.log('[client.VSCodeRobot.destroy]: Socket destroyed!')

                this.status = 'OFF'
                if (!wasConnectedAtLeastOnce) console.log('Unable to open connection!')
                this.callback?.(this)
            })

            ipc.of.speechtocodechannel.on('socket.disconnected', () => {
                console.log('[client.VSCodeRobot.socket.disconnected]: Socket disconnected!')

                this.status = 'OFF'
                this.callback?.(this)
            })

            ipc.of.speechtocodechannel.on('connect', () => {
                console.log('[client.VSCodeRobot.connect]: Connected!')

                this.status = 'ON'
                wasConnectedAtLeastOnce = true
                this.callback?.(this)
            })

            ipc.of.speechtocodechannel.on('runCommand/response', this.onResponse)
        })
    }

    private onResponse = (data: { id: number, err: unknown, response: unknown }) => {
        console.log('[client.VSCodeRobot.runCommand/response]: Received response of ' + JSON.stringify(data))

        if (this.map.has(data.id)) {
            const [res, rej] = this.map.get(data.id) as Function[]
            this.map.delete(data.id)

            if (data.err) return rej(data.err)
            return res(data.response)
        } else {
            console.error(new Error('[client.VSCodeRobot.runCommand/response]: This response is not in the queue!'))
        }
    }

    write(text: string): Promise<void | Error> {
        console.log('[client.VSCodeRobot.write]: Sending request to execute write(' + text + ')')

        return this.runTask({
            type: 'write',
            context: {},
            extra: { args: [text] }
        })
    }

    removeSelection(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    newLine(pos: 0 | 1): Promise<void | Error> {
        console.log('[client.VSCodeRobot.newLine]: Sending request to execute newLine()')

        return this.runTask({
            type: 'newLine',
            context: {},
            extra: { args: [pos] }
        })
    }

    removeLine(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    selectLines(from: number | undefined, to: number | undefined): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    goToLine(number: string, cursorPosition: 'END' | 'BEGIN' = 'BEGIN'): Promise<string | Error> {
        console.log('[client.VSCodeRobot.goToLine]: Sending request to execute gotToLine(' + number + ')')

        return this.runTask({
            type: 'goToLine',
            context: {},
            extra: { args: [number, cursorPosition] }
        })
    }

    moveCursorTo(
        to: 'END_LINE' | 'BEGIN_LINE' | 'SYMBOL' | null,
        symbol: string | undefined,
        leapSize: number | undefined,
        goto: boolean = true
    ): Promise<number | Error> {
        console.log('[client.VSCodeRobot.moveCursorTo]: Sending request to execute moveCursorTo(...)')

        return this.runTask({
            type: 'moveCursorTo',
            context: {},
            extra: { args: [to, symbol, leapSize, goto] }
        })
    }

    select(from: number, to: number, line: boolean): Promise<string | Error> {
        console.log('[client.VSCodeRobot.select]: Sending request to execute select(...)')

        return this.runTask({
            type: 'select',
            context: {},
            extra: { args: [from, to, line] }
        })
    }

    findPositionOf(term: RegExp | string, line?: number, pad?: number): Promise<number[][] | Error> {
        console.log('[client.VSCodeRobot.findPositionOf]: Sending request to execute findPositionOf(...)')

        return this.runTask({
            type: 'findPositionOf',
            context: {},
            extra: { args: [term, line, pad] }
        })
    }

    writeOnTerminal(text: string) {
        console.log('[client.VSCodeRobot.writeOnTerminal]: Sending request to execute writeOnTerminal(...)')

        return this.runTask({
            type: 'writeOnTerminal',
            context: {},
            extra: { args: [text] }
        })
    }
    
    fileInfo(text?: string) {
        console.log('[client.VSCodeRobot.fileInfo]: Sending request to execute fileInfo(...)')

        return this.runTask({
            type: 'fileInfo',
            context: {},
            extra: { args: [text] }
        })
    }

    getLine(number?: number) {
        console.log('[client.VSCodeRobot.getLine]: Sending request to execute getLine(...)')

        return this.runTask({
            type: 'getLine',
            context: {},
            extra: { args: [number] }
        })
    }

    remove(selection: number | [[number, number], [number, number]]) {
        console.log('[client.VSCodeRobot.getLine]: Sending request to execute remove(...)')

        return this.runTask({
            type: 'remove',
            context: {},
            extra: { args: [selection] }
        })
    }

    undo() {
        console.log('[client.VSCodeRobot.Undo]: Sending request to execute undo(...)')

        return this.runTask({
            type: 'undo',
            context: {},
            extra: { args: [] }
        })
    }

    redo() {
        console.log('[client.VSCodeRobot.Redo]: Sending request to execute Redo(...)')

        return this.runTask({
            type: 'redo',
            context: {},
            extra: { args: [] }
        })
    }

    indentSelection(p1: [string, string], p2: [string, string]): Promise<void | Error> {
        console.log('[client.VSCodeRobot.indentSelection]: Sending request to execute indentSelection(...)')
        const task = {
            type: 'indentSelection',
            context: {},
            extra: { args: [p1, p2] }
        }

        return this.runTask(task)
    }

    hotKey(...keys: string[]): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }

    private runTask<T>(task: Record<string, unknown>): Promise<T> {
        return new Promise((res, rej) => {
            const id = +new Date()

            task.id = id

            ipc.of.speechtocodechannel.emit('runCommand', task)

            this.map.set(id, [res, rej])
        })
    }
    
}

function getExtensionPath() {
    const root = isDev() ? global.appRoot : process.resourcesPath
    const files = fs.readdirSync(path.resolve(root))

    if (!Array.isArray(files) || files?.length === 0) return null

    const extensionPath = files.find(item => item.includes(APP_NAME) && item.endsWith('.vsix'))

    if (extensionPath == null || extensionPath == '') return null

    return path.resolve(root, extensionPath)
}

function isDev() {
    return process?.mainModule?.filename?.indexOf?.('app.asar') === -1;
}

export default new VSCodeEditor()
