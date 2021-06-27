async function FunctionDeclaration(command: FunctionDeclarationParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionDeclaration"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    let { fnName, argsNumber, returnValue } = command

    argsNumber = argsNumber != null ? parseInt(argsNumber as string, 10) : 0

    let text = `function ${fnName}(`

    if (argsNumber > 0) {
        text += new Array(argsNumber).fill(anything).join(', ')
    }

    text += ') {\n'

    if (returnValue != null) {
        text += 'return ' + toValue(returnValue)
    }

    text += '\n}'

    if (command.parent) return text

    const line = await editor.getLine() as { _line: number, character: number }

    await editor.write(text)

    return await editor.indentSelection()

    // return await editor.goToLine(line._line as any)
}

const toValue = (item: WildCard | string) => typeof item === 'string' ? item : item.value

type FunctionDeclarationParsedArgs = {
    fnName: string,
    argsNumber?: number | string,
    returnValue?: string | WildCard
} & ParsedPhrase

export default FunctionDeclaration