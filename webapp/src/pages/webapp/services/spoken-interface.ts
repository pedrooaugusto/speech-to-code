import Spoken, { SpokenCommand } from 'spoken'
import EditorService from './editor'
import { IPCEvent } from './ipc-service-emulator'

// @ts-ignore
window.editor = EditorService

class SpokenInterface {

    onComand = async (event: IPCEvent, command: SpokenCommand, ...args: unknown[]) => {
        if (command == null) {
            return event.reply('Spoken:executeCommandResult', command, { err: 404 })
        }

        const [result, err] = await this.execute(command)

        if (err) {
            return event.reply('Spoken:executeCommandResult', { error: err.toString() || true })
        }
 
        console.info('[Spoken]: Result: ' + JSON.stringify(result || null))

        return event.reply('Spoken:executeCommandResult', { result })
    }

    private async execute(command: SpokenCommand, parent?: string): Promise<[object | null, Error | null]> {
        try {
            // eslint-disable-next-line no-eval
            const fn = eval(`var exports = {};\n` + command.impl)
            const [args, err] = await this.parseArgs(command.args, command.id)
            
            if (args == null || err != null) return [null, err]

            const result = await fn({ ...args, parent }, EditorService, Spoken.context)

            return [result, null]
        } catch (err) {
            console.error('[wrapper.SpokenInterface.onCommand] Failed to execute command "' + command.id + '" with:\n', err)
            return [null, err]
        }
    }

    private async parseArgs(args: any, parent: string): Promise<[object | null, Error | null]> {
        for (const key of Object.keys(args)) {
            const innerCommand = args[key] as any

            if (Array.isArray(innerCommand)) {
                const arr = []
                for (const item of innerCommand) {
                    if (!item.id || !item.impl || !item.lang) {
                        arr.push(item)
                        continue
                    }

                    const [ab, err] = await this.execute(item, parent)
            
                    if (ab == null || err != null) return [null, err]

                    arr.push(ab)
                }
                args[key] = arr
            } else {                
                if (!innerCommand.id || !innerCommand.impl || !innerCommand.lang) continue

                const [result, err] = await this.execute(innerCommand, parent)

                if (err != null) return [null, err]

                args[key] = result
            }
        }

        return [args, null]
    }
}

export default new SpokenInterface()

