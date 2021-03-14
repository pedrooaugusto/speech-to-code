import { IpcMainEvent } from 'electron'
import Spoken from 'spoken'
import RobotService from './robot/robot'
import EditorService from './robot/editor'

class SpokenInterface {
    #robot = RobotService.defaultRobot
    #editor = EditorService.defaultEditor

    onComand = async (event: IpcMainEvent, command: string | any, ...args: unknown[]) => {
        command = command?.results?.[0].alternatives?.[0]?.transcript

        event.reply('Spoken:analysisResults', command)

        const matchedCommand = Spoken.matchPhrase(command, 'pt_br')

        if (matchedCommand) {
            const fn = matchedCommand.makeFunction()

            try {
                const result = await fn(matchedCommand.getRegexExecResult(), this.#robot, this.#editor, {})
                if (result != null) {
                    event.reply('command-reply', command, result)
                }
            } catch (err) {
                console.error('[SpokenInterface.onCommand]\n\t' + err)
            }
        }
    }

    onComand1 = async (event: IpcMainEvent, res: SpokenSearchResponse, ...args: unknown[]) => {
        event.reply('Spoken:analysisResults', { phrase: res.phrase, ok: !!res.command })

        if (res.command) {
            const fn = eval(`(() => ${res.command.impl})()`)

            try {
                const result = await fn(res.command.matchedRegex, this.#robot, this.#editor, {})
                if (result != null) {
                    event.reply('command-reply', res.phrase, result)
                }
            } catch (err) {
                console.error('[SpokenInterface.onCommand]\n\t' + err)
            }
        } else {
            console.log('[SpokenInterface.onComand] Nothing found for phrase: "' + res.phrase + '"')
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

