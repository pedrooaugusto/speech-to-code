import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function MathOperator(command: MathOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MathOperator"')

    const { mathOperator } = command

    const operator = ['+', '*', '-', '/', '%'][mathOperator % 5] || 'error'

    return { operator }
}

type MathOperatorParsedArgs = {
    mathOperator: number
} & ParsedPhrase

// @ts-ignore
export default MathOperator