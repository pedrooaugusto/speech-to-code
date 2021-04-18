import { IpcMainEvent } from 'electron'
import EditorService from './editors/editor-service'

class SpokenInterface {
    onComand = async (event: IpcMainEvent, res: SpokenSearchResponse, ...args: unknown[]) => {
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

