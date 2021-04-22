import { IpcMainEvent } from 'electron'
import { SpokenCommand } from 'spoken'
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
            const fn = eval(`(() => { ${command.impl} })()`)
            const [args, err] = await this.parseArgs(command.args, command.id)
            
            if (args == null || err != null) return [null, err]

            const result = await fn({ ...args, parent }, EditorService.currentEditor, {})

            return [result, null]
        } catch (err) {
            console.error('[wrapper.SpokenInterface.onCommand] Error executing command: ' + err.toString())
            return [null, err]
        }
    }

    private async parseArgs(args: any, parent: string): Promise<[object | null, Error | null]> {
        for (const key of Object.keys(args)) {
            const innerCommand = args[key] as any

            console.log(innerCommand)
            if (!innerCommand.id || !innerCommand.impl || !innerCommand.lang) continue

            const [result, err] = await this.execute(innerCommand, parent)

            if (err != null) return [null, err]

            args[key] = result
        }

        return [args, null]
    }

    onComand1 = async (event: IpcMainEvent, res: SpokenSearchResponse, ...args: unknown[]) => {
        if (res.command) {
            const fn = eval(`(() => { ${res.command.impl} })()`)

            try {
                const result = await fn(res.command.commandArgs, EditorService.currentEditor, {})

                console.log('[wrapper.SpokenInterface.onCommand]: Result: ' + JSON.stringify(result || null))

                event.reply('Spoken:executeCommandResult', res, { result })
            } catch (err) {
                console.error('[wrapper.SpokenInterface.onCommand]\n\t' + err)
                event.reply('Spoken:executeCommandResult', res, { error: err.toString() || true })
            }
        } else {
            console.log('[wrapper.SpokenInterface.onComand] Nothing found for phrase: "' + res.phrase + '"')
            event.reply('Spoken:executeCommandResult', res, { err: 404 })
        }
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

