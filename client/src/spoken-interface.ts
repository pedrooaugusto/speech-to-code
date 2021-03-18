import { IpcMainEvent } from 'electron'
import EditorService from './editors/editor-service'

class SpokenInterface {
    #editor = EditorService.default

    onComand = async (event: IpcMainEvent, res: SpokenSearchResponse, ...args: unknown[]) => {
        event.reply('Spoken:analysisResults', { phrase: res.phrase, ok: !!res.command })

        if (res.command) {
            const fn = eval(`(() => ${res.command.impl})()`)

            try {
                const result = await fn(res.command.matchedRegex, this.#editor, {})

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
        id: number,
        desc: string,
        matchedRegex: string[],
        phrases: {
            [key: string]: string[]
        }
        impl: string
    }
}

export default new SpokenInterface()

