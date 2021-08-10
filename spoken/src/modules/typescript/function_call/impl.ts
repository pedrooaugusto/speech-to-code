import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionName)
    const argsNumber = command.argsNumber ? parseInt(command.argsNumber, 10) : command.oneArg ? 1 : NaN
    const args = command.args ? toArray(command.args) as (string | WildCard)[] : []
    const caller = command.caller ? toValue(command.caller) : null

    let text = functionName + '('

    if (argsNumber) {
        text += new Array(argsNumber).fill(anything).join(', ')
    } else if (args.length) {
        text += (args.map(item => typeof item === 'string' ? item : anything).join(', '))
    }

    text += ')'

    if (caller) text = caller + '.' + text

    if (command.parent) return text

    const line = await editor.getLine() as { _line: number, character: number }

    await editor.write(text)

    await editor.indentSelection()

    if (argsNumber > 0) {
        const pos = await editor.findPositionOf(anything[0]) as number[][]

        if (pos.length) {
            return await editor.select(pos[0][0], pos[0][1] - 1, false)
        }
    }

    return undefined
}

const toArray = (arg: any | any[]) => Array.isArray(arg) ? arg : [arg]
const toValue = (item: WildCard | string) => typeof item === 'string' ? item : item.value
const join = (item: string | string[]) => typeof item === 'string' ? item : item.join('')

type FunctionCallParsedArgs = {
    functionName: string | string[],
    argsNumber?: string,
    oneArg?: string,
    args?: string | WildCard | (string | WildCard)[],
    caller?: string | WildCard
} & ParsedPhrase

export default FunctionCall