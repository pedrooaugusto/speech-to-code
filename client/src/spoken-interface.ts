import { IpcMainEvent } from 'electron'
import EditorService from './editors/editor-service'

class SpokenInterface {
    onComand = async (event: IpcMainEvent, res: SpokenSearchResponse, ...args: unknown[]) => {
        event.reply('Spoken:analysisResults', { phrase: res.phrase, ok: !!res.command })

        if (res.command) {
            const fn = eval(`(() => { ${res.command.impl} })()`)

            try {
                const result = await fn(res.command.commandArgs, EditorService.currentEditor, {})

                console.log('[wrapper.SpokenInterface.onCommand]: Result: ' + JSON.stringify(result || null))

                if (result != null) {
                    event.reply('command-reply', res.phrase, result)
                }
            } catch (err) {
                console.error('[wrapper.SpokenInterface.onCommand]\n\t' + err)
            }
        } else {
            console.log('[wrapper.SpokenInterface.onComand] Nothing found for phrase: "' + res.phrase + '"')
        }
    }
}

type SpokenSearchResponse = {
    _rawVoiceToTextResponse: any,
    phrase: string[],
    command: {
        id: string,
        desc: string,
        commandArgs: Record<string, string>,
        impl: string,
        lang: string,
        path: (string | Record<string, string> | null)[]
    } | null
}

export default new SpokenInterface()

