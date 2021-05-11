async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionName)
    const argsNumber = command.argsNumber ? parseInt(command.argsNumber, 10) : NaN
    const args = command.args ? toArray1(command.args) as (string | WildCard)[] : []
    const caller = command.caller ? toValue1(command.caller) : null

    let text = functionName + '('

    if (argsNumber) {
        text += new Array(argsNumber).fill(anything).join(', ')
    } else if (args.length) {
        text += (args.map(item => typeof item === 'string' ? item : anything).join(', '))
    }

    text += ')'

    if (caller) text = caller + '.' + text

    if (command.parent) return text

    return await editor.write(text)
}

// @TODO Make TS Stop complaning about this
const toArray1 = (arg: any | any[]) => Array.isArray(arg) ? arg : [arg]
const toValue1 = (item: WildCard | string) => typeof item === 'string' ? item : item.value
const join = (item: string | string[]) => typeof item === 'string' ? item : item.join('')

type FunctionCallParsedArgs = {
    functionName: string | string[],
    argsNumber?: string,
    args?: string | WildCard | (string | WildCard)[],
    caller?: string | WildCard
} & ParsedPhrase

// @ts-ignore
return FunctionCall