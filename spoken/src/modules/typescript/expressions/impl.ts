import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Expression(command: ExpressionParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Expression"')

    let { expression, parent, wildCard, booleanConstants } = command

    // really ??? (fix later)
    if (booleanConstants != null)
        expression = booleanConstants == 1 ? 'true' : 'false'

    if (parent) {
        return expression ? expression : { value: wildCard, isWildCard: true }
    }

    return await editor.write(expression || wildCard)
}

type ExpressionParsedArgs = {
    expression: string,
    wildCard: string,
    booleanConstants: number
} & ParsedPhrase

export default Expression