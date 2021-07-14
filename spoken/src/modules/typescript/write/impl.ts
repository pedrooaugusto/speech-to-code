import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor } from '../../d'

async function write(command: WriteParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "write."')

    let text = null

    if (command.isSpace) text = ' '
    else if (command.isDot) text = '.'
    else text = Array.isArray(command.text) ? command.text?.join(command.isDitaction ? '' : ' ') : command.text

    return await editor.write(text)
}

type WriteParsedArgs = {
    text: string[],
    isSpace: boolean,
    isDot: boolean,
    isDitaction: boolean
} & ParsedPhrase

export default write