import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Repetition(command: RepetitionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Repetition."')
    
    const gap = context.templates['@anything'].examples[command?.extra?.lang as string][0]

    let text = `for(${gap}; ${gap}; ${gap}) {\n\n}`

    if (command.from == undefined && command.item == undefined) {
        text = `for(${gap}; ${gap}; ${gap}) {\n\n}`
    } else if (command.from != null && command.to != null) {
        const from = toValue(command.from)
        const to = toValue(command.to)
        const step = command.step ? toValue(command.step) : 'i + 1'

        text = `for(let i = ${from}; i < ${to}; i = ${step}) {\n\n}`
    } else if (command.item != null && command.collection != null) {
        const item = command.item
        const collection = toValue(command.collection)

        text = `for(const ${item} of ${collection}) {\n\n}`
    }

    const line = await editor.getLine() as { _line: number }

    await editor.write(text)
    await editor.indentSelection()

    await editor.goToLine(line._line + 1 as any)

    if (command.collection && text.includes(gap)) {
        const pos = await editor.findPositionOf(gap) as number[][]

        if (pos.length) {
            return await editor.select(pos[0][0], pos[0][1] - 1, false)
        }
    }

    return null
}

const toValue = (item: WildCard | string) => typeof item === 'string' ? item : item.value

type RepetitionParsedArgs = {
    from: string | WildCard,
    to: string | WildCard,
    step?: string | WildCard,
    item: string,
    collection: string | WildCard
} & ParsedPhrase

export default Repetition
