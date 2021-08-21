import { ParsedPhrase, Editor, WildCard } from '../../d'
import { Context } from '../../../modules-loader'

async function Condition(command: ConditionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Condition."')
    
    const anything = context.templates['@anything'].examples[command?.extra?.lang as string][0]
    
    let { condition = anything, otherwise = false } = command
    
    condition = typeof condition === 'string' ? condition : condition?.value
    
    let text = `if(${condition}) {\n\n}${otherwise ? ' else {\n\n}' : ''}`

    const line = await editor.getLine() as { _line: number }

    await editor.write(text)
    await editor.indentSelection()

    await editor.goToLine(line._line + 1 as any)

    if (condition.includes(anything)) {
        const pos = await editor.findPositionOf(anything) as number[][]

        if (pos.length) {
            return await editor.select(pos[0][0], pos[0][1] - 1, false)
        }
    }

    return null
}

type ConditionParsedArgs = {
    condition: string | WildCard,
    otherwise: boolean
} & ParsedPhrase

export default Condition