async function MathOperator(command: MathOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MathOperator"')

    const { mathOperator } = command

    const operator = ['+', '*', '-', '/', '%'][mathOperator] || 'error'

    return { operator }
}

type MathOperatorParsedArgs = {
    mathOperator: number
} & ParsedPhrase

// @ts-ignore
export default MathOperator