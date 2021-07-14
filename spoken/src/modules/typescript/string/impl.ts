import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function WriteString(command: WriteStringParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteString"')

    command.string = Array.isArray(command.string) ? command.string : [command.string]

    const text = '"' + command.string.join(' ') + '"'

    if (command.parent) return text

    return await editor.write(text)
}

type WriteStringParsedArgs = {
    string: string | string[]
} & ParsedPhrase

export default WriteString