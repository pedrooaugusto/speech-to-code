import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function remove(command: RemoveParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "remove line/selection."')

    if (command.isLine) {
        const line = await editor.getLine()

        if (line instanceof Error) throw line

        return await editor.remove(line.lineNumber)
    } else {
        return await editor.write('')
    }
}

type RemoveParsedArgs = {
    isSelection: boolean,
    isLine: boolean
} & ParsedPhrase

export default remove