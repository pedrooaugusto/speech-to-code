import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, PositionEnum } from '../../d'

async function newLine(command: NewLineParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "new line."')

    return await editor.newLine(command.position)
}

type NewLineParsedArgs = {
    position: PositionEnum
} & ParsedPhrase

export default newLine