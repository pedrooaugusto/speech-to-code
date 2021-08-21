import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function FunctionDeclaration(command: FunctionDeclarationParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionDeclaration"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    let { fnName, argsNumber, returnValue, returnOnly } = command

    argsNumber = argsNumber != null ? parseInt(argsNumber as string, 10) : 0

    let text = ''

    if (returnOnly == undefined) {
        text = `function ${fnName}(`

        if (argsNumber > 0) {
            text += new Array(argsNumber).fill(anything).join(', ')
        }

        text += ') {\n'

        if (returnValue != null) {
            text += 'return ' + toValue(returnValue)
        }

        text += '\n}'
    } else {
        text = 'return ' + toValue(returnValue!)
    }

    if (command.parent) return text

    const line = await editor.getLine() as { _line: number, character: number }

    await editor.write(text)

    await editor.indentSelection()

    const r = await editor.goToLine(line._line + 1 as any)

    if (argsNumber > 0) {
        const pos = await editor.findPositionOf(anything[0]) as number[][]

        if (pos.length) {
            return await editor.select(pos[0][0], pos[0][1] - 1, false)
        }
    }

    return r
}

const toValue = (item: WildCard | string) => typeof item === 'string' ? item : item.value

type FunctionDeclarationParsedArgs = {
    fnName: string,
    argsNumber?: number | string,
    returnValue?: string | WildCard,
    returnOnly?: string | WildCard
} & ParsedPhrase

export default FunctionDeclaration