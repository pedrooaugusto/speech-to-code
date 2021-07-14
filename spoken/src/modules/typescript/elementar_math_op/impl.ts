import { ParsedPhrase, Editor, WildCard } from '../../d'

async function WriteElementarMathOperation(command: WriteElementarMathOperationParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteElementarMathOperation"')

    let operation = toArray(command.operation) as { operator: string, isNegative: boolean }[]
    let right = toArray(command.right) as (string | WildCard)[]

    let text = toValue(command.left)

    for (let i = 0; i < right.length; i++) {
        if (operation[i].isNegative) {
            if (operation[i].operator === '===') text += ' !== ' + toValue(right[i])
            else text = '!(' + text + ' ' + operation[i].operator + ' ' + toValue(right[i]) + ')'
        } else {
            text += ' ' + operation[i].operator + ' ' + toValue(right[i])
        }
    }

    if (command.parent) return text

    await editor.write(text)

    const wildcard = [command.left, ...right].find(item => typeof item !== 'string') as WildCard

    if (wildcard) {
        const pos = await editor.findPositionOf(wildcard.value) as number[][]

        if (pos.length) {
            return await editor.select(pos[0][0], pos[0][1] - 1, false)
        }
    }

    return undefined
}

const toArray = (arg: any | any[]) => Array.isArray(arg) ? arg : [arg]
const toValue = (item: WildCard | string) => typeof item === 'string' ? item : item.value

type WriteElementarMathOperationParsedArgs = {
    operation: { operator: string, isNegative: boolean } | { operator: string, isNegative: boolean }[]
    left: string | WildCard
    right: string | WildCard | (string | WildCard)[]
} & ParsedPhrase


export default WriteElementarMathOperation
