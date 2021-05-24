async function LogicalOperator(command: LogicalOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "LogicalOperator"')

    const { logicalOperator, isNegative = false, inequalityOperator, orEqual = false } = command

    if (logicalOperator !== undefined) {
        const operator = ['&&', '||', '==='][logicalOperator]

        return { operator, isNegative }

    } else if (inequalityOperator !== undefined) {
        const operator = ['<', '>'][inequalityOperator] + (orEqual ? '=' : '')

        return { operator, isNegative }
    }

    return { operator: 'error', isNegative: false }
}

type LogicalOperatorParsedArgs = {
    isNegative: boolean,
    orEqual: boolean,
    logicalOperator: number,
    inequalityOperator: number
} & ParsedPhrase

// @ts-ignore
return LogicalOperator