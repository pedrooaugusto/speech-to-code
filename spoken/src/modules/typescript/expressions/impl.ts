import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Expression(command: ExpressionParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Expression"')

    const { expression, parent, wildCard } = command

    if (parent) {
        return expression ? expression : { value: wildCard, isWildCard: true }
    }

    return await editor.write(expression || wildCard)
}

type ExpressionParsedArgs = {
    expression: string,
    wildCard: string
} & ParsedPhrase

export default Expression