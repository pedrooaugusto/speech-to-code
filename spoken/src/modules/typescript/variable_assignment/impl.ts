import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    let { isNew, varName, expression, memType } = command

    const value = typeof expression === 'string' ? expression : expression?.value
    const allocate = memType === 0 ? 'let ' : 'const '
    varName = Array.isArray(varName) ? varName.join('') : varName

    const text = `${isNew ? allocate : ''}${varName}${value ? ` = ${value}` : ''}`

    await editor.write(text)

    await editor.indentSelection()

    if (typeof expression !== 'string' && expression?.value != null) {
        const pos = await editor.findPositionOf(expression.value) as number[][]

        if (pos.length) {
            return await editor.select(pos[0][0], pos[0][1] - 1, false)
        }
    }

    return undefined
}

type NewVariableParsedArgs = {
    expression?: string | { value: string, wildCard: boolean },
    varName: string | string[],
    isNew: string,
    memType: number
} & ParsedPhrase

export default NewVariable