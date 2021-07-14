import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function MultiWordTokens(command: MultiWordTokensParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MultiWordTokens"')

    function camelCase(words: string[]) {
        return words.map((a, i) => i ? a.charAt(0).toUpperCase() + a.slice(1) : a)
    }

    if (command.extra?.case === 'camel') {
        return camelCase(command.words)
    }

    return command.words
}

type MultiWordTokensParsedArgs = {
    words: string[]
} & ParsedPhrase

export default MultiWordTokens