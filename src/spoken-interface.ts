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
}

export default new SpokenInterface()

