import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Select(command: SelectParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "select"')

    command.word = Array.isArray(command.word) ? command.word.join('') : command.word

    if (command.selectLine != undefined) {
        return await editor.select(
            parseInt(command.from, 10),
            parseInt(command.to, 10),
            true
        )
    } else if (command.word != undefined) {
        const occurences = await editor.findPositionOf(command.word) as number[][]
        let wordPosition = parseInt(command.wordPosition, 10) || 1

        if (wordPosition === -1) wordPosition = occurences.length

        if (occurences.length) {
            return await editor.select(occurences[wordPosition - 1][0], occurences[wordPosition - 1][1] - 1, false)
        }

        throw new Error('Nothing found for string: ' + command.word)
    }

    const from = command.from || ''
    const to = command.to || ''
    let fromPos = parseInt(command.fromPosition, 10) || 1
    let toPos = parseInt(command.toPosition, 10) || 1

    if (from === '' || to === '') {
        throw new Error('Invalid arguments!')
    }

    const matchFrom = await editor.findPositionOf(from) as number[][]
    if (fromPos === -1) fromPos = matchFrom.length

    const pad = matchFrom[fromPos - 1][1] || 0

    const matchTo = await editor.findPositionOf(to, undefined, pad) as number[][]
    if (toPos === -1) toPos = matchTo.length

    return await editor.select(matchFrom[fromPos - 1][0], pad + matchTo[toPos - 1][0], false)
}

type SelectParsedArgs = {
    word: string | string[]
    from: string
    to: string
    fromPosition: string
    toPosition: string
    selectLine: string,
    wordPosition: string
} & ParsedPhrase

export default Select