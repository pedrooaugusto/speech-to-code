import { IpcMainEvent } from 'electron'
import Spoken, { SpokenCommand } from 'spoken'
import EditorService from './editors/editor-service'

class SpokenInterface {

    onComand = async (event: IpcMainEvent, command: SpokenCommand, ...args: unknown[]) => {
        if (command == null) {
            return event.reply('Spoken:executeCommandResult', command, { err: 404 })
        }

        const [result, err] = await this.execute(command)

        if (err) {
            console.error('[wrapper.SpokenInterface.onCommand]\n\t' + err)

            return event.reply('Spoken:executeCommandResult', { error: err.toString() || true })
        }

        console.log('[wrapper.SpokenInterface.onCommand]: Result: ' + JSON.stringify(result || null))

        return event.reply('Spoken:executeCommandResult', { result })
    }

    private async execute(command: SpokenCommand, parent?: string): Promise<[object | null, Error | null]> {
        try {
            const fn = eval(`var exports = {};\n` + command.impl)
            const [args, err] = await this.parseArgs(command.args, command.id)
            
            if (args == null || err != null) return [null, err]

            const result = await fn({ ...args, parent }, EditorService.currentEditor, Spoken.context)

            return [result, null]
        } catch (err) {
            console.error('[wrapper.SpokenInterface.onCommand] Error executing command: ' + err.toString())
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

export type SpokenSearchResponse = {
    _rawVoiceToTextResponse: any,
    phrase: string[],
    command: {
        id: string,
        desc: string,
        commandArgs: Record<string, string | number>,
        impl: string,
        lang: string,
        path: (string | Record<string, string | number> | null)[]
    } | null
}

export default new SpokenInterface()

